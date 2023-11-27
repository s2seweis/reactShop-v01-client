import { useBasket } from 'hooks';
import PropType from 'prop-types';
import React from 'react';
import SettingItem from './SettingItem';

const SettingGrid = ({ settings }) => {
  const { addToBasket, isItemOnBasket } = useBasket();

  return (
    <div className="product-grid">
      {settings.length === 0 ? new Array(12).fill({}).map((setting, index) => (
        <SettingItem
          // eslint-disable-next-line react/no-array-index-key
          key={`product-skeleton ${index}`}
          setting={setting}
        />
      )) : settings.map((setting) => (
        <SettingItem
          key={setting.id}
          isItemOnBasket={isItemOnBasket}
          addToBasket={addToBasket}
          setting={setting}
        />
      ))}
    </div>
  );
};

SettingGrid.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  settings: PropType.array.isRequired
};

export default SettingGrid;
