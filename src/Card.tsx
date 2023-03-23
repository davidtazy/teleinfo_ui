import React, { useState, useEffect } from "react";

export type CardProps = {
  value: string;
  unit: string;
  label: string;
  color: string;
  icon: JSX.Element;
};

export function Card(props: CardProps) {
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 600px)").matches
  );

  useEffect(() => {
    window
      .matchMedia("(min-width: 700px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);

  if (!matches) {
    //small screen

    return (
      <>
        <div
          style={{
            boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
            backgroundColor: props.color,
            fontSize: "25vh",
            textAlign: "left",
            margin: 5,
            height: "100vh",
          }}
        >
          {props.icon}

          <p
            style={{
              fontSize: "1.6em",
              margin: 0,
              fontWeight: "bold",
              textAlign: "center",
            }}
            id="val"
          >
            {props.value}
            <span
              style={{
                fontSize: "0.5em",
                fontWeight: "normal",
                margin: 0,
              }}
            >
              {" " + props.unit}
            </span>
          </p>
        </div>
      </>
    );
  } else {
    //big screen
    return (
      <>
        <div
          style={{
            boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
            backgroundColor: props.color,
            fontSize: "20vh",
            margin: 5,
            padding: 10,
            height: "21vh",
          }}
        >
          {props.icon} {props.value}
          {" " + props.unit}
        </div>
      </>
    );
  }
}
