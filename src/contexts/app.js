import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

function AppProvider({ children }) {
  const [recipient, setRecipient] = useState({});

  return (
    <AppContext.Provider
      value={{
        recipient,
        setRecipient
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used withinh a AppProvider");
  }
  return context;
}

export { AppContext, AppProvider, useAppContext };
