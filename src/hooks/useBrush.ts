import { useContext } from "react";
import { BrushStyle } from "../BrushSelector/BrushSelector";
import { BrushContext } from "./Provider";

export default function useBrush() {
  const { state, dispatch } = useContext(BrushContext);
  function incBrushSize() {
    dispatch({ type: "incBrush", data: { by: 1 } });
  }
  function decBrushSize() {
    dispatch({ type: "decBrush", data: { by: 1 } });
  }
  function setStyle(style: BrushStyle) {
    dispatch({ type: "setStyle", data: { style } });
  }
  function useCircleStyle() {
    dispatch({ type: "setStyle", data: { style: "circle" } });
  }
  function usePointStyle() {
    dispatch({ type: "setStyle", data: { style: "point" } });
  }
  function setColor(color: string) {
    dispatch({ type: "setColor", data: { color } });
  }

  return {
    brush: state,
    incBrushSize,
    decBrushSize,
    setStyle,
    setColor,
    usePointStyle,
    useCircleStyle,
  };
}
