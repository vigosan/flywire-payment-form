import React, { createContext, useContext } from "react";
import Flywire from "@flywire/flywire-js";

const FlywireContext = createContext();

function FlywireProvider({ children, token, mock = false }) {
  const flywire = Flywire({ mock, token });

  return (
    <FlywireContext.Provider
      value={{
        flywire
      }}
    >
      {children}
    </FlywireContext.Provider>
  );
}

function useFlywireContext() {
  const context = useContext(FlywireContext);
  if (context === undefined) {
    throw new Error("useFlywireContext must be used withinh a FlywireProvider");
  }
  return context;
}

export { FlywireContext, FlywireProvider, useFlywireContext };
