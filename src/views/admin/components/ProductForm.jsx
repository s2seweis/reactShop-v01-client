/* eslint-disable jsx-a11y/label-has-associated-control */
import { CheckOutlined, LoadingOutlined } from '@ant-design/icons';
import { ImageLoader } from 'components/common';
import {
  CustomColorInput, CustomCreatableSelect, CustomInput, CustomTextarea
} from 'components/formik';
import {
  Field, FieldArray, Form, Formik
} from 'formik';
import { useFileHandler } from 'hooks';
import PropType from 'prop-types';
import React from 'react';
import * as Yup from 'yup';
import FormikFieldArrayForm from 'components/common/FormikFieldArrayForm';
import { ADMIN_PRODUCTS } from 'constants/routes';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { SET_LAST_REF_KEY } from 'constants/constants';

// Default brand names that I used. You can use what you want
const brandOptions = [
  { value: 'Salt Maalat', label: 'Salt Maalat' },
  { value: 'Betsin Maalat', label: 'Betsin Maalat' },
  { value: 'Sexbomb', label: 'Sexbomb' },
  { value: 'Black Kibal', label: 'Black Kibal' }
];

const sizeOptions = [
  { value: 'Small', label: 'Small' },
  { value: 'Medium', label: 'Medium' },
  { value: 'Large', label: 'Large' },
  { value: 'Extra Large', label: 'Extra Large' }
];

const FormSchema = Yup.object().shape({
  name: Yup.string()
    .required('Product name is required.')
    .max(60, 'Product name must only be less than 60 characters.'),
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
    .min(1, 'Please enter at least 1 keyword for this product.'),
  sizes: Yup.array()
    .of(Yup.string())
    .min(1, 'Please enter a size for this product.'),
  isFeatured: Yup.boolean(),
  isRecommended: Yup.boolean(),
  availableColors: Yup.array()
    .of(Yup.string().required())
    .min(1, 'Please add a default color for this product.')
});

const ProductForm = ({ product, onSubmit, isLoading, authProvider, parameters }) => {

  const history = useHistory();


  const initFormikValues = {
    name: product?.name || '',
    brand: product?.brand || '',
    price: product?.price || 0,
    // info:https://formik.org/docs/guides/arrays
    sizes_new: {
      small: product?.sizes_new.small || 'small',
      medium: product?.sizes_new.medium || 'medium',
      large: product?.sizes_new.large || 'large',
      extra_large: product?.sizes_new.extra_large || 'extra large',
    },
    prices_new: {
      small: product?.prices_new.small || '5',
      medium: product?.prices_new.medium || '10',
      large: product?.prices_new.large || '15',
      extra_large: product?.prices_new.extra_large || '20',
    },
    maxQuantity: product?.maxQuantity || 0,
    description: product?.description || '',
    keywords: product?.keywords || [],
    sizes: product?.sizes,
    isFeatured: product?.isFeatured || false,
    isRecommended: product?.isRecommended || false,
    availableColors: product?.availableColors || [],
    // tickets: product?.tickets,

    // https://stackoverflow.com/questions/40348171/es6-map-an-array-of-objects-to-return-an-array-of-objects-with-new-keys
    tickets: product?.tickets?.map((person) => ({ name: person.name, email: person.email })) || [],
    toggle: false,
  };

  const {
    imageFile,
    isFileLoading,
    onFileChange,
    removeImage
  } = useFileHandler({ image: product?.image || {}, imageCollection: product?.imageCollection || [] });

  const onSubmitForm = (form) => {
    if (imageFile.image.file ||
      product?.image
      // product.imageUrl
    ) {
      onSubmit({
        ...form,
        quantity: 1,
        // due to firebase function billing policy, let's add lowercase version
        // of name here instead in firebase functions
        name_lower: form.name.toLowerCase(),
        dateAdded: new Date().getTime(),
        image: imageFile?.image?.file ||
          // product.imageUrl,
          product?.image,
        imageCollection: imageFile.imageCollection
      });
    } else {
      // eslint-disable-next-line no-alert
      alert('Product thumbnail image is required.');
    }
  };

  return (

    <div className='product-tab-content'>
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
                className=""
                style={{padding:"5px"}}
                // disabled={authProvider !== 'password' || isLoading}
                onClick={() => history.push(ADMIN_PRODUCTS)}
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
                      id="brand"
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
                    className="field1"
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
                <div className='checkbox-ingredients'
                  style={{ display: "flex", width: "300px", alignItems: "center" }}
                >
                  <h3 style={{ marginTop: "20px" }}>Checkbox:</h3>
                  <label style={{ width: "100px", padding: "4rem", marginTop: "20px", marginLeft: "20px" }} >
                    <Field type="checkbox" name="toggle" />
                    {`${values.toggle}`}
                  </label>
                </div>
                <div className="d-flex-vari-top">
                  <div className="d-flex-vari">
                    <div className="product-form-field-vari">
                      <Field
                        disabled={isLoading}
                        name="sizes_new.small"
                        id="sizes_new.small"
                        type="sizes_new.small"
                        label="Sizes"
                        component={CustomInput}
                      />
                    </div>
                    <div className="product-form-field-vari">
                      <Field
                        disabled={isLoading}
                        name="sizes_new.medium"
                        id="sizes_new.medium"
                        type="sizes_new.medium"
                        // label="sizes_new.medium"
                        component={CustomInput}
                      />
                    </div>
                    <div className="product-form-field-vari">
                      <Field
                        disabled={isLoading}
                        name="sizes_new.large"
                        id="sizes_new.large"
                        type="sizes_new.large"
                        // label="sizes_new.small"
                        component={CustomInput}
                      />
                    </div>
                    <div className="product-form-field-vari">
                      <Field
                        disabled={isLoading}
                        name="sizes_new.extra_large"
                        id="sizes_new.extra_large"
                        type="sizes_new.extra_large"
                        // label="sizes_new.medium"
                        component={CustomInput}
                      />
                    </div>
                  </div>
                  <div className="d-flex-vari">
                    <div className="product-form-field-vari">
                      <Field
                        disabled={isLoading}
                        name="prices_new.small"
                        id="prices_new.small"
                        type="prices_new.small"
                        label="Prices"
                        component={CustomInput}
                      />
                    </div>
                    <div className="product-form-field-vari">
                      <Field
                        disabled={isLoading}
                        name="prices_new.medium"
                        id="prices_new.medium"
                        type="prices_new.medium"
                        // label="prices_new.medium"
                        component={CustomInput}
                      />
                    </div>
                    <div className="product-form-field-vari">
                      <Field
                        disabled={isLoading}
                        name="prices_new.large"
                        id="prices_new.large"
                        type="prices_new.large"
                        // label="prices_new.small"
                        component={CustomInput}
                      />
                    </div>
                    <div className="product-form-field-vari">
                      <Field
                        disabled={isLoading}
                        name="prices_new.extra_large"
                        id="prices_new.extra_large"
                        type="prices_new.extra_large"
                        // label="prices_new.medium"
                        component={CustomInput}
                      />
                    </div>
                  </div>
                </div>
                <div className="d-flex">
                  <div className="product-form-field">
                    <CustomCreatableSelect
                      defaultValue={values.keywords.map((key) => ({ value: key, label: key }))}
                      name="keywords"
                      id="keywords"
                      isMulti
                      disabled={isLoading}
                      placeholder="Create/Select Keywords"
                      label="* Keywords"
                    />
                  </div>
                  &nbsp;
                  <div className="product-form-field">
                    <CustomCreatableSelect
                      defaultValue={values.sizes.map((key) => ({ value: key, label: key }))}
                      name="sizes"
                      id="sizes"
                      type="string"
                      isMulti
                      disabled={isLoading}
                      placeholder="Create/Select Sizes"
                      label="* Sizes (Millimeter)"
                      options={sizeOptions}
                    />
                  </div>
                </div>
                {/* this becoming sizes !!!! */}
                <div className="product-form-field">
                  <FieldArray
                    name="availableColors"
                    disabled={isLoading}
                    component={CustomColorInput}
                  />
                </div>
                <div className='fieldarray-top' >
                  <h4>Add Sizes - Still Required!!!!</h4>
                  <FieldArray
                    name="tickets"
                    disabled={isLoading}
                    className="fieldarray"
                    render={arrayHelpers => (
                      <div>
                        {values.tickets?.length > 0 &&
                          values.tickets.map((paramList, index) => (
                            <div key={index}>
                              {Object.keys(paramList).map(param => (
                                <Field
                                  key={`${param}`}
                                  name={`tickets.${index}.${param}`}
                                  placeholder={`${index}.${param}`}
                                  className="field"
                                />
                              ))}
                              <button
                                type="button"
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                {" "}
                                -{" "}
                              </button>
                            </div>

                          ))}
                        <button
                          type="button"
                          onClick={() =>
                            arrayHelpers.push({ name: "", email: "" })
                          }
                        >
                          {" "}
                          +{" "}
                        </button>
                      </div>
                    )}
                  />
                </div>
                <div className="product-form-field">
                  <span className="d-block padding-s">Image Collection</span>
                  {!isFileLoading && (
                    <label htmlFor="product-input-file-collection">
                      <input
                        disabled={isLoading}
                        hidden
                        id="product-input-file-collection"
                        multiple
                        onChange={(e) => onFileChange(e, { name: 'imageCollection', type: 'multiple' })}
                        readOnly={isLoading}
                        type="file"
                      />
                      Choose Images
                    </label>
                  )}
                </div>
                <div className="product-form-collection">
                  <>
                    {imageFile.imageCollection.length >= 1 && (
                      imageFile.imageCollection.map((image) => (
                        <div
                          className="product-form-collection-image"
                          key={image.id}
                        >
                          <ImageLoader
                            alt=""
                            src={image.url}
                          />
                          <button
                            className="product-form-delete-image"
                            onClick={() => removeImage({ id: image.id, name: 'imageCollection' })}
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
                <div className='product-form-box' style={{display:"flex", alignItems:"center", gap:"50px", margin:"", marginBottom:"20px", justifyContent:"center"}}>

                  {/* ----THUBMNAIL ---- */}
                  <div className="product-form-file">
                    <div className="product-form-field">
                      <span className="d-block padding-s">* Thumbnail</span>
                      {!isFileLoading && (
                        <label htmlFor="product-input-file">
                          <input
                            disabled={isLoading}
                            hidden
                            id="product-input-file"
                            onChange={(e) => onFileChange(e, { name: 'image', type: 'single' })}
                            readOnly={isLoading}
                            type="file"
                          />
                          Choose Image
                        </label>
                      )}
                    </div>
                    <div className="product-form-image-wrapper">
                      {(imageFile.image.url || product.image) && (
                        <ImageLoader
                          alt=""
                          className="product-form-image-preview"
                          src={imageFile.image.url || product.image}
                        />
                      )}
                    </div>
                  </div>
                  <div className="product-form-field product-form-submit">
                    <button
                      className="button"
                      disabled={isLoading}
                      type="submit"
                    >
                      {isLoading ? <LoadingOutlined /> : <CheckOutlined />}
                      &nbsp;
                      {isLoading ? 'Saving Product' : 'Save Product'}
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

ProductForm.propTypes = {
  product: PropType.shape({
    name: PropType.string,
    brand: PropType.string,
    price: PropType.number,
    sizes_new: PropType.object,
    prices_new: PropType.object,
    maxQuantity: PropType.number,
    description: PropType.string,
    keywords: PropType.arrayOf(PropType.string),
    imageCollection: PropType.arrayOf(PropType.object),
    sizes: PropType.arrayOf(PropType.string),
    image: PropType.string,
    imageUrl: PropType.string,
    isFeatured: PropType.bool,
    isRecommended: PropType.bool,
    availableColors: PropType.arrayOf(PropType.string)
  }).isRequired,
  onSubmit: PropType.func.isRequired,
  isLoading: PropType.bool.isRequired
};

export default ProductForm;