import { CloseOutlined } from '@ant-design/icons';
import { OrderItemControl } from 'components/basket';
import { ImageLoader } from 'components/common';
import { displayMoney } from 'helpers/utils';
import PropType from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromBasket } from 'redux/actions/basketActions';

const OrderItem = ({ product }) => {
  const dispatch = useDispatch();
  const onRemoveFromBasket = () => dispatch(removeFromBasket(product.id));

  return (
    <div className="order-item-list">
      <div className="order-item-wrapper">
        <div>
          <h5 className="my-0-orderitem">{product.name}</h5>
        </div>
        <div className="basket-item-details">
          <div className="basket-item-specs">
            <div>
              <span className="spec-title">Quantity</span>
              <h5 className="my-0">{product.quantity}</h5>
            </div>
            <div>
              <span className="spec-title">Size</span>
              <h5 className="my-0">
                {product.selectedSize}
                {' '}
                mm
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
            <div>
              <span className="spec-title">Price</span>
              <h5 className="my-0">
                {product.price}
                {' '}
                $
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

OrderItem.propTypes = {
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
    selectedColor: PropType.string,
    imageCollection: PropType.arrayOf(PropType.string),
    sizes: PropType.arrayOf(PropType.number),
    image: PropType.string,
    imageUrl: PropType.string,
    isFeatured: PropType.bool,
    isRecommended: PropType.bool,
    availableColors: PropType.arrayOf(PropType.string)
  }).isRequired
};

export default OrderItem;