import React from "react";
import { useStepsContext } from "../../contexts";
import { Amount, Country, Offer, Payment } from "./components";

const steps = [
  { id: "country", element: <Country /> },
  { id: "amount", element: <Amount /> },
  { id: "offer", element: <Offer /> },
  { id: "payment", element: <Payment /> }
];

function Step() {
  const { steps, index } = useStepsContext();
  return steps[index].element;
}

function Wizard() {
  return <Step />;
}

export { Wizard, steps };
