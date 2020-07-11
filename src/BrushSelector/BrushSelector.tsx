import React, { useState } from "react";
import styles from "./styles.module.scss";
import { Button } from "../components";
import Circle from "@material-ui/icons/RadioButtonUnchecked";
import Point from "@material-ui/icons/FiberManualRecord";
import Plus from "@material-ui/icons/Add";
import Minus from "@material-ui/icons/Remove";
export type BrushStyle = "circle" | "point";

type Props = {
  color: string;
  onChange: (color: string) => void;
  setSize: (cb: (current: number) => void) => void;
  size: number;
  brushStyle: BrushStyle;
  setBrushStyle: (style: BrushStyle) => void;
};

export default function BrushSelector({
  color,
  onChange,
  setSize,
  setBrushStyle,
  size,
  brushStyle,
}: Props) {
  const [isOpen, setOpen] = useState(false);
  const toggle = () => setOpen((state) => !state);
  return (
    <div className={styles.wrapper}>
      <Button onClick={toggle}>
        <span
          style={{
            height: `${size * 2}px`,
            width: `${size * 2}px`,
            backgroundColor: color,
          }}
        />
      </Button>
      {isOpen && (
        <div className={styles.menu}>
          <div className={styles.row}>
            <Button
              className={brushStyle === "circle" ? styles.active : ""}
              onClick={() => setBrushStyle("circle")}
            >
              <Circle />
            </Button>
            <Button
              onClick={() => setBrushStyle("point")}
              className={brushStyle === "point" ? styles.active : ""}
            >
              <Point />
            </Button>
          </div>
          <div className={styles.row}>
            <Button onClick={() => setSize((size) => size + 1)}>
              <Plus />
            </Button>
            <Button onClick={() => setSize((size) => size - 1)}>
              <Minus />
            </Button>
          </div>
          <label>
            <span style={{ backgroundColor: color }} />
            <input
              type="color"
              value={color}
              onChange={(e) => onChange(e.currentTarget.value)}
            />
          </label>
        </div>
      )}
    </div>
  );
}
