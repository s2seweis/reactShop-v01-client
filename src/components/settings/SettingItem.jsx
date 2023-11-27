import { CheckOutlined } from '@ant-design/icons';
import { ImageLoader } from 'components/common';
import { displayMoney } from 'helpers/utils';
import PropType from 'prop-types';
import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useHistory } from 'react-router-dom';

const SettingItem = ({ setting, isItemOnBasket, addToBasket }) => {
  const history = useHistory();

  const onClickItem = () => {
    if (!setting) return;

    if (setting.id) {
      history.push(`/setting/${setting.id}`);
    }
  };

  const itemOnBasket = isItemOnBasket ? isItemOnBasket(setting.id) : false;

  const handleAddToBasket = () => {
    if (addToBasket) addToBasket({ ...setting, selectedSize: setting.sizes[0] });
  };

  return (
    <SkeletonTheme color="#e1e1e1" highlightColor="#f2f2f2">
      <div
        className={`product-card ${!setting.id ? 'product-loading' : ''}`}
        style={{
          border: setting && itemOnBasket ? '1px solid #a6a5a5' : '',
          boxShadow: setting && itemOnBasket ? '0 10px 15px rgba(0, 0, 0, .07)' : 'none'
        }}
      >
        {itemOnBasket && <CheckOutlined className="fa fa-check product-card-check" />}
        <div
          className="product-card-content"
          onClick={onClickItem}
          role="presentation"
        >
          <div className="product-card-img-wrapper">
            {setting.image ? (
              <ImageLoader
                alt={setting.name}
                className="product-card-img"
                src={setting.image}
              />
            ) : <Skeleton width="100%" height="90%" />}
          </div>
          <div className="product-details">
            <h5 className="product-card-name text-overflow-ellipsis margin-auto">
              {setting.name || <Skeleton width={80} />}
            </h5>
            <h5 className="product-card-name text-overflow-ellipsis margin-auto">
              {setting.name || <Skeleton width={80} />}
            </h5>
            <p className="product-card-brand">
              {setting.brand || <Skeleton width={60} />}
            </p>
            <h4 className="product-card-price">
              {setting.price ? displayMoney(setting.price) : <Skeleton width={40} />}
            </h4>
          </div>
        </div>
        {setting.id && (
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

SettingItem.defaultProps = {
  isItemOnBasket: undefined,
  addToBasket: undefined
};

SettingItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  setting: PropType.object.isRequired,
  isItemOnBasket: PropType.func,
  addToBasket: PropType.func
};

export default SettingItem;
