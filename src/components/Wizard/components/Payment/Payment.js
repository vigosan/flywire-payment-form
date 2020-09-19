import React from "react";
import { useFormContext } from "../../../../contexts";
import "./Payment.scss";
import { BankTransferPayment, CreditCardPayment } from "./components";

function Payment() {
  const { values } = useFormContext();
  const isBankTransfer =
    values.offer === "MTAwMDAwMCBwdF9iYW5rX3RyYW5zZmVyX2V1ciBFUw==";

  return isBankTransfer ? <BankTransferPayment /> : <CreditCardPayment />;
}

export { Payment };
