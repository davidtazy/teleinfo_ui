import { QueryApi,FluxResultObserver } from "@influxdata/influxdb-client";
import { useEffect, useState } from "react";
import useChrono from "./UseChrono";

export type Value = {
    date: string;
    name: string;
    value: string;
  };

export type InfluxQueryState = {
    values: Value[];
    isLoading: boolean;
  };


 function useInfluxQuery(
    queryApi: QueryApi,
    query: string,
    refresh_ms:number
  ) {

    const [state, setState] = useState<InfluxQueryState>({
      values: [],
      isLoading: true,
    });

    const [chrono] = useChrono(refresh_ms);
    
    useEffect(() => {
      (async () => {
        let ret: Value[] = [];
  
        //create InfluxDB client
        const fluxObserver: FluxResultObserver<string[]> = {
          next(row, tableMeta) {
            const o = tableMeta.toObject(row);
            //console.log(`${o._time} ${o._measurement}: ${o._value}`);
            // 2022-10-30T20:51:33Z PAPP in linky (undefined): value=500
            const v: Value = {
              date: o._time,
              name: o._measurement,
              value: o._value,
            };
            ret.push(v);
          },
          error(error) {
            console.error(error);
            console.log("\nFinished ERROR");
  
            setState({ values: [], isLoading: false });
          },
          complete() {
            console.log("\nFirst Finished SUCCESS");
            ret.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
            setState({ values: ret, isLoading: false });
          },
        };
  
        /** Execute a query and receive line table metadata and rows. */
        queryApi.queryRows(query, fluxObserver);
      })();
    }, [chrono,queryApi,query]);
  
    return [state.values];
  }


  export {useInfluxQuery};