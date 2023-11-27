/* eslint-disable react/forbid-prop-types */
import { FeaturedSetting } from 'components/settings';
import PropType from 'prop-types';
import React from 'react';

const SettingShowcase = ({ settings, skeletonCount }) => (
  <div className="product-display-grid">
    {(settings.length === 0) ? new Array(skeletonCount).fill({}).map((setting, index) => (
      <FeaturedSetting
        // eslint-disable-next-line react/no-array-index-key
        key={`product-skeleton ${index}`}
        setting={setting}
      />
    )) : settings.map((setting) => (
      <FeaturedSetting
        key={setting.id}
        setting={setting}
      />
    ))}
  </div>
);

SettingShowcase.defaultProps = {
  skeletonCount: 4
};

SettingShowcase.propTypes = {
  settings: PropType.array.isRequired,
  skeletonCount: PropType.number
};

export default SettingShowcase;
