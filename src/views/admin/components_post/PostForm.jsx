/* eslint-disable jsx-a11y/label-has-associated-control */
import { CheckOutlined, LoadingOutlined } from '@ant-design/icons';
import {
  ImageLoader,
}
  from 'components/common';
import {
  CustomColorInput, CustomCreatableSelect, CustomInput, CustomTextarea
} from 'components/formik';
import {
  Field, FieldArray, Form, Formik
} from 'formik';

import { useFileHandler1, useFileHandler2, useFileHandler3 } from 'hooks';

import PropType from 'prop-types';
import React from 'react';
import * as Yup from 'yup';

import { useHistory } from 'react-router-dom';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { ADMIN_POSTS } from 'constants/routes';

// Default brand names that I used. You can use what you want
const brandOptions = [
  { value: 'Salt Maalat', label: 'Salt Maalat' },
  { value: 'Betsin Maalat', label: 'Betsin Maalat' },
  { value: 'Sexbomb', label: 'Sexbomb' },
  { value: 'Black Kibal', label: 'Black Kibal' }
];

const FormSchema = Yup.object().shape({
  name: Yup.string()
    .required('Post name is required.')
    .max(60, 'Post name must only be less than 60 characters.'),
  brand: Yup.string()
    .required('Brand name is required.'),
  price: Yup.number()
    .positive('Price is invalid.')
    .integer('Price should be an integer.')
    .required('Price is required.'),
  description: Yup.string()
    .required('Description is required.'),
  maxQuantity: Yup.number()
    .positive('Max quantity is invalid.')
    .integer('Max quantity should be an integer.')
    .required('Max quantity is required.'),
  keywords: Yup.array()
    .of(Yup.string())
    .min(1, 'Please enter at least 1 keyword for this post.'),
  sizes: Yup.array()
    .of(Yup.number())
    .min(1, 'Please enter a size for this post.'),
  isFeatured: Yup.boolean(),
  isRecommended: Yup.boolean(),
  availableColors: Yup.array()
    .of(Yup.string().required())
    .min(1, 'Please add a default color for this post.')
});

const PostForm = ({ post, onSubmit, isLoading }) => {
  const initFormikValues = {
    name: post?.name || '',
    brand: post?.brand || '',
    price: post?.price || 0,
    maxQuantity: post?.maxQuantity || 0,
    description: post?.description || '',
    keywords: post?.keywords || [],
    sizes: post?.sizes || [],
    isFeatured: post?.isFeatured || false,
    isRecommended: post?.isRecommended || false,
    availableColors: post?.availableColors || []
  };

  const {
    imageFile1,
    isFileLoading1,
    onFileChange1,
    removeImage1,
  } = useFileHandler1({ image1: {} });


  const {
    imageFile2,
    isFileLoading2,
    onFileChange2,
    removeImage2
  } = useFileHandler2({ image2: {}, imageCollection: post?.imageCollection || [] });

  const {
    imageFile3,
    isFileLoading3,
    onFileChange3,
    removeImage3,
  } = useFileHandler3({ image3: {} });

  const onSubmitForm = (form) => {
    if (imageFile1.image1.file1, imageFile2.image2.file2, imageFile3.image3.file3 || post.imageUrl) {
      onSubmit({
        ...form,
        quantity: 1,
        // due to firebase function billing policy, let's add lowercase version
        // of name here instead in firebase functions
        name_lower: form.name.toLowerCase(),
        dateAdded: new Date().getTime(),
        image1: imageFile1?.image1?.file1 || post.imageUrl,
        image2: imageFile2?.image2?.file2 || post.imageUrl,
        image3: imageFile3?.image3?.file3 || post.imageUrl,
        imageCollection: imageFile2.imageCollection
      });
    } else {
      // eslint-disable-next-line no-alert
      alert('Post thumbnail image is required.');
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
              onClick={() => history.push(ADMIN_POSTS)}
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
                    name="name"
                    type="text"
                    label="* Product Name"
                    placeholder="Gago"
                    style={{ textTransform: 'capitalize' }}
                    component={CustomInput}
                  />
                </div>
                &nbsp;
                <div className="product-form-field">
                  <CustomCreatableSelect
                    defaultValue={{ label: values.brand, value: values.brand }}
                    name="brand"
                    iid="brand"
                    options={brandOptions}
                    disabled={isLoading}
                    placeholder="Select/Create Brand"
                    label="* Brand"
                  />
                </div>
              </div>
              <div className="product-form-field">
                <Field
                  disabled={isLoading}
                  name="description"
                  id="description"
                  rows={3}
                  label="* Product Description"
                  component={CustomTextarea}
                />
              </div>
              <div className="d-flex">
                <div className="product-form-field">
                  <Field
                    disabled={isLoading}
                    name="price"
                    id="price"
                    type="number"
                    label="* Price"
                    component={CustomInput}
                  />
                </div>
                &nbsp;
                <div className="product-form-field">
                  <Field
                    disabled={isLoading}
                    name="maxQuantity"
                    type="number"
                    id="maxQuantity"
                    label="* Max Quantity"
                    component={CustomInput}
                  />
                </div>
              </div>
              <div className="d-flex">
                <div className="product-form-field">
                  <CustomCreatableSelect
                    defaultValue={values.keywords.map((key) => ({ value: key, label: key }))}
                    name="keywords"
                    iid="keywords"
                    isMulti
                    disabled={isLoading}
                    placeholder="Create/Select Keywords"
                    label="* Keywords"
                  />
                </div>
                &nbsp;
                <div className="product-form-field">
                  <CustomCreatableSelect
                    defaultValue={values.keywords.map((key) => ({ value: key, label: key }))}
                    name="sizes"
                    iid="sizes"
                    type="number"
                    isMulti
                    disabled={isLoading}
                    placeholder="Create/Select Sizes"
                    label="* Sizes (Millimeter)"
                  />
                </div>
              </div>
              <div className="product-form-field">
                <FieldArray
                  name="availableColors"
                  disabled={isLoading}
                  component={CustomColorInput}
                />
              </div>
              <div className="product-form-field">
                <span className="d-block padding-s">Image Collection</span>
                {!isFileLoading2 && (
                  <label htmlFor="product-input-file-collection">
                    <input
                      disabled={isLoading}
                      hidden
                      id="product-input-file-collection"
                      multiple
                      onChange={(e) => onFileChange2(e, { name2: 'imageCollection', type: 'multiple' })}
                      readOnly={isLoading}
                      type="file"
                    />
                    Choose Images
                  </label>
                )}
              </div>
              <div className="product-form-collection">
                <>
                  {imageFile2.imageCollection.length >= 1 && (
                    imageFile2.imageCollection.map((image2) => (
                      <div
                        className="product-form-collection-image"
                        key={image2.id}
                      >
                        <ImageLoader
                          alt=""
                          src={image2.url}
                        />
                        <button
                          className="product-form-delete-image"
                          onClick={() => removeImage2({ id: image2.id, name: 'imageCollection' })}
                          title="Delete Image"
                          type="button"
                        >
                          Delete
                          <i className="fa fa-times-circle" />
                        </button>
                      </div>
                    ))
                  )}
                </>
              </div>
              <br />
              <div className="d-flex">
                <div className="product-form-field">
                  <input
                    checked={values.isFeatured}
                    className=""
                    id="featured"
                    onChange={(e) => setValues({ ...values, isFeatured: e.target.checked })}
                    type="checkbox"
                  />
                  <label htmlFor="featured">
                    <h5 className="d-flex-grow-1 margin-0">
                      &nbsp; Add to Featured &nbsp;
                    </h5>
                  </label>
                </div>
                <div className="product-form-field">
                  <input
                    checked={values.isRecommended}
                    className=""
                    id="recommended"
                    onChange={(e) => setValues({ ...values, isRecommended: e.target.checked })}
                    type="checkbox"
                  />
                  <label htmlFor="recommended">
                    <h5 className="d-flex-grow-1 margin-0">
                      &nbsp; Add to Recommended &nbsp;
                    </h5>
                  </label>
                </div>
              </div>
              <br />
              <br />
              <br />
            </div>
            <div className="d-flex">
              {/* ----THUBMNAIL ----1 */}
              <div className="product-form-file">
                <div className="product-form-field">
                  <span className="d-block padding-s">* Thumbnail 1</span>
                  {!isFileLoading1 && (
                    <label htmlFor="product-input-file1">
                      <input
                        disabled={isLoading}
                        hidden
                        id="product-input-file1"
                        onChange={(e) => onFileChange1(e, { name1: 'image1', type: 'single' })}
                        readOnly={isLoading}
                        type="file"
                      />
                      Choose Image 1
                    </label>
                  )}
                </div>
                <div className="product-form-image-wrapper">
                  {(imageFile1.image1.url || post.image1) && (
                    <ImageLoader
                      alt=""
                      className="product-form-image-preview"
                      src={imageFile1.image1.url || post.image1}
                    />
                  )}
                </div>
              </div>
              {/* ----THUBMNAIL ----2 */}
              <div className="product-form-file">
                <div className="product-form-field">
                  <span className="d-block padding-s">* Thumbnail 2</span>
                  {!isFileLoading2 && (
                    <label htmlFor="product-input-file2">
                      <input
                        disabled={isLoading}
                        hidden
                        id="product-input-file2"
                        onChange={(e) => onFileChange2(e, { name2: 'image2', type: 'single' })}
                        readOnly={isLoading}
                        type="file"
                      />
                      Choose Image 2
                    </label>
                  )}
                </div>
                <div className="product-form-image-wrapper">
                  {(imageFile2.image2.url || post.image2) && (
                    <ImageLoader
                      alt=""
                      className="product-form-image-preview"
                      src={imageFile2.image2.url || post.image2}
                    />
                  )}
                </div>
              </div>
              {/* ----THUBMNAIL ----3 */}
              <div className="product-form-file">
                <div className="product-form-field">
                  <span className="d-block padding-s">* Thumbnail 3</span>
                  {!isFileLoading3 && (
                    <label htmlFor="product-input-file3">
                      <input
                        disabled={isLoading}
                        hidden
                        id="product-input-file3"
                        onChange={(e) => onFileChange3(e, { name3: 'image3', type: 'single' })}
                        readOnly={isLoading}
                        type="file"
                      />
                      Choose Image 3
                    </label>
                  )}
                </div>
                <div className="product-form-image-wrapper">
                  {(imageFile3.image3.url || post.image3) && (
                    <ImageLoader
                      alt=""
                      className="product-form-image-preview"
                      src={imageFile3.image3.url || post.image3}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="product-form-field product-form-submit">
              <button
                className="button"
                disabled={isLoading}
                type="submit"
                style={{ margin: "auto", marginTop: "30px", marginBottom: "30px" }}
              >
                {isLoading ? <LoadingOutlined /> : <CheckOutlined />}
                &nbsp;
                {isLoading ? 'Saving Post' : 'Save Post'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

PostForm.propTypes = {
  post: PropType.shape({
    name: PropType.string,
    brand: PropType.string,
    price: PropType.number,
    maxQuantity: PropType.number,
    description: PropType.string,
    keywords: PropType.arrayOf(PropType.string),
    imageCollection: PropType.arrayOf(PropType.object),
    sizes: PropType.arrayOf(PropType.string),
    image1: PropType.string,
    image2: PropType.string,
    image3: PropType.string,
    imageUrl: PropType.string,
    isFeatured: PropType.bool,
    isRecommended: PropType.bool,
    availableColors: PropType.arrayOf(PropType.string)
  }).isRequired,
  onSubmit: PropType.func.isRequired,
  isLoading: PropType.bool.isRequired
};

export default PostForm;