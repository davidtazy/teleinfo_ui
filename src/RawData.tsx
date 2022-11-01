import { Value } from "./UseInfluxQuery";

type RawDataProps = {
  values: Value[];
  offset: Value[];
};

export default function RawData(props: RawDataProps) {
  const values = props.values;
  const offset = props.offset;
  return (
    <>
      <h1>Donnee brutes</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Nom</th>
            <th>Valeur</th>
          </tr>
        </thead>
        <tbody>
          {values.map((v) => {
            return (
              <tr key={v.name}>
                <th>{v.date}</th>
                <th>{v.name}</th>
                <th>{v.value}</th>
              </tr>
            );
          })}
          <tr key="------">
            <th>offset</th>
            <th>-------</th>
            <th>-------</th>
          </tr>
          {offset.map((v) => {
            return (
              <tr key={v.name}>
                <th>{v.date}</th>
                <th>{v.name}</th>
                <th>{v.value}</th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
