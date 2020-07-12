import React, { createContext, useReducer } from "react";
import { BrushStyle } from "../BrushSelector/BrushSelector";
import { handlers } from "./handlers";

type BrushActions = {
  [T in keyof typeof handlers]: {
    type: T;
    data: Parameters<typeof handlers[T]>[1];
  };
};

type BrushAction = BrushActions[keyof BrushActions];

export type State = {
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
