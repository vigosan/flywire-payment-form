import React, { useState, useEffect } from "react";
import { Button } from "flycomponents";
import { useAppContext } from "../../../../contexts";
import "./Payment.scss";

function createMarkup(html) {
  return { __html: html };
}

function Instructions({ instructions = [] }) {
  return (
    <div class="Instructions">
      {instructions.map(({ label, value }) => {
        return (
          <div class="Instruction-Row">
            <div class="Instruction-Cell">
              <p>{label}</p>
            </div>
            <div
              class="Instruction-Cell"
              dangerouslySetInnerHTML={createMarkup(value)}
            />
          </div>
        );
      })}
    </div>
  );
}

function Payment() {
  const { flywire, values } = useAppContext();
  const [payment, setPayment] = useState({});

  useEffect(() => {
    let didCancel = false;

    async function fetchApi() {
      const { id: orderId, token } = await flywire.order.create(values);
      const response = await flywire.payment.create({
        orderId,
        token
      });
      console.log(response);
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
        <h2>Creating your payment...</h2>
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
