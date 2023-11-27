import { EditOutlined, LoadingOutlined } from '@ant-design/icons';
import { Boundary, ImageLoader } from 'components/common';
import { Formik, Field, Form, FieldArray, useFormikContext } from 'formik';
import {
  useDocumentTitle, useFileHandler, useModal, useScrollTop
} from 'hooks';
import React, { useEffect, useState, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from 'redux/actions/miscActions';
import { addIngredients, updateIngredient } from 'redux/actions/ingredientActions';
import * as Yup from 'yup';
import ConfirmModal from './ConfirmModal';
import { call, put, select } from 'redux-saga/effects';
import { IngredientsNavbar } from '../../component_ingredient';
import PropType from 'prop-types'
import EditForm from './EditForm';

const FormSchema = Yup.object().shape({
  fullname: Yup.string(),

  email: Yup.string()
    .email('Email is not valid.'),
  // .required('Email is required.'),
  address: Yup.string(),
  mobile: Yup.object()
    .shape({
      country: Yup.string(),
      countryCode: Yup.string(),
      dialCode: Yup.string(),
      value: Yup.string()
    })
});

const EditIngredients = () => {

  useDocumentTitle('Edit Account | Shirts Sale! - Ingredients ');
  useScrollTop();
  const dispatch = useDispatch();

  useEffect(() => () => {
    dispatch(setLoading(false));
  }, []);

  const { ingredients, profile, auth, isLoading } = useSelector((state) => ({
    profile: state.profile,
    ingredients: state.ingredients,
    auth: state.auth,
    isLoading: state.app.loading
  }));

  const initFormikValues = {
    fullname: ingredients?.email || '',
    email: ingredients?.email || '',
    address: ingredients?.address || '',
    mobile: ingredients?.mobile || {},
    avatar: ingredients?.avatar || {},
    banner: ingredients?.banner || {},

    parameters1: ingredients?.parameters1?.map((person) => ({ name: person.name, price: person.price.toFixed(2) })) || [],
    parameters2: ingredients?.parameters2?.map((person) => ({ name: person.name, price: person.price })) || [],
    parameters3: ingredients?.parameters3?.map((person) => ({ name: person.name, price: person.price })) || [],
    parameters4: ingredients?.parameters4?.map((person) => ({ name: person.name, price: person.price })) || []
  };

  const {
    imageFile,
    isFileLoading,
    onFileChange
  } = useFileHandler({ avatar: {}, banner: {} });

  const update = (form) => {
    dispatch(updateIngredient({
      updates: {
        fullname: form.fullname,
        email: form.email,
        address: form.address,
        mobile: form.mobile,
        avatar: form.avatar,
        banner: form.banner,

        // parameters1: form.parameters1 || [],
        parameters1: form?.parameters1?.map((person) => ({ name: person.name, price: Number(person.price) })) || [],
        parameters2: form.parameters2 || [],
        parameters3: form.parameters3 || [],
        parameters4: form.parameters4 || [],
      },
      files: {
        bannerFile: imageFile.banner.file,
        avatarFile: imageFile.avatar.file
      },
      // credentials
    }));
  };

  const onSubmitUpdate = (form) => {
    // check if data has changed
    const fieldsChanged = Object.keys(form).some((key) => ingredients[key] !== form[key]);

    if (fieldsChanged || (Boolean(imageFile.banner.file || imageFile.avatar.file))) {
      update(form);
      // modal.onOpenModal();
    } else {
      console.log("failed to add: ");
    }

  };

  return (
    <Boundary>
      <div className="product-admin-items">
        <div className="edit-user">
          <h3 className="text-center">Edit Ingredients (Formik)</h3>
          <Formik
            initialValues={initFormikValues}
            validateOnChange
            // validationSchema={FormSchema}
            onSubmit={onSubmitUpdate}
          >
            {(values, setValues) => (
              <>
                <div className="user-profile-banner">
                </div>
                <EditForm />
              </>
            )}
          </Formik>
        </div>
      </div>
    </Boundary>
  );
};

EditIngredients.propTypes = {
  ingredients: PropType.shape({
    preis1: PropType.number
    //   name: PropType.string,
    //   brand: PropType.string,
    //   price: PropType.number,
    //   sizes_new: PropType.object,
    //   prices_new: PropType.object,
    //   maxQuantity: PropType.number,
    //   description: PropType.string,
    //   keywords: PropType.arrayOf(PropType.string),
    //   imageCollection: PropType.arrayOf(PropType.object),
    //   sizes: PropType.arrayOf(PropType.string),
    //   image: PropType.string,
    //   imageUrl: PropType.string,
    //   isFeatured: PropType.bool,
    //   isRecommended: PropType.bool,
    //   availableColors: PropType.arrayOf(PropType.string)


  }).isRequired,
  onSubmit: PropType.func.isRequired,
  isLoading: PropType.bool.isRequired


};

export default EditIngredients;