import ResetZoom from "@material-ui/icons/YoutubeSearchedFor";
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import ZoomOutIcon from "@material-ui/icons/ZoomOut";
import UndoIcon from "@material-ui/icons/Undo";
import ClearIcon from "@material-ui/icons/Clear";
import React from "react";
import BrushSelector from "../../BrushSelector";
import Button from "../Button";
import styles from "./ControlBar.module.scss";

type Props = {
  /**
   * If further customization is needed provide a custom class name,
   * it will be applied to the root of the component as the last class,
   * giving it the greatest precedence
   */
  className?: string;
  setBrushColor: () => void;
  setBrushSize: () => void;
  brushColor: string;
  scaleDown: () => void;
  resetZoom: () => void;
  scaleUp: () => void;
  points: Array<{ x: number; y: number }>;
  undo: () => void;
  clear: () => void;
  scale: number;
  brushSize: number;
};

function ControlBar({
  className,
  setBrushColor,
  setBrushSize,
  brushSize,
  brushColor,
  scaleDown,
  resetZoom,
  scaleUp,
  scale,
  points,
  undo,
  clear,
}: Props) {
  const classes = [styles.wrapper, className].join(" ").trim();
  return (
    <div className={classes}>
      <BrushSelector
        size={brushSize}
        onChange={setBrushColor}
        setSize={setBrushSize}
        color={brushColor}
      />
      <Button onClick={scaleDown}>
        <ZoomOutIcon />
      </Button>
      <Button disabled={scale === 1} onClick={resetZoom}>
        <ResetZoom />
      </Button>
      <Button onClick={scaleUp}>
        <ZoomInIcon />
      </Button>
      <Button disabled={points.length === 0} onClick={undo}>
        <UndoIcon />
      </Button>
      <Button onClick={clear}>
        <ClearIcon />
      </Button>
    </div>
  );
}

ControlBar.defaultProps = {
  className: "",
  color: "primary",
  disabled: false,
};

export default ControlBar;
