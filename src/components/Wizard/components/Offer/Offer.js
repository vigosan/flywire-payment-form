import React, { useState, useEffect } from "react";
import { Offer as FwOffer } from "@flywire/react-flywire-js";
import {
  useFlywireContext,
  useFormContext,
  useStepsContext,
} from "../../../../contexts";
import { Spinner } from "../../../Spinner";
import "./Offer.scss";

const logos = [
  "https://p43.f3.n0.cdn.getcloudapp.com/items/YEuyq70k/bank-transfer-logo.png",
  "https://p43.f3.n0.cdn.getcloudapp.com/items/7Ku84Y9D/amex-logo.png",
];

function Offer() {
  const { flywire } = useFlywireContext();
  const { update } = useFormContext();
  const { goToNextStep, goToPrevStep } = useStepsContext();
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    let didCancel = false;

    async function fetchApi() {
      const response = await flywire.offer.findAll();
      setOffers(response);
    }

    if (!didCancel) {
      fetchApi();
    }

    return () => {
      didCancel = true;
    };
  }, [flywire.offer]);

  function handleOnClick(code) {
    update("offer", code);
    goToNextStep();
  }

  if (offers.length === 0) {
    return <Spinner />;
  }

  return (
    <div className="Amount">
      <h2>Select an offer</h2>
      <div className="Offer-list">
        {offers.map((offer, i) => (
          <FwOffer.Detailed
            amount={offer.price.value}
            currency={offer.price.currency.code}
            exchangeRate={offer.exchangeRate}
            logoUrl={logos[i]}
            name={offer.name
              .replace(" in Euros (EUR)", "")
              .replace("Domestic ", "")}
            subunit={offer.price.currency.subunitToUnit}
            key={offer.id}
            onSelect={() => handleOnClick(offer.id)}
          />
        ))}
      </div>
      <span className="Button--link" onClick={goToPrevStep}>
        or go back
      </span>
      <div className="Offer-info">
        <h3>Have you found a better offer?</h3>
        <p>Contact our sales team and we will try to make you happy.</p>
      </div>
    </div>
  );
}

export { Offer };
