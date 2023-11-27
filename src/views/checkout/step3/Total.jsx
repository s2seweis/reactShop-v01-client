import { ArrowLeftOutlined, CheckOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { CHECKOUT_STEP_4, CHECKOUT_STEP_2 } from 'constants/routes';
import { useFormikContext } from 'formik';
import { displayMoney } from 'helpers/utils';
import PropType from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setPaymentDetails } from 'redux/actions/checkoutActions';

const Total = ({ isInternational, subtotal }) => {
  const { values, submitForm } = useFormikContext();
  const history = useHistory();
  const dispatch = useDispatch();
  console.log(isInternational)

  const onClickBack = () => {
    // destructure to only select left fields omitting cardnumber and ccv
    const { cardnumber, ccv, ...rest } = values;

    dispatch(setPaymentDetails({ ...rest })); // save payment details
    history.push(CHECKOUT_STEP_4);
  };

  const address = useSelector((state) => state.app.address);

  return (
    <>
      <div className="basket-total text-right">
        <p className="basket-total-title">Total:</p>
        <h2 className="basket-total-amount">
          {displayMoney(subtotal + (isInternational ? 50 : 0))}
        </h2>
      </div>
      <br />
      <div className="checkout-shipping-action">

        <button
          className="button button-muted"
          onClick={() => history.push(CHECKOUT_STEP_2)}
          type="button"
        >
          <ArrowLeftOutlined />
          &nbsp;
          Go Back
        </button>

        <button
          className="button button-muted"
          onClick={() => onClickBack(values)}
          type="button"
        >
          Next Step
          &nbsp;
          <ArrowRightOutlined />
        </button>
      </div>
    </>

  );

}

Total.propTypes = {
  isInternational: PropType.bool.isRequired,
  subtotal: PropType.number.isRequired
  // subtotal: PropType.string.isRequired
};

export default Total;