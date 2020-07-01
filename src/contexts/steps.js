import React, { createContext, useContext } from "react";
import { useStep } from "@flywire/react-hooks";

const StepsContext = createContext();

function StepsProvider({ children, steps }) {
  const { index, navigation, complete, uncomplete, completed } = useStep({
    initialStep: 0,
    steps
  });

  function goToNextStep() {
    complete(index);
    navigation.next();
  }

  function goToPrevStep() {
    uncomplete(index);
    navigation.prev();
  }

  return (
    <StepsContext.Provider
      value={{
        goToNextStep,
        goToPrevStep,
        index,
        steps,
        completed
      }}
    >
      {children}
    </StepsContext.Provider>
  );
}

function useStepsContext() {
  const context = useContext(StepsContext);
  if (context === undefined) {
    throw new Error("useStepsContext must be used withinh a StepsProvider");
  }
  return context;
}

export { StepsContext, StepsProvider, useStepsContext };
