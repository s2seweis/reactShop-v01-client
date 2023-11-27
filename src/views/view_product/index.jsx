import { ArrowLeftOutlined, ConsoleSqlOutlined, LoadingOutlined } from '@ant-design/icons';
import { ColorChooser, ImageLoader, MessageDisplay } from 'components/common';
import { ProductShowcaseGrid } from 'components/product';
import { RECOMMENDED_PRODUCTS, SHOP } from 'constants/routes';
import { displayMoney } from 'helpers/utils';
import {
  useBasket,
  useDocumentTitle,
  useProduct,
  useRecommendedProducts,
  useScrollTop
} from 'hooks';
import React, { useEffect, useRef, useState, FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import Select from 'react-select';
import FormikFieldArrayForm from 'components/common/FormikFieldArrayForm';
import * as Yup from 'yup';
import ReactDOM from "react-dom";
import { Formik, Field, Form, FieldArray, ErrorMessage } from "formik";
// Ingredients Child Component
import Ingredients1 from "../../components/common/ingredients/Ingredients1"
import Ingredients2 from "../../components/common/ingredients/ingredients2"
import Ingredients3 from "../../components/common/ingredients/ingredients3"
import Ingredients4 from "../../components/common/ingredients/ingredients4"
import { useDispatch, useSelector } from 'react-redux';

const ViewProduct = () => {

  useScrollTop();
  useDocumentTitle(`View ${product?.name || 'Item'}`);
  const { id } = useParams();
  const { product, isLoading, error } = useProduct(id);
  const { addToBasket, isItemOnBasket } = useBasket(id);
  const [selectedImage, setSelectedImage] = useState(product?.image || '');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedSizeNew, setSelectedSizeNew] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const { ingredients } = useSelector((state) => ({
    ingredients: state.ingredients,
  }));

  const {
    recommendedProducts,
    fetchRecommendedProducts,
    isLoading: isLoadingFeatured,
    error: errorFeatured
  } = useRecommendedProducts(6);

  const colorOverlay = useRef(null);

  useEffect(() => {
    setSelectedImage(product?.image);
  }, [product]);

  const onSelectedSizeChange = (newValue) => {
    setSelectedSize(newValue.value);
  };

  const handleChange2 = (event) => {
    setOption(event.value)
    setOption1(event.label)
  }

  const [dropValue, setDropValue] = useState();
  const [option, setOption] = useState();
  const [option1, setOption1] = useState();

  const onSelectedColorChange = (color) => {
    setSelectedColor(color);
    if (colorOverlay.current) {
      colorOverlay.current.value = color;
    }
  };


  const handleAddToBasket = () => {
    addToBasket({
      ...product,
      selectedColor,
      selectedSize: selectedSize || product.new[0],
      selectedPrice: option,
      selectedSizeNew: option1,
    });
  };

  const tickets = product?.tickets.map(({ email, name, key, value, id, number, number1 }) => ({ [email]: name, [name]: email, ["number"]: number }))
    || []
    ;

  const [isFooVisible, setIsFooVisible] = useState(false);
  const [isBarVisible, setIsBarVisible] = useState(false);

  const handleFooPress = () => {
    setIsFooVisible((isVisible) => !isVisible);
    setIsBarVisible(false);
  };

  const handleBarPress = () => {
    setIsBarVisible((isVisible) => !isVisible);
    setIsFooVisible(false);
  };

  return (
    <main className="content">
      {isLoading && (
        <div className="loader">
          <h4>Loading Product...</h4>
          <br />
          <LoadingOutlined style={{ fontSize: '3rem' }} />
        </div>
      )}
      {error && (
        <MessageDisplay message={error} />
      )}
      {(product && !isLoading) && (
        <div className="product-view">
          <Link to={SHOP}>
            <h3 className="button-link d-inline-flex">
              <ArrowLeftOutlined />
              &nbsp; Back to shop
            </h3>
          </Link>
          <div className="product-modal">
            {product.imageCollection.length !== 0 && (
              <div className="product-modal-image-collection">
                {product.imageCollection.map((image) => (
                  <div
                    className="product-modal-image-collection-wrapper"
                    key={image.id}
                    onClick={() => setSelectedImage(image.url)}
                    role="presentation"
                  >
                    <ImageLoader
                      className="product-modal-image-collection-img"
                      src={image.url}
                    />
                  </div>
                ))}
              </div>
            )}
            <div className="product-modal-image-wrapper">
              {selectedColor && <input type="color" disabled ref={colorOverlay} id="color-overlay" />}
              <ImageLoader
                alt={product.name}
                className="product-modal-image"
                src={selectedImage}
              />
            </div>
            <div className="product-modal-details">
              <br />
              <span className="text-subtle">{product.brand}</span>
              <h1 className="margin-top-0">{product.name}</h1>
              <span>{product.description}</span>
              <br />
              <br />
              <div className="divider" />
              <br />
              <div>
                <span className="text-subtle">Lens Width and Frame Size</span>
                <br />
                <br />
                <Select
                  placeholder="--Select Size--1"
                  onChange={onSelectedSizeChange}
                  options={product.sizes.map((size) => ({ label: `${size} mm`, value: size }))}
                  styles={{ menu: (provided) => ({ ...provided, zIndex: 10 }) }}
                />
              </div>
              <br />
              {product.availableColors.length >= 1 && (
                <div>
                  <span className="text-subtle">Choose Color</span>
                  <br />
                  <br />
                  <ColorChooser
                    availableColors={product.availableColors}
                    onSelectedColorChange={onSelectedColorChange}
                  />
                </div>
              )}
              <div className='product-vari'>
                <span style={{textAlign:"left"}} className="text-subtle">Choose Size (build for add ingredients)</span>
                <br />
                <br />
                <Select
                  // placeholder="--Select Size--11"
                  onChange={handleChange2}
                  id="fruit-select"
                  // options={tickets}
                  options={product.tickets.map((size) => ({ label: `${size.name} `, value: size.email, number: size.number }))}

                />

              </div>
              
              <div> {option1?.trim() === "small" ?
                <Ingredients1
                  option={option}
                  option1={option1}
                  selectedSize={selectedSize}
                  selectedColor={selectedColor}
                  product={product}
                  id={id}
                  addToBasket={addToBasket}
                  isItemOnBasket={isItemOnBasket}
                /> : ""
              } </div>
              <div> {option1?.trim() === "medium" ?
                <Ingredients2
                  option={option}
                  option1={option1}
                  selectedSize={selectedSize}
                  selectedColor={selectedColor}
                  product={product}
                  id={id}
                  addToBasket={addToBasket}
                  isItemOnBasket={isItemOnBasket}
                /> : ""} </div>
              <div> {option1?.trim() === "large" ?
                <Ingredients3
                  option={option}
                  option1={option1}
                  selectedSize={selectedSize}
                  selectedColor={selectedColor}
                  product={product}
                  id={id}
                  addToBasket={addToBasket}
                  isItemOnBasket={isItemOnBasket}
                /> : ""} </div>
              <div> {option1?.trim() === "extra large" ?
                <Ingredients4
                  option={option}
                  option1={option1}
                  selectedSize={selectedSize}
                  selectedColor={selectedColor}
                  product={product}
                  id={id}
                  addToBasket={addToBasket}
                  isItemOnBasket={isItemOnBasket}
                /> : ""} </div>
            </div>
          </div>
          <div style={{ marginTop: '10rem' }}>
            <div className="display-header">
              <h1>Recommended</h1>
              <Link to={RECOMMENDED_PRODUCTS}>See All</Link>
            </div>
            {errorFeatured && !isLoadingFeatured ? (
              <MessageDisplay
                message={error}
                action={fetchRecommendedProducts}
                buttonLabel="Try Again"
              />
            ) : (
              <ProductShowcaseGrid products={recommendedProducts} skeletonCount={3} />
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default ViewProduct;