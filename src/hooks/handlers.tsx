import { BrushStyle } from "../BrushSelector/BrushSelector";
import { State } from "./Provider";
export const handlers = {
  incBrush(state: State, { by = 1 }: { by: number }) {
    return { ...state, size: state.size + by };
  },
  decBrush(state: State, { by = 1 }: { by: number }) {
    return { ...state, size: state.size - by };
  },
  setColor(state: State, { color }: { color: string }) {
    return { ...state, color };
  },
  setStyle(state: State, { style }: { style: BrushStyle }) {
    return { ...state, style };
  },
};
