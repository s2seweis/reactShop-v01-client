import { ArrowRightOutlined, ShopOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { BasketItem } from 'components/basket';
import { CHECKOUT_STEP_2, CHECKOUT_STEP_3 } from 'constants/routes';
import { displayMoney } from 'helpers/utils';
import { useDocumentTitle, useScrollTop } from 'hooks';
import PropType from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { StepTracker } from '../components';
import withCheckout from '../hoc/withCheckout';
import { setOrderDetails } from 'redux/actions/checkoutActions';
import Payment from '../../../stripe-payment-element/Payment'
import { useEffect, useState } from "react";

const Order = ({ basket, payment, shipping, subtotal, Total }) => {
  useDocumentTitle('Stripe Intergration | Step 4');

  const { auth } = useSelector((state) => ({
    auth: state.auth,
  }));

  const productId = basket.map((product) => product.id)
  const basketItems = basket.map((product) => product)
  const dispatch = useDispatch();
  const history = useHistory();

  const onClickNext = (form) => {
    dispatch(setOrderDetails({
      basket: basket,
      payment: payment,
      shipping: shipping,
      subtotal: subtotal,
      dateAdded: new Date().getTime(),
    }));
  };

  return (
    <div className="checkout">
      <StepTracker current={4} />
      <div className="checkout-step-1">
        <h3 className="text-center">Order Summary</h3>
        <div className="checkout-items"
        >
          {basket.map((product) => (
            <BasketItem
              basket={basket}
              dispatch={dispatch}
              key={product.id}
              product={product}
            />
          ))}
        </div>
        <h1
          style={{ textAlign: "center" }}
        >{displayMoney(subtotal)}
        </h1>
        <span className="d-block text-center">Almost Complete. </span>
        <br />
        <br />
        <div className="checkout-shipping-action">
          <button
            className="button button-muted"
            onClick={() => history.push(CHECKOUT_STEP_3)}
            type="button"
          >
            <ArrowLeftOutlined />
            &nbsp;
            Go Back
          </button>
          <button
            className="button"
            onClick={onClickNext}
            type="submit"
          >
            Place Order
            &nbsp;
            <ArrowRightOutlined />
          </button>
        </div>
      </div>
      <div className='stripe-payment-element'
      style={{  marginTop:"50px" }}>
        <Payment
        shipping={shipping}
        basket={basket}
        />
      </div>
    </div>
  );
};

export default withCheckout(Order);