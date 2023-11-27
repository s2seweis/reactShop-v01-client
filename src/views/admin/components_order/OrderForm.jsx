/* eslint-disable jsx-a11y/label-has-associated-control */
import { CheckOutlined, LoadingOutlined } from '@ant-design/icons';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { ImageLoader } from 'components/common';
import {
  CustomColorInput, CustomCreatableSelect, CustomInput, CustomTextarea, CustomMobileInputDisabled
} from 'components/formik';
import {
  Field, FieldArray, Form, Formik
} from 'formik';
import { useFileHandler } from 'hooks';
import PropType from 'prop-types';
import React from 'react';
import * as Yup from 'yup';
import { OrderItem } from 'components/basket';
import { useSelector } from 'react-redux';
import { displayActionMessage, displayDate, displayMoney } from 'helpers/utils';
import { useMediaQuery } from 'react-responsive';
import MediaQuery from 'react-responsive';
import * as Mui from '@material-ui/core';
import { ADMIN_ORDERS } from 'constants/routes';
import { useHistory } from 'react-router-dom';
import {
  createTheme,
  responsiveFontSizes,
  MuiThemeProvider,
  Typography
} from "@material-ui/core";
import { HTML5_FMT } from 'moment/moment';

let theme = createTheme();
theme = responsiveFontSizes(theme);
const heading = "OUR WORK";
const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

// Default brand names that I used. You can use what you want
const brandOptions = [
  { value: 'Salt Maalat', label: 'Salt Maalat' },
  { value: 'Betsin Maalat', label: 'Betsin Maalat' },
  { value: 'Sexbomb', label: 'Sexbomb' },
  { value: 'Black Kibal', label: 'Black Kibal' }
];

const FormSchema = Yup.object().shape({
  name: Yup.string()
    .required('Menu name is required.')
    .max(60, 'Menu name must only be less than 60 characters.'),
  brand: Yup.string()
    .required('Brand name is required.'),
  subtotal: Yup.number()
    .positive('Price is invalid.')
    .integer('Price should be an integer.')
    .required('Price is required.'),
  id: Yup.string()
    .required('Description is required.'),
  maxQuantity: Yup.number()
    .positive('Max quantity is invalid.')
    .integer('Max quantity should be an integer.')
    .required('Max quantity is required.'),
  keywords: Yup.array()
    .of(Yup.string())
    .min(1, 'Please enter at least 1 keyword for this menu.'),
  sizes: Yup.array()
    .of(Yup.number())
    .min(1, 'Please enter a size for this menu.'),
  // basket: Yup.array()
  //   .of(Yup.number())
  //   .min(1, 'Please enter a size for this menu.'),
  isFeatured: Yup.boolean(),
  isRecommended: Yup.boolean(),
  availableColors: Yup.array()
    .of(Yup.string().required())
    .min(1, 'Please add a default color for this menu.')
});

const OrderForm = ({ order, onSubmit, isLoading, basket, authProvider }) => {
  const initFormikValues = {
    name: order?.name || '',
    fullname: order?.shipping.fullname || '',
    address: order?.shipping.address || '',
    email: order?.shipping.email || '',
    // address: order?.shipping.address || '',
    brand: order?.brand || '',
    subtotal: order?.subtotal || 0,
    maxQuantity: order?.maxQuantity || 0,
    id: order?.id || '',
    // dateAdded: order?.dateAdded || '',
    payment: order?.payment.type || '',
    keywords: order?.keywords || [],
    basket: order?.basket || [],
    sizes: order?.sizes || [],
    isFeatured: order?.isFeatured || false,
    isRecommended: order?.isRecommended || false,
    mobile: order.shipping.mobile || {},
    dateAdded: displayDate(order.dateAdded) || {},
    // mobile: order.mobile || {},
    availableColors: order?.availableColors || [],
    // address: order.address || '',
  };

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  });

  const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' });
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });
  const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' });

  const history = useHistory();
  const orders = useSelector((state) => state.orders);

  const {
    imageFile,
    isFileLoading,
    onFileChange,
    removeImage
  } = useFileHandler({ image: {}, imageCollection: order?.imageCollection || [] });

  const onSubmitForm = (form) => {
    if (imageFile.image.file || order.imageUrl) {
      onSubmit({
        ...form,
        quantity: 1,
        // due to firebase function billing policy, let's add lowercase version
        // of name here instead in firebase functions
        name_lower: form.name.toLowerCase(),
        dateAdded: new Date().getTime(),
        image: imageFile?.image?.file || order.imageUrl,
        imageCollection: imageFile.imageCollection
      });
    } else {
      // eslint-disable-next-line no-alert
      alert('Menu thumbnail image is required.');
    }
  };

  return (
    <div>
      <Formik
        initialValues={initFormikValues}
        validateOnChange
        validationSchema={FormSchema}
        onSubmit={onSubmitForm}
      >
        {({ values, setValues }) => (
          <Form className="edit-user">
            <button
              className="button-back-new button-muted-orders w-100-mobile"
              // disabled={authProvider !== 'password' || isLoading}
              onClick={() => history.push(ADMIN_ORDERS)}
              type="button"
            >
              <ArrowLeftOutlined />
              &nbsp;
              Back
            </button>
            <div className="user-tab-new">
              <div className="order-details">
                <button
                  className="button-back button-muted-new w-100-mobile"
                  disabled={authProvider !== 'password' || isLoading}
                  // onClick={() => history.push(ADMIN_ORDERS)}
                  type="button"
                >
                  {/* <ArrowLeftOutlined /> */}
                  &nbsp;
                  Order
                </button>
                <Field
                  disabled={authProvider !== 'password' || isLoading}
                  name="dateAdded"
                  type="text"
                  label="* Date Added"
                  placeholder="dateAdded"
                  component={CustomInput}
                // style={{ textTransform: 'capitalize' }}
                />
                <Field
                  disabled={authProvider !== 'password' || isLoading}
                  name="payment"
                  type="text"
                  label="* Payment"
                  placeholder="date Added"
                  component={CustomInput}
                  style={{ textTransform: 'capitalize' }}
                />
                <Field
                  disabled={authProvider !== 'password' || isLoading}
                  name="id"
                  type="text"
                  label="* Order Number"
                  placeholder="Enter your full name"
                  component={CustomInput}
                // style={{ textTransform: 'capitalize' }}
                />
                <Field
                  disabled={authProvider !== 'password' || isLoading}
                  name="fullname"
                  type="text"
                  label="* Full Name"
                  placeholder="Enter your full name"
                  component={CustomInput}
                  style={{ textTransform: 'capitalize' }}
                />
                <Field
                  disabled={authProvider !== 'password' || isLoading}
                  name="email"
                  type="email"
                  label="* Email Address"
                  placeholder="test@example.com"
                  component={CustomInput}
                />
                <Field
                  disabled={authProvider !== 'password' || isLoading}
                  name="address"
                  type="address"
                  label="* Address"
                  placeholder="Enter your full name"
                  component={CustomInput}
                // style={{ textTransform: 'capitalize' }}
                />
                <CustomMobileInputDisabled
                  disabled
                  defaultValue={values.mobile}
                  name="mobile"
                  label="Mobile Number"
                />
                <button
                  className="button-back button-muted-new w-100-mobile"
                  disabled={authProvider !== 'password' || isLoading}
                  // onClick={() => history.push(ADMIN_MENUS)}
                  type="button"
                >
                  {/* <ArrowLeftOutlined /> */}
                  &nbsp;
                  Order Summary
                </button>

                <div className="order-form-field">
                  {values.basket.map((product) => (
                    <OrderItem
                      basket={basket}

                      key={product.id}
                      product={product}
                    />
                  ))}
                </div>
                <div className="d-flex-total">
                  <div className="address-item-line-2">
                    <div className="order-form-field-total">
                      <h2>Total:</h2>
                    </div>
                  </div>
                  <div className="address-item-line-2">
                    <div className="order-form-field-total">
                      <h2 className="order-form-field-total">
                        {order.subtotal || <Skeleton width={50} />}
                        {' '}
                        $
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="order">
            </div>
          </Form>
        )}
      </Formik>
    </div >
  );
};

OrderForm.propTypes = {
  order: PropType.shape({
    name: PropType.string,
    email: PropType.string,
    address: PropType.string,
    fullname: PropType.string,
    brand: PropType.string,
    subtotal: PropType.number,
    maxQuantity: PropType.number,
    id: PropType.string,
    keywords: PropType.arrayOf(PropType.string),
    imageCollection: PropType.arrayOf(PropType.object),
    basket: PropType.arrayOf(PropType.object),
    sizes: PropType.arrayOf(PropType.string),
    image: PropType.string,
    imageUrl: PropType.string,
    isFeatured: PropType.bool,
    isRecommended: PropType.bool,
    mobile: PropType.object,
    availableColors: PropType.arrayOf(PropType.string)
  }).isRequired,
  onSubmit: PropType.func.isRequired,
  isLoading: PropType.bool.isRequired
};

export default OrderForm;