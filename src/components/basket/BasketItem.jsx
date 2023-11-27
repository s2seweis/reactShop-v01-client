import { CloseOutlined } from '@ant-design/icons';
import { BasketItemControl } from 'components/basket';
import { ImageLoader } from 'components/common';
import { displayMoney } from 'helpers/utils';
import PropType from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromBasket } from 'redux/actions/basketActions';

const BasketItem = ({ product }) => {
  const dispatch = useDispatch();
  const onRemoveFromBasket = () => dispatch(removeFromBasket(product.id));

  return (

    <div>
      <div className="basket-item">
        <BasketItemControl product={product} />
        <div className="basket-item-wrapper">

          <div className="basket-item-img-wrapper">
            <ImageLoader
              alt={product.name}
              className="basket-item-img"
              src={product.image}
            />
          </div>

          <div className="basket-item-details">
            <Link to={`/product/${product.id}`} onClick={() => document.body.classList.remove('is-basket-open')}>
              <h3 className="underline basket-item-name">
                {product.name}
              </h3>
            </Link>

            <div className="basket-item-specs">
              <div>
                <span className="spec-title">Quantity</span>
                <h5 className="my-0">{product.quantity}</h5>
              </div>
              <div>
                <span className="spec-title">Size</span>

                <h5 className="my-0">
                  {product.selectedSizeNew}
                  {' '}

                </h5>
              </div>

              <div>
                <span className="spec-title">Color</span>
                <div style={{
                  backgroundColor: product.selectedColor || product.availableColors[0],
                  width: '15px',
                  height: '15px',
                  borderRadius: '50%'
                }}
                />
              </div>
            </div>
          </div>

          <div className="basket-item-price">
            <h4 className="my-0">{displayMoney(product.selectedPriceTotal2 * product.quantity)}</h4>

          </div>

          <button
            className="basket-item-remove button button-border button-border-gray button-small-basket"
            onClick={onRemoveFromBasket}
            type="button"
          >
            <CloseOutlined />
          </button>
        </div>

      </div>

      <div className="basket-item-toppings">
        <h4 >
          Extra Toppings:
          {product.toppings}
        </h4>
      </div>

    </div>
  );
};

BasketItem.propTypes = {
  product: PropType.shape({
    id: PropType.string,
    name: PropType.string,
    brand: PropType.string,
    price: PropType.number,
    quantity: PropType.number,
    maxQuantity: PropType.number,
    description: PropType.string,
    keywords: PropType.arrayOf(PropType.string),
    selectedSize: PropType.string,
    selectedPrice: PropType.string,
    selectedSizeNew: PropType.string,
    selectedColor: PropType.string,
    // imageCollection: PropType.arrayOf(PropType.string),
    imageCollection: PropType.arrayOf(PropType.object),
    // sizes: PropType.arrayOf(PropType.number),
    sizes: PropType.arrayOf(PropType.string),
    image: PropType.string,
    imageUrl: PropType.string,
    isFeatured: PropType.bool,
    isRecommended: PropType.bool,
    availableColors: PropType.arrayOf(PropType.string)
  }).isRequired
};

export default BasketItem;