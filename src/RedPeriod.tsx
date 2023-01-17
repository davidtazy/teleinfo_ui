import useChrono from "./UseChrono";

export default function RedPeriodNotifier(props: {
  isRed: boolean;
  isWhite: boolean;
}) {
  let refresh: number = 3600000;
  if (props.isRed) {
    refresh = 1000;
  }

  const [chrono] = useChrono(refresh);

  if ((props.isRed || props.isWhite) && chrono % 2)
    return (
      <div
        style={{
          backgroundColor: props.isRed ? "red" : "orange",
          position: "fixed",
          top: "10px",
          right: "0px",
          width: "50vw",
          height: "15vh",
          borderColor: "white",
          borderStyle: "solid",
          fontFamily: "sans-serif",
          font: "arial",
          fontSize: "12vh",
          color: "lightgrey",
          textAlign: "center",
        }}
      >
        {props.isRed ? " ROUGE" : " BLANC"}
      </div>
    );
  else return <></>;
}
