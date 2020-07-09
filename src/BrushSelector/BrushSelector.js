import React, { useRef, useState } from "react";
import "./styles.scss";

export default function BrushSelector({ color, onChange, setSize, size }) {
  const [isOpen, setOpen] = useState(false);
  const root = useRef();
  const toggle = () => setOpen(state => !state);
  return (
    <div ref={root} className="hasMenu">
      <button onClick={toggle}>
        <span
          style={{
            height: `${size * 2}px`,
            width: `${size * 2}px`,
            backgroundColor: color
          }}
        />
      </button>
      {isOpen && (
        <div className="menu">
          <div className="row">
            <button type="button" onClick={() => setSize(size => size + 1)}>
              +
            </button>
            <button type="button" onClick={() => setSize(size => size - 1)}>
              -
            </button>
          </div>
          <label>
            <span style={{ backgroundColor: color }} />
            <input
              type="color"
              value={color}
              onChange={e => onChange(e.currentTarget.value)}
            />
          </label>
        </div>
      )}
    </div>
  );
}
