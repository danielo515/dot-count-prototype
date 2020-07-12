import React, { createContext, useReducer } from "react";
import { BrushStyle } from "../BrushSelector/BrushSelector";

type BrushActions = {
  [T in keyof typeof handlers]: {
    type: T;
    data: Parameters<typeof handlers[T]>[1];
  };
};

type BrushAction = BrushActions[keyof BrushActions];

type State = {
  size: number;
  color: string;
  style: BrushStyle;
};

const initialState: State = {
  size: 2,
  color: "#a7e326",
  style: "circle",
};

type Context = {
  state: State;
  dispatch: (action: BrushAction) => void;
};

export const BrushContext = createContext<Context>({
  state: initialState,
  dispatch() {},
});

const handlers = {
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

function reducer(state: State, action: BrushAction): State {
  if (handlers.hasOwnProperty(action.type)) {
    return handlers[action.type](state, (action as any).data);
  }
  return state;
}

export default function BrushProvider({ children }: { children: JSX.Element }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return (
    <BrushContext.Provider value={value}>{children}</BrushContext.Provider>
  );
}
