import { EditOutlined, LoadingOutlined } from '@ant-design/icons';
import { Boundary, ImageLoader } from 'components/common';
import { Formik } from 'formik';
import {
  useDocumentTitle, useFileHandler, useModal, useScrollTop
} from 'hooks';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from 'redux/actions/miscActions';
import { addSettings, updateSetting } from 'redux/actions/settingActions';
import * as Yup from 'yup';
import ConfirmModal from './ConfirmModal';
import EditForm from './EditForm';
import { call, put, select } from 'redux-saga/effects';
import { SettingsNavbar } from '../../component_setting';

const FormSchema = Yup.object().shape({
  fullname: Yup.string(),
  // .min(4, 'Full name should be at least 4 characters.')
  // .max(60, 'Full name should be only be 4 characters long.')
  // .required('Full name is required'),
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

const EditSettings = () => {
  useDocumentTitle('Edit Account | Shirts Sale! ');
  useScrollTop();
  // const modal = useModal();
  const dispatch = useDispatch();

  useEffect(() => () => {
    dispatch(setLoading(false));
  }, []);

  const { settings, profile, auth, isLoading } = useSelector((state) => ({
    profile: state.profile,
    settings: state.settings,
    auth: state.auth,
    isLoading: state.app.loading
  }));

  const initFormikValues = {
    fullname: settings.fullname || '',
    email: settings.email || '',
    address: settings.address || '',
    mobile: settings.mobile || {},
    avatar: settings.avatar || {},
    banner: settings.banner || {}
    // avatar: {},
    // banner: {}
  };

  const {
    imageFile,
    isFileLoading,
    onFileChange
  } = useFileHandler({ avatar: {}, banner: {} });

  const update = (form) => {
    dispatch(updateSetting({
      updates: {
        fullname: form.fullname,
        email: form.email,
        address: form.address,
        mobile: form.mobile,
        avatar: form.avatar,
        banner: form.banner,
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
    const fieldsChanged = Object.keys(form).some((key) => settings[key] !== form[key]);

    if (fieldsChanged || (Boolean(imageFile.banner.file || imageFile.avatar.file))) {
      update(form);
      // modal.onOpenModal();
    } else {
      console.log("failed to add: ");
    }

  };

  return (
    <Boundary>
      <SettingsNavbar
      />
      <div className="product-admin-items">
        <div className="edit-user">
          <h3 className="text-center">Edit Setting Details1</h3>
          <Formik
            initialValues={initFormikValues}
            validateOnChange
            validationSchema={FormSchema}
            onSubmit={onSubmitUpdate}
          >
            {(resetForm) => (
              <>
                <div className="user-profile-banner">
                  <div className="user-profile-banner-wrapper">
                    <ImageLoader
                      alt="Banner"
                      className="user-profile-banner-img"
                      src={imageFile.banner.url || settings.banner}
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
                      src={imageFile.avatar.url || settings.avatar}
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

export default EditSettings;