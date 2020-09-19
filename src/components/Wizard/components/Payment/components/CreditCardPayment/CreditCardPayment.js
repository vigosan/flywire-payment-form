import React, { useState } from "react";
import { CreditCard } from "@flywire/react-flywire-js";
import { Button, TextInput, Select } from "flycomponents";
import { useStepsContext } from "../../../../../../contexts";
import { Spinner } from "../../../../../Spinner";
import "@flywire/react-flywire-js/dist/index.css";
import "./CreditCardPayment.scss";

const months = [
  { label: "January", value: "1" },
  { label: "February", value: "2" },
  { label: "March", value: "3" },
  { label: "April", value: "4" },
  { label: "May", value: "5" },
  { label: "June", value: "6" },
  { label: "July", value: "7" },
  { label: "August", value: "8" },
  { label: "September", value: "9" },
  { label: "October", value: "10" },
  { label: "November", value: "11" },
  { label: "December", value: "12" },
];

const years = [
  { label: "2020", value: "2020" },
  { label: "2021", value: "2021" },
  { label: "2022", value: "2022" },
  { label: "2023", value: "2023" },
  { label: "2024", value: "2024" },
  { label: "2025", value: "2025" },
];

function CreditCardPayment() {
  const { navigation, goToPrevStep } = useStepsContext();
  const [paid, setPaid] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [cardNumber, setCardNumber] = useState();
  const [cardHolder, setCardHolder] = useState();
  const [cardCvv, setCardCvv] = useState();
  const [cardMonth, setCardMonth] = useState(new Date().getMonth() + 1);
  const [cardYear, setCardYear] = useState(new Date().getFullYear());
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  function handleOnSubmit(evt) {
    evt.preventDefault();
    setIsPaying(true);
    setTimeout(() => {
      setPaid(true);
      setIsPaying(false);
    }, 2000);
  }

  return (
    <div className="CreditCardPayment">
      <CreditCard
        cardNumber={cardNumber}
        cardHolder={cardHolder}
        cardMonth={cardMonth}
        cardYear={cardYear}
        cardCvv={cardCvv}
        isCardFlipped={isCardFlipped}
      />
      {isPaying ? (
        <Spinner />
      ) : paid ? (
        <div className="CreditCardPayment-paid">
          <h2>Congratulations! your payment is on its way</h2>
          <Button
            className="Button Button--secondary"
            onClick={() => navigation.go(0)}
          >
            I want to pay again!
          </Button>
        </div>
      ) : (
        <form>
          <TextInput
            label="Card Number"
            name="cardNumber"
            onChange={(_, value) => setCardNumber(value)}
            maxLength={16}
          />
          <TextInput
            label="Card Holder"
            name="cardHolder"
            onChange={(_, value) => setCardHolder(value)}
            maxLength={18}
          />
          <div className="CreditCardPayment-row">
            <Select
              defaultValue={cardMonth}
              name="cardMonth"
              onChange={(evt) => setCardMonth(evt.target.value)}
              values={months}
            />
            <Select
              defaultValue={cardYear}
              name="cardYear"
              onChange={(evt) => setCardYear(evt.target.value)}
              values={years}
            />
            <TextInput
              label="CVV"
              name="cardCvv"
              onChange={(_, value) => setCardCvv(value)}
              maxLength={3}
              onFocus={() => setIsCardFlipped(true)}
              onBlur={() => setIsCardFlipped(false)}
            />
          </div>
          <Button
            className="Button Button--primary Button--block"
            onClick={handleOnSubmit}
          >
            Submit
          </Button>
          <center>
            <span className="Button--link" onClick={goToPrevStep}>
              or go back
            </span>
          </center>
        </form>
      )}
    </div>
  );
}

export { CreditCardPayment };
