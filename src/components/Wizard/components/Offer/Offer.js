import React, { useState, useEffect } from "react";
import { Button } from "flycomponents";
import { useAppContext } from "../../../../contexts";
import "./Offer.scss";

function Price({ amount, currency }) {
  return new Intl.NumberFormat("en-EN", {
    style: "currency",
    currency: "EUR"
  }).format(amount);
}

function OfferBox({ name, price, onClick }) {
  return (
    <div className="Offer-box" onClick={onClick}>
      <img
        src="https://s22.postimg.cc/8mv5gn7w1/paper-plane.png"
        alt=""
        class="pricing-img"
      />
      <h2 class="Offer-header">{name}</h2>
      <span class="Offer-price">
        <Price
          amount={price.value / price.currency.subunitToUnit}
          currency={price.currency.code}
        />
      </span>
      <Button
        className="Button Button--primary Button--block"
        onClick={onClick}
      >
        Select
      </Button>
    </div>
  );
}

function Offer() {
  const { flywire, values, goToNextStep, handleChange } = useAppContext();
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
    handleChange("offer", code);
    goToNextStep();
  }

  return (
    <div className="Amount">
      <h2>Select an offer</h2>
      <div className="Offer-list">
        {offers.map(offer => (
          <OfferBox
            {...offer}
            key={offer.id}
            onClick={() => handleOnClick(offer.id)}
          />
        ))}
      </div>
      <div className="Offer-info">
        <h3>Have you found a better offer?</h3>
        <p>Contact our sales team and we will try to make you happy.</p>
      </div>
    </div>
  );
}

export { Offer };
