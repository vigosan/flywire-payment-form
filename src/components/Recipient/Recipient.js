import React, { useEffect } from "react";
import { useAppContext, useFlywireContext } from "../../contexts";
import "./Recipient.scss";

function Recipient() {
  const { flywire } = useFlywireContext();
  const { recipient, setRecipient } = useAppContext();

  useEffect(() => {
    if (recipient) {
      setRecipient(recipient);
    }
  }, [recipient, setRecipient]);

  useEffect(() => {
    let didCancel = false;

    async function fetchApi() {
      const response = await flywire.recipient.findById({ id: "FLY" });
      setRecipient(response);
    }

    if (!didCancel && Object.keys(recipient).length === 0) {
      fetchApi();
    }

    return () => {
      didCancel = true;
    };
  }, [flywire.recipient, recipient, setRecipient]);

  return (
    <div className="Recipient">
      <img src={recipient?.logoUrl} height="50px" loading="lazy" alt="" />
    </div>
  );
}

export { Recipient };
