
import { EditOutlined, LoadingOutlined } from '@ant-design/icons';
import { Boundary, ImageLoader } from 'components/common';
import { Formik, Field, Form, FieldArray } from 'formik';
import {
  useDocumentTitle, useFileHandler, useModal, useScrollTop
} from 'hooks';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from 'redux/actions/miscActions';
import { addIngredients, updateIngredient } from 'redux/actions/ingredientActions';
import * as Yup from 'yup';
import ConfirmModal from '../edit-ingredient/ConfirmModal';
import EditForm from '../edit-ingredient/EditForm';
import { call, put, select } from 'redux-saga/effects';

import { IngredientsNavbar } from '../../component_ingredient';
// Just add this feature if you want :P

const UserWishListTab = (parameters) => {

  useDocumentTitle('Edit Account | Shirts Sale! - Ingredients ');
  useScrollTop();

  // const modal = useModal();
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
    fullname: ingredients.email || '',
    email: ingredients.email || '',
    address: ingredients.address || '',
    mobile: ingredients.mobile || {},
    avatar: ingredients.avatar || {},
    banner: ingredients.banner || {},

    parameters1: ingredients?.parameters1?.map((person) => ({ name: person.name, preis1: person.preis1 })) || []

  };

  const {
    imageFile,
    isFileLoading,
    onFileChange
  } = useFileHandler({ avatar: {}, banner: {} });



  const update = (form) => {
    dispatch(updateIngredient({
      updates: {
        fullname: form.email,
        email: form.email,
        address: form.address,
        mobile: form.mobile,
        // it stazys empty when updating it
        avatar: form.avatar,
        banner: form.banner,
        parameters1: form.parameters1 || [],
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
    } else {
      console.log("failed to add: ");
    }

  };

  return (

    <Boundary>
      <IngredientsNavbar
      />
      <div className="product-admin-items">
        <div className="edit-user">
          <h3 className="text-center">Edit Ingredients</h3>
          <Formik
            initialValues={initFormikValues}
            validateOnChange
            // validationSchema={FormSchema}
            onSubmit={onSubmitUpdate}
          // onSubmit={onSubmitAdd}
          // onSubmit={(onSubmitUpdate, {resetForm}) => {
          //   console.log(onSubmitUpdate);
          //   resetForm({ initFormikValues });
          // } }
          >
            {(values, setValues) => (
              <>
                <div className="user-profile-banner">
                  <div className="user-profile-banner-wrapper">
                    <ImageLoader
                      alt="Banner"
                      className="user-profile-banner-img"
                      src={imageFile.banner.url || ingredients.banner}
                    />
                    {isFileLoading ? (
                      <div className="loading-wrapper">
                        <LoadingOutlined />
                      </div>
                    ) : (
                      <label
                        className="edit-button edit-banner-button"
                        htmlFor="edit-banner"
                      >
                        <input
                          accept="image/x-png,image/jpeg"
                          disabled={isLoading}
                          hidden
                          id="edit-banner"
                          onChange={(e) => onFileChange(e, { name: 'banner', type: 'single' })}
                          type="file"
                        />
                        <EditOutlined />
                      </label>
                    )}
                  </div>
                  <div className="user-profile-avatar-wrapper">
                    <ImageLoader
                      alt="Avatar"
                      className="user-profile-img"
                      src={imageFile.avatar.url || ingredients.avatar}
                    />
                    {isFileLoading ? (
                      <div className="loading-wrapper">
                        <LoadingOutlined />
                      </div>
                    ) : (
                      <label
                        className="edit-button edit-avatar-button"
                        htmlFor="edit-avatar"
                      >
                        <input
                          accept="image/x-png,image/jpeg"
                          disabled={isLoading}
                          hidden
                          id="edit-avatar"
                          onChange={(e) => onFileChange(e, { name: 'avatar', type: 'single' })}
                          type="file"
                        />
                        <EditOutlined />
                      </label>
                    )}
                  </div>
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

export default UserWishListTab;