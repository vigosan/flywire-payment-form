import React, { createContext, useContext, useState } from "react";
import Flywire from "@flywire/flywire-js";
import { useStep, useForm } from "@flywire/react-hooks";
import { steps } from "../components/Wizard";

const FlywireContext = createContext();

function FlywireProvider({ children }) {
  const flywire = Flywire({ mock: true });
  const [recipient, setRecipient] = useState({});
  const { values, handleChange, dirtyFields } = useForm();
  const { index, navigation, complete } = useStep({
    initialStep: 0,
    steps,
  });

  function goToNextStep() {
    complete(index);
    navigation.next();
  }

  function goToPrevStep() {
    navigation.prev();
  }

  return (
    <FlywireContext.Provider
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
        setRecipient,
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
