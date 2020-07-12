import React, { useState } from "react";
import styles from "./styles.module.scss";
import { Button } from "../components";
import Circle from "@material-ui/icons/RadioButtonUnchecked";
import Point from "@material-ui/icons/FiberManualRecord";
import Plus from "@material-ui/icons/Add";
import Minus from "@material-ui/icons/Remove";
import useBrush from "../hooks/useBrush";
import { useClickAway } from "../hooks/useClickAway";
export type BrushStyle = "circle" | "point";

export default function BrushSelector() {
  const [isOpen, setOpen] = useState(false);
  const ref = useClickAway(setOpen.bind(null, false), true);
  const toggle = () => setOpen((state) => !state);
  const {
    brush,
    decBrushSize,
    incBrushSize,
    useCircleStyle,
    usePointStyle,
    setColor,
  } = useBrush();
  return (
    <div className={styles.wrapper} ref={ref as any}>
      <Button onClick={toggle}>
        <span
          style={{
            height: `${brush.size * 2}px`,
            width: `${brush.size * 2}px`,
            backgroundColor: brush.color,
          }}
        />
      </Button>
      {isOpen && (
        <div className={styles.menu}>
          <div className={styles.row}>
            <Button
              className={brush.style === "circle" ? styles.active : ""}
              onClick={useCircleStyle}
            >
              <Circle />
            </Button>
            <Button
              onClick={usePointStyle}
              className={brush.style === "point" ? styles.active : ""}
            >
              <Point />
            </Button>
          </div>
          <div className={styles.row}>
            <Button onClick={incBrushSize}>
              <Plus />
            </Button>
            <Button onClick={decBrushSize}>
              <Minus />
            </Button>
          </div>
          <label>
            <span style={{ backgroundColor: brush.color }} />
            <input
              type="color"
              value={brush.color}
              onChange={(e) => setColor(e.currentTarget.value)}
            />
          </label>
        </div>
      )}
    </div>
  );
}
