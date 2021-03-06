import React from "react";
import "./Ribbon.scss";

function Ribbon() {
  return (
    <a
      href="https://github.com/vigosan/flywire-payment-form"
      className="Ribbon"
    >
      <img
        width="149"
        height="149"
        src="https://github.blog/wp-content/uploads/2008/12/forkme_right_white_ffffff.png?resize=149%2C149"
        className="attachment-full size-full"
        alt="Fork me on GitHub"
        data-recalc-dims="1"
        loading="lazy"
      />
    </a>
  );
}

export { Ribbon };
