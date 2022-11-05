import { QueryApi } from "@influxdata/influxdb-client";
import { useInfluxQuery } from "./UseInfluxQuery";
import RawData from "./RawData";
import Report from "./Report";
import { useState } from "react";
import NavBar from "./NavBar";
import RedPeriodNotifier from "./RedPeriod";
import { Teleinfo } from "./Teleinfo";

const bucket = "teleinfo";

export default function App(props: { queryApi: QueryApi }) {
  const [auto_scroll, setAutoScroll] = useState(true);

  const origin_query = getOriginQuery(new Date());

  // effect to request data from begin of the session
  const [zero] = useInfluxQuery(props.queryApi, origin_query, 60000);

  // effect to request current data periodically
  const [values] = useInfluxQuery(props.queryApi, getPeriodicQuery(), 2000);

  let timestamp = " no data";

  if (values.length) {
    timestamp = values[0].date;
  }

  const teleinfo = new Teleinfo(values, zero);

  return (
    <>
      <RedPeriodNotifier isRed={teleinfo.isRedPeriod()} />
      <NavBar
        setAutoScroll={setAutoScroll}
        auto_scroll={auto_scroll}
        timestamp={timestamp}
      />
      <Report teleinfo={teleinfo} auto_scroll={auto_scroll} />
      <RawData values={values} offset={zero} />
    </>
  );
}

function getOriginQuery(now: Date): string {
  // HEURES CREUSE begins at 10pm to 6AM
  let first_query = `import "timezone"
import "date"
option location = timezone.location(name: "Europe/Paris")
from(bucket: "${bucket}")
    |> range(start: date.sub( d:2h, from:today() ) )
    |> filter(fn: (r) => r["_field"] == "value")
    |> first()`;

  let evening_query = `import "timezone"
    import "date"
    option location = timezone.location(name: "Europe/Paris")
    from(bucket: "${bucket}")
    |> range(start: date.add( d:6h, to:today() ) )
    |> filter(fn: (r) => r["_field"] == "value")
    |> first()`;
  if (now.getHours() >= 22) {
    // in the evening (from  10pm to midnight)
    // nightly counter is reset for the new night
    // dayly counter is kept untill midnight
    return evening_query;
  } else {
    // from midnight to 10pm
    // nightly counter count from 10pm the previous day
    // daily counter too
    return first_query;
  }
}

function getPeriodicQuery() {
  return `import "timezone"
  option location = timezone.location(name: "Europe/Paris")
  from(bucket: "${bucket}")
      |> range(start: -1h)
      |> filter(fn: (r) => r["_field"] == "value")
      |> last()`;
}
