import { QueryApi } from "@influxdata/influxdb-client";
import { useInfluxQuery } from "./UseInfluxQuery";
import RawData from "./RawData";
import Report from "./Report";
import { useState } from "react";
import NavBar from "./NavBar";

const bucket = "teleinfo";
let periodic_query = `import "timezone"
option location = timezone.location(name: "Europe/Paris")
from(bucket: "${bucket}")
    |> range(start: -1h)
    |> filter(fn: (r) => r["_field"] == "value")
    |> last()`;

// HEURES CREUSE begins at 10pm to 6AM
let first_query = `import "timezone"
import "date"
option location = timezone.location(name: "Europe/Paris")
from(bucket: "${bucket}")
    |> range(start: date.sub( d:2h, from:today() ) )
    |> filter(fn: (r) => r["_measurement"] == "BBRHPJB" or r["_measurement"] == "BBRHCJB")
    |> filter(fn: (r) => r["_field"] == "value")
    |> first()`;

type InfluxProps = {
  queryApi: QueryApi;
};

export default function InfluxDashboard(props: InfluxProps) {
  const [auto_scroll, setAutoScroll] = useState(true);

  // effect to request data from begin of the day
  const [offset] = useInfluxQuery(props.queryApi, first_query, 60000);

  // effect to request current data periodically
  const [values] = useInfluxQuery(props.queryApi, periodic_query, 2000);

  let timestamp = " no data";

  if (values.length) {
    timestamp = values[0].date;
  }

  return (
    <>
      <NavBar
        setAutoScroll={setAutoScroll}
        auto_scroll={auto_scroll}
        timestamp={timestamp}
      />
      <Report values={values} offset={offset} auto_scroll={auto_scroll} />
      <RawData values={values} offset={offset} />
    </>
  );
}
