import React from 'react';
import { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

function Payment(shipping, basket) {
  const [stripePromise, setStripePromise] = useState(null);
  console.log("line:500", stripePromise);
  const [clientSecret, setClientSecret] = useState("");

const basketItems = shipping.basket.map((item) => {
  return {
    name: item.name,
    size: item.selectedSizeNew,
    toppings: item.toppings,
    price: item.selectedPriceTotal1,
  }
})

  useEffect(() => {
    fetch("https://reactshop-v01-server-771dbbaf8b75.herokuapp.com/api/config").then(async (r) => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("https://reactshop-v01-server-771dbbaf8b75.herokuapp.com/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        { 
          items: "t-shirt", 
          price: { id: "33000" },
          customer:  "swt" ,
          userId: "1234",
          cartItems: [{id:"01"},{id:"02"},{id:"03"}],
          shipping: shipping.shipping,
          name: shipping.shipping.fullname,
          basketItems: basketItems
        }
        ),
      // body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  return (
    <>
      <h1 style={{ textAlign:"center" }}>React Stripe and the Payment Element, Test:1</h1>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}

export default Payment;