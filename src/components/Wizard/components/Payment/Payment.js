import React, { useState, useEffect } from "react";
import { useFlywireContext, useFormContext } from "../../../../contexts";
import { Spinner } from "../../../Spinner";
import "./Payment.scss";

function createMarkup(html) {
  return { __html: html };
}

function Instructions({ instructions = [] }) {
  return (
    <div className="Instructions">
      {instructions.map(({ label, value }) => {
        return (
          <div className="Instruction-Row" key={label}>
            <div className="Instruction-Cell">
              <p>{label}</p>
            </div>
            <div
              className="Instruction-Cell"
              dangerouslySetInnerHTML={createMarkup(value)}
            />
          </div>
        );
      })}
    </div>
  );
}

function Payment() {
  const { flywire } = useFlywireContext();
  const { values } = useFormContext();

  const [payment, setPayment] = useState({});

  useEffect(() => {
    let didCancel = false;

    async function fetchApi() {
      const { id: orderId, token } = await flywire.order.create(values);
      const response = await flywire.payment.create({
        orderId,
        token
      });
      setPayment(response);
    }

    if (!didCancel) {
      fetchApi();
    }

    return () => {
      didCancel = true;
    };
  }, [flywire.offer, flywire.order, flywire.payment, values]);

  if (Object.keys(payment).length === 0) {
    return (
      <div className="Payment">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="Payment">
      <h2>Your payment is on its way</h2>
      <p>
        Use the payment instructions below to send the money to us. Keep in mind
        that it will take 2-3 business days to arrive to us.
      </p>
      <div className="Payment-instructions">
        <Instructions instructions={payment.instructions} />
      </div>
    </div>
  );
}

export { Payment };
