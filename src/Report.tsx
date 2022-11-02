import { createRef, useEffect, useRef } from "react";

import { BsFillLightningChargeFill, BsMoonStars, BsSun } from "react-icons/bs";
import { Card, CardProps } from "./Card";
import useChrono from "./UseChrono";
import { Teleinfo } from "./Teleinfo";

type ReportProps = {
  teleinfo: Teleinfo;
  auto_scroll: boolean;
};

export default function Report(props: ReportProps) {
  const cards = createCardsProps(props.teleinfo);
  const card_refs = useRef(cards.map(() => createRef<HTMLDivElement>()));

  // create timer to scroll to cards periodically
  const [chrono] = useChrono(5000);
  let card_id = 0;
  if (props.auto_scroll) {
    //disable autoscroll
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

function createCardsProps(tt: Teleinfo): CardProps[] {
  const papp = tt.getInstantPower();

  const percent = Math.min(1, papp.watts / 3000);
  const papp_color = getColor(percent);

  const hp_val = tt.getDailyConsumption().renderTokWh();
  const hc_val = tt.getNightlyConsumption().renderTokWh();

  return [
    {
      icon: <BsFillLightningChargeFill />,
      label: "INSTANT. ",
      unit: "kW",
      value: papp.renderTokW(),
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
