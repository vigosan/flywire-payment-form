import React, { createContext, useContext } from "react";
import { useForm } from "@flywire/react-hooks";

const FormContext = createContext();

function FormProvider({ children }) {
  const { values, handleChange, dirtyFields } = useForm();

  return (
    <FormContext.Provider
      value={{
        values,
        handleChange,
        dirtyFields
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

function useFormContext() {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error("useFormContext must be used withinh a FormProvider");
  }
  return context;
}

export { FormContext, FormProvider, useFormContext };
