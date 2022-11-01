import { Dispatch, SetStateAction } from "react";

type NavBarProps = {
  auto_scroll: boolean;
  setAutoScroll: Dispatch<SetStateAction<boolean>>;
  timestamp: string;
};

export default function NavBar(props: NavBarProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <h2> {props.timestamp}</h2>
      <h2> Teleinfo Tazy</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <label htmlFor="cb">auto scroll</label>
        <input
          id="cb"
          type="checkbox"
          onChange={() => props.setAutoScroll(!props.auto_scroll)}
          defaultChecked={props.auto_scroll}
        />
      </div>
    </div>
  );
}
