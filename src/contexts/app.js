import React, { createContext, useContext, useState } from "react";
import Flywire from "@flywire/flywire-js";
import { useStep, useForm } from "@flywire/react-hooks";
import { steps } from "../components/Wizard";

const AppContext = createContext();

function AppProvider({ children }) {
  const flywire = Flywire({ mock: true });
  const [recipient, setRecipient] = useState({});
  const { values, handleChange, dirtyFields } = useForm();
  const { index, navigation, complete } = useStep({
    initialStep: 0,
    steps
  });

  function goToNextStep() {
    complete(index);
    navigation.next();
  }

  function goToPrevStep() {
    navigation.prev();
  }

  return (
    <AppContext.Provider
      value={{
        goToNextStep,
        goToPrevStep,
        flywire,
        dirtyFields,
        handleChange,
        index,
        steps,
        values,
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
