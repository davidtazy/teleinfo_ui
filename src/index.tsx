import React from "react";
import ReactDOM from "react-dom/client";

import { InfluxDB } from "@influxdata/influxdb-client";

import App from "./App";

const token: string | undefined = process.env.REACT_APP_INFLUX_TOKEN;
const org: string | undefined = process.env.REACT_APP_INFLUX_ORG;
const url: string | undefined = process.env.REACT_APP_INFLUX_URL;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

if (token !== undefined && url !== undefined && org !== undefined) {
  const queryApi = new InfluxDB({ url, token }).getQueryApi({
    org: org,
    now: () => new Date().toISOString(),
  });

  root.render(
    <React.StrictMode>
      <App queryApi={queryApi} />
    </React.StrictMode>
  );
} else {
  root.render(<p>missing authorization keys</p>);
}
