import { createRef, useEffect, useRef } from "react";
import { Value } from "./UseInfluxQuery";

import { BsFillLightningChargeFill, BsMoonStars, BsSun } from "react-icons/bs";
import { Card, CardProps } from "./Card";
import useChrono from "./UseChrono";

type ReportProps = {
  values: Value[];
  offset: Value[];
  auto_scroll: boolean;
};

export default function Report(props: ReportProps) {
  const cards = createCardsProps(props);
  const card_refs = useRef(cards.map(() => createRef<HTMLDivElement>()));

  // create timer to scroll to cards periodically
  const [chrono] = useChrono(5000);
  let card_id = 0;
  if (props.auto_scroll) {
    card_id = chrono % cards.length;
  }
  // use effect to scroll to the target section when card_id change
  useEffect(() => {
    console.log("scroll down to " + card_id.toString());
    scrollDown(card_refs.current[card_id]);
  }, [card_id, card_refs]);

  return (
    <>
      {cards.map((card, i) => (
        <div key={i} ref={card_refs.current[i]}>
          <Card {...card} />
        </div>
      ))}
    </>
  );
}

function createCardsProps(props: ReportProps): CardProps[] {
  const papp = getValue("PAPP", props.values);

  const hc = getIntValue("BBRHCJB", props.values);
  const hc_offset = getIntValue("BBRHCJB", props.offset);

  const hp = getIntValue("BBRHPJB", props.values);
  const hp_offset = getIntValue("BBRHPJB", props.offset);

  const percent = Math.min(1, getIntValue("PAPP", props.values) / 3000);
  const papp_color = getColor(percent);

  const hp_val = ((hp - hp_offset) / 1000.0).toFixed(1);
  const hc_val = ((hc - hc_offset) / 1000.0).toFixed(1);

  return [
    {
      icon: <BsFillLightningChargeFill />,
      label: "INSTANT. ",
      unit: "kW",
      value: papp,
      color: papp_color,
    },
    {
      icon: <BsSun />,
      label: "HP. ",
      unit: "kWh",
      value: hp_val,
      color: "lightyellow",
    },
    {
      icon: <BsMoonStars />,
      label: "HC. ",
      unit: "kWh",
      value: hc_val,
      color: "lightyellow",
    },
  ];
}

function getIntValue(name: string, vals: Value[]): number {
  const ret = vals
    .filter((val: Value) => {
      return val.name === name;
    })
    .map((val: Value) => {
      return parseInt(val.value);
    });

  if (ret.length)
    return ret.reduce((val: number) => {
      return val;
    });

  return 0;
}

function getValue(id: string, values: Value[]) {
  let v = getIntValue(id, values);

  return (v / 1000.0).toFixed(1);
}

function getColor(value: number): string {
  //value from 0 to 1
  var hue = ((1 - value) * 120).toString(10);
  return ["hsl(", hue, ",100%,50%)"].join("");
}

const scrollDown = (ref: any) => {
  window.scrollTo({
    top: ref.current.offsetTop,
    behavior: "smooth",
  });
};
