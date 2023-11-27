import React, { useEffect, useState } from 'react';
import {
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js'

import { PaymentFormContainer, FormContainer } from './payment-form.styles'
import { BUTTON_TYPE_CLASSES } from '../CustomButton/button/button.component';
import { PaymentButton } from './payment-form.styles';
import { CompassOutlined, ConsoleSqlOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { setOrderDetails } from 'redux/actions/checkoutActions';

const PaymentForm = (shipping, subtotal, payment, basket) => {

  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const amount = shipping.subtotal;
  const customer = shipping.shipping.fullname;
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const paymentHandler = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessingPayment(true);

    const response = await fetch('/.netlify/functions/create-payment-intent', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ amount: amount * 100 }),
    }).then(res => res.json());

    const { paymentIntent: { client_secret } } = response;

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: customer
        }
      }
    });

    setIsProcessingPayment(false);

    if (paymentResult.error) {
      alert(paymentResult.error);
    } else {
      if (paymentResult.paymentIntent.status === 'succeeded') {
        alert('Payment Successful');
      }
    }
  };

  const onClickNext = (form) => {
    dispatch(setOrderDetails({
      // basket: basket,
      // payment: payment,
      shipping: shipping,
      // subtotal: subtotal,
      // dateAdded: new Date().getTime(),
      // Total: Total
    }));
    // history.push(CHECKOUT_STEP_2);
  };

  return (

    <PaymentFormContainer   >
      <FormContainer onSubmit={paymentHandler} >
        <h2>Credit Card Payment:</h2>
        <CardElement />
        <PaymentButton
          buttonType={BUTTON_TYPE_CLASSES.inverted}
          isLoading={isProcessingPayment}
        >
          Pay Now
        </PaymentButton>
      </FormContainer>
    </PaymentFormContainer>
  )
}

export default PaymentForm;