/* eslint-disable jsx-a11y/label-has-associated-control */
import { CheckOutlined, LoadingOutlined } from '@ant-design/icons';
import { ImageLoader } from 'components/common';
import {
  CustomColorInput, CustomCreatableSelect, CustomInput, CustomTextarea, CustomMobileInput
} from 'components/formik';
import {
  Field, FieldArray, Form, Formik, useFormikContext
} from 'formik';
import { useFileHandler } from 'hooks';
import PropType from 'prop-types';
import React from 'react';
import * as Yup from 'yup';

import { useHistory } from 'react-router-dom';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { ADMIN_USERS } from 'constants/routes';

// Default role names that I used. You can use what you want
const roleOptions = [
  { value: 'admin', label: 'admin' },
  { value: 'user', label: 'user' },
];

const FormSchema = Yup.object().shape({
  fullname: Yup.string()
    .required('User fullname is required.')
    .max(60, 'User fullname must only be less than 60 characters.'),
  role: Yup.string()
    .required('role name is required.'),
  // price: Yup.number()
  //   .positive('Price is invalid.')
  //   .integer('Price should be an integer.')
  //   .required('Price is required.'),
  email: Yup.string()
    .required('Email is required.'),
  address: Yup.string()
    .required('Email is required.')
  // maxQuantity: Yup.number()
  //   .positive('Max quantity is invalid.')
  //   .integer('Max quantity should be an integer.')
  //   .required('Max quantity is required.'),
  // keywords: Yup.array()
  //   .of(Yup.string())
  //   .min(1, 'Please enter at least 1 keyword for this user.'),
  // sizes: Yup.array()
  //   .of(Yup.number())
  //   .min(1, 'Please enter a size for this user.'),
  // isFeatured: Yup.boolean(),
  // isRecommended: Yup.boolean(),
  // availableColors: Yup.array()
  //   .of(Yup.string().required())
  //   .min(1, 'Please add a default color for this user.')
});

const UserForm = ({ user, onSubmit, isLoading }) => {
  const initFormikValues = {
    fullname: user?.fullname || '',
    role: user?.role || '',
    // price: user?.price || 0,
    // maxQuantity: user?.maxQuantity || 0,
    email: user?.email || '',
    address: user?.address || '',
    mobile: user?.mobile || ''
    // keywords: user?.keywords || [],
    // sizes: user?.sizes || [],
    // isFeatured: user?.isFeatured || false,
    // isRecommended: user?.isRecommended || false,
    // availableColors: user?.availableColors || [],
  };

  const onSubmitForm = (form) => {
    {
      onSubmit({
        ...form,
        // quantity: 1,
        // due to firebase function billing policy, let's add lowercase version
        // of name here instead in firebase functions
        name_lower: form.fullname.toLowerCase(),
        dateAdded: new Date().getTime(),
        // image: imageFile?.image?.file || user.imageUrl,
        // imageCollection: imageFile.imageCollection
      });
    }
  };

  const history = useHistory();

  return (
    <div>
      <Formik
        initialValues={initFormikValues}
        validateOnChange
        validationSchema={FormSchema}
        onSubmit={onSubmitForm}
      >
        {({ values, setValues }) => (
          <Form className="product-form">
            <button
              className="button-back-new button-muted w-100-mobile"
              // disabled={authProvider !== 'password' || isLoading}
              onClick={() => history.push(ADMIN_USERS)}
              type="button"
            >
              <ArrowLeftOutlined />
              &nbsp;
              Back
            </button>
            <div className="product-form-inputs">
              <div className="d-flex">
                <div className="product-form-field">
                  <Field
                    disabled={isLoading}
                    name="fullname"
                    type="text"
                    label="* fullname"
                    placeholder="Gago"
                    style={{ textTransform: 'capitalize' }}
                    component={CustomInput}
                  />
                </div>
                &nbsp;
                <div className="product-form-field">
                  <CustomCreatableSelect
                    defaultValue={{ label: values.role, value: values.role }}
                    name="role"
                    iid="role"
                    options={roleOptions}
                    disabled={isLoading}
                    placeholder="Select/Create role"
                    label="* Role"
                  />
                </div>
              </div>
              <div className="product-form-field">
                <Field
                  disabled={isLoading}
                  name="email"
                  id="email"
                  rows={1}
                  label="* Email:"
                  component={CustomTextarea}
                />
              </div>
              <div className="product-form-field">
                <Field
                  disabled={isLoading}
                  name="address"
                  id="address"
                  rows={1}
                  label="* Address:"
                  component={CustomTextarea}
                />
                <CustomMobileInput
                  defaultValue={values.mobile}
                  name="mobile"
                  disabled={isLoading}
                  label="Mobile Number (Will be used for checkout)"
                />
              </div>
              <br />
              <br />
              <br />
              <br />
              <div className="product-form-field product-form-submit">
                <button
                  className="button-users"
                  disabled={isLoading}
                  type="submit"
                >
                  {isLoading ? <LoadingOutlined /> : <CheckOutlined />}
                  &nbsp;
                  {isLoading ? 'Saving User' : 'Save User'}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

UserForm.propTypes = {
  user: PropType.shape({
    fullname: PropType.string,
    role: PropType.string,
    price: PropType.number,
    // maxQuantity: PropType.number,
    email: PropType.string,
    address: PropType.string,
    mobile: PropType.string,
    // keywords: PropType.arrayOf(PropType.string),
    // imageCollection: PropType.arrayOf(PropType.object),
    // sizes: PropType.arrayOf(PropType.string),
    // image: PropType.string,
    // imageUrl: PropType.string
    // isFeatured: PropType.bool,
    // isRecommended: PropType.bool,
    // availableColors: PropType.arrayOf(PropType.string)
  }).isRequired,
  onSubmit: PropType.func.isRequired,
  isLoading: PropType.bool.isRequired
};

export default UserForm;