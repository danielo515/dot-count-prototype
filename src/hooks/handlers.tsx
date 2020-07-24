import { BrushStyle } from "../BrushSelector/BrushSelector";
import { State } from "./Provider";
const maxSize = 15;
const minSize = 1;
export const handlers = {
  incBrush(state: State, { by = 1 }: { by: number }) {
    return { ...state, size: Math.min(state.size + by, maxSize) };
  },
  decBrush(state: State, { by = 1 }: { by: number }) {
    return { ...state, size: Math.min(state.size - by, minSize) };
  },
  setColor(state: State, { color }: { color: string }) {
    return { ...state, color };
  },
  setStyle(state: State, { style }: { style: BrushStyle }) {
    return { ...state, style };
  },
};
