import { CheckOutlined } from '@ant-design/icons';
import { ImageLoader } from 'components/common';
import { displayMoney } from 'helpers/utils';
import PropType from 'prop-types';
import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useHistory } from 'react-router-dom';

const IngredientItem = ({ ingredient, isItemOnBasket, addToBasket }) => {
  const history = useHistory();

  const onClickItem = () => {
    if (!ingredient) return;

    if (ingredient.id) {
      history.push(`/ingredient/${ingredient.id}`);
    }
  };

  const itemOnBasket = isItemOnBasket ? isItemOnBasket(ingredient.id) : false;

  const handleAddToBasket = () => {
    if (addToBasket) addToBasket({ ...ingredient, selectedSize: ingredient.sizes[0] });
  };

  return (
    <SkeletonTheme color="#e1e1e1" highlightColor="#f2f2f2">
      <div
        className={`product-card ${!ingredient.id ? 'product-loading' : ''}`}
        style={{
          border: ingredient && itemOnBasket ? '1px solid #a6a5a5' : '',
          boxShadow: ingredient && itemOnBasket ? '0 10px 15px rgba(0, 0, 0, .07)' : 'none'
        }}
      >
        {itemOnBasket && <CheckOutlined className="fa fa-check product-card-check" />}
        <div
          className="product-card-content"
          onClick={onClickItem}
          role="presentation"
        >
          <div className="product-card-img-wrapper">
            {ingredient.image ? (
              <ImageLoader
                alt={ingredient.name}
                className="product-card-img"
                src={ingredient.image}
              />
            ) : <Skeleton width="100%" height="90%" />}
          </div>
          <div className="product-details">
            <h5 className="product-card-name text-overflow-ellipsis margin-auto">
              {ingredient.name || <Skeleton width={80} />}
            </h5>
            <h5 className="product-card-name text-overflow-ellipsis margin-auto">
              {ingredient.name || <Skeleton width={80} />}
            </h5>
            <p className="product-card-brand">
              {ingredient.brand || <Skeleton width={60} />}
            </p>
            <h4 className="product-card-price">
              {ingredient.price ? displayMoney(ingredient.price) : <Skeleton width={40} />}
            </h4>
          </div>
        </div>
        {ingredient.id && (
          <button
            className={`product-card-button button-small button button-block ${itemOnBasket ? 'button-border button-border-gray' : ''}`}
            onClick={handleAddToBasket}
            type="button"
          >
            {itemOnBasket ? 'Remove from basket' : 'Add to basket1'}
          </button>
        )}

      </div>
    </SkeletonTheme>
  );
};

IngredientItem.defaultProps = {
  isItemOnBasket: undefined,
  addToBasket: undefined
};

IngredientItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  ingredient: PropType.object.isRequired,
  isItemOnBasket: PropType.func,
  addToBasket: PropType.func
};

export default IngredientItem;
