import React, { useRef, useState } from "react";
import styles from "./styles.module.scss";
import { Button } from "../components";

export default function BrushSelector({ color, onChange, setSize, size }) {
  const [isOpen, setOpen] = useState(false);
  const root = useRef();
  const toggle = () => setOpen((state) => !state);
  return (
    <div ref={root} className={styles.wrapper}>
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
          <div className="row">
            <Button onClick={() => setSize((size) => size + 1)}>+</Button>
            <Button onClick={() => setSize((size) => size - 1)}>-</Button>
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
