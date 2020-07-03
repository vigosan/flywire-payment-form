import React, { useState, useRef, useEffect } from "react";
import { useValidate } from "@flywire/react-hooks";
import { MoneyInput as MoneyInputFly, Button } from "flycomponents";
import {
  useAppContext,
  useStepsContext,
  useFormContext,
} from "../../../../contexts";
import "./Amount.scss";

const constraints = {
  amount: {
    presence: true,
    numericality: {
      greaterThan: 0,
    },
  },
};

function Amount() {
  const { goToNextStep, goToPrevStep } = useStepsContext();
  const { recipient } = useAppContext();
  const { dirtyFields, update, values } = useFormContext();

  const inputRef = useRef();
  const [amount, setAmount] = useState(0);
  const { isValid, errors } = useValidate({ amount }, constraints);
  const { currency = {} } = recipient;

  useEffect(() => {
    if (values?.amount) {
      setAmount(values.amount);
    }
  }, [values]);

  useEffect(() => {
    inputRef.current.select();
  }, []);

  if (Object.keys(currency).length === 0) {
    return null;
  }

  function handleAmountChange(name, value) {
    setAmount(value);
  }

  function handleButtonClick() {
    update("amount", amount);
    goToNextStep();
  }

  return (
    <div className="Amount">
      <h2>{`Amount to send in ${currency.code}`}</h2>
      <MoneyInputFly
        currencySymbol={currency.symbol}
        decimalMark={currency.decimalMark}
        name="amount"
        required
        symbolFirst={currency.symbolFirst}
        thousandsSeparator={currency.thousandsSeparator}
        error={dirtyFields?.amount && errors?.amount && errors?.amount[0]}
        onChange={handleAmountChange}
        forwardRef={inputRef}
        value={values.amount}
      />
      <Button
        className="Button Button--primary Button--block"
        disabled={!isValid}
        onClick={handleButtonClick}
      >
        Next
      </Button>
      <span className="Button--link" onClick={goToPrevStep}>
        or go back
      </span>
    </div>
  );
}

export { Amount };
