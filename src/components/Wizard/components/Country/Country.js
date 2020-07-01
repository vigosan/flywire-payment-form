import React, { useState, useEffect } from "react";
import {
  useFlywireContext,
  useFormContext,
  useStepsContext
} from "../../../../contexts";
import { Spinner } from "../../../Spinner";
import "./Country.scss";

function CountryBox({ name, code, onClick }) {
  return (
    <div className="Country-box" onClick={onClick}>
      <img
        src={`https://www.countryflags.io/${code}/flat/64.png`}
        loading="lazy"
        alt=""
      />
      <span>{name}</span>
    </div>
  );
}

function Country({ error, onChange }) {
  const { flywire } = useFlywireContext();
  const { handleChange } = useFormContext();
  const { goToNextStep } = useStepsContext();

  const [countries, setCountries] = useState([]);

  useEffect(() => {
    let didCancel = false;

    async function fetchApi() {
      const response = await flywire.country.findAll();
      setCountries(response);
    }

    if (!didCancel) {
      fetchApi();
    }

    return () => {
      didCancel = true;
    };
  }, [flywire.country]);

  function handleOnClick(code) {
    handleChange("country", code);
    goToNextStep();
  }

  if (countries.length === 0) {
    return <Spinner />;
  }

  return (
    <div className="Country">
      <h2>Select your country</h2>
      <div className="Country-list">
        {countries.map(country => (
          <CountryBox
            {...country}
            key={country.code}
            onClick={() => handleOnClick(country.code)}
          />
        ))}
      </div>
      <div className="Country-info">
        <h3>Can't find your country?</h3>
        <p>Request us to start in your country aswell</p>
      </div>
    </div>
  );
}

export { Country };
