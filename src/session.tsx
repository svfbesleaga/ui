// src/count-context.tsx
import React from "react";

export type LoginFormState = {
  email: string;
  password: string;
};

type Action = {
  type: "loginRegister" | "logout";
  payload: LoginFormState;
};
type Dispatch = (action: Action) => void;
type SessionProviderProps = { children: React.ReactNode };

const SessionStateContext = React.createContext<LoginFormState | undefined>(
  undefined
);
const SessionDispatchContext = React.createContext<Dispatch | undefined>(
  undefined
);

function sessionReducer(state: LoginFormState, action: Action) {
  switch (action.type) {
    case "loginRegister":
      console.log(action.payload);
      return { ...state, email: action.payload.email, password: "" };
    case "logout":
      return { ...state, email: "", password: "" };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function SessionProvider({ children }: SessionProviderProps) {
  const [state, dispatch] = React.useReducer(sessionReducer, {
    email: "",
    password: ""
  });
  return (
    <SessionStateContext.Provider value={state}>
      <SessionDispatchContext.Provider value={dispatch}>
        {children}
      </SessionDispatchContext.Provider>
    </SessionStateContext.Provider>
  );
}

function useSessionState() {
  const context = React.useContext(SessionStateContext);
  if (context === undefined) {
    throw new Error("useSessionState must be used within a SessionProvider");
  }
  return context;
}

function useSessionDispatch() {
  const context = React.useContext(SessionDispatchContext);
  if (context === undefined) {
    throw new Error("useSessionDispatch must be used within a SessionProvider");
  }
  return context;
}

export { SessionProvider, useSessionState, useSessionDispatch };
