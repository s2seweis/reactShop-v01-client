import { EditOutlined, LoadingOutlined } from '@ant-design/icons';
import { Boundary, ImageLoader } from 'components/common';
import {
  useDocumentTitle, useFileHandler, useModal, useScrollTop
} from 'hooks';
import React, { useEffect, useState, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from 'redux/actions/miscActions';
import { addIngredients, updateIngredient } from 'redux/actions/ingredientActions';
import * as Yup from 'yup';
import ConfirmModal from '../../admin/component_ingredient/edit-ingredient/ConfirmModal';
import { call, put, select } from 'redux-saga/effects';
import PropType from 'prop-types';
import EditForm from '../ingredients/EditForm';
import { render } from "react-dom";
import Styles from "./Styles";
import { Form, Field } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { FieldArray } from "react-final-form-arrays";
import { FiArrowLeftCircle, FiArrowRightCircle, FiArrowDownCircle, FiArrowUpCircle } from 'react-icons/fi';

const IngredientsForm = (values) => {

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

  const {
    imageFile,
    isFileLoading,
    onFileChange
  } = useFileHandler({ avatar: {}, banner: {} });

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

  const update = (form) => {
    dispatch(updateIngredient({
      updates: {
        // fullname: form.fullname,
        // email: form.email,
        // address: form.address,
        // mobile: form.mobile,
        // it stazys empty when updating it
        // parameters1: form.parameters1 || [],
        parameters1: form?.parameters1?.map((person) => ({ name: person.name, price: Number(person.price) })) || [],
        parameters2: form.parameters2 || [],
        parameters3: form.parameters3 || [],
        parameters4: form.parameters4 || [],
        // parameters1: form?.parameters1?.map((person) => ({ name: person.name, price: person.price })) || []
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

  // small
  const [isActive, setIsActive] = useState(false);
  // Test Start
  const [favorite, setFavorite] = useState(false);
  // medium
  const [isActive1, setIsActive1] = useState(false);
  // large
  const [isActive2, setIsActive2] = useState(false);
  // xl
  const [isActive3, setIsActive3] = useState(false);
  // ??????????????
  const [selected, setIsSelected] = useState("");
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  const onSubmit = async values => {
    await sleep(300);
    dispatch(updateIngredient({
      updates: {
        // fullname: form.fullname,
        // email: form.email,
        // address: form.address,
        // mobile: form.mobile,
        // it stazys empty when updating it
        // parameters1: form.parameters1 || [],
        // customers: values,
        // parameters2: values.parameters2 || [],
        // parameters3: values.parameters3 || [],
        // parameters4: values.parameters4 || [],
        // parameters1: values?.parameters1?.map((person) => ({ name: person.name, price: person.price })) || []
      },
      files: {
        bannerFile: imageFile.banner.file,
        avatarFile: imageFile.avatar.file
      },
      // credentials
    }));

    window.alert(JSON.stringify(values, 0, 2));
  };

  const test1 = { customers: ingredients.customers?.customers?.map((person) => ({ name: person.name, price: person.price })) || [] }
  
  return (
    <Boundary>
      <div className="product-admin-items">
        <div className="edit-user">
          <h3 className="text-center"
            style={{ marginBottom: "30px" }}
          >Edit Ingredients (Formik)</h3>
          <EditForm />
        </div>
      </div>
    </Boundary>
  );
};

IngredientsForm.propTypes = {
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

export default IngredientsForm;
