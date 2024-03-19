import "../App.css";
import Reacts, { useEffect, useState } from "react";
import HeroBanner from "./components/herobanner";
import Section1 from "./components/section1";
import Section2 from "./components/section2";
import Section from "./components/section";
import React from "react";
import ReactDOM from "react-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutPage from "./CheckoutPage";

function YoutubePremium() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    fetch("http://localhost:5000/api/premium/")
      .then((res) => res.text())
      .then((data) => setMessage(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="main">
      <HeroBanner />
      <Section1 />
      <Section2 />
      <Section />
      <App />
    </div>
  );
}

export default YoutubePremium;

const stripePromise = loadStripe(
  "pk_test_51OuE4UJis95gsMso7jUBhcYW3gvChETZUDg77xtHGrAGa8ChM8IYhzyjKPP6ofTrrasHgGHSls9JOASj2RECn7gC00vpnVS9hb"
);

function App() {
  const options = {
    mode: "payment",
    amount: 1099,
    currency: "usd",
    // Customizable with appearance API.
    appearance: {
      /*...*/
    },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutPage />
    </Elements>
  );
}
