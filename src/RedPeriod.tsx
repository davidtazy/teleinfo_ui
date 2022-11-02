import useChrono from "./UseChrono";

export default function RedPeriodNotifier(props: { isRed: boolean }) {
  const [chrono] = useChrono(1000);

  if (props.isRed && chrono % 2)
    return (
      <div
        style={{
          backgroundColor: "red",
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
        {" "}
        ROUGE
      </div>
    );
  else return <></>;
}
