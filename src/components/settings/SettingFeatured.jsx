import { ImageLoader } from 'components/common';
import PropType from 'prop-types';
import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useHistory } from 'react-router-dom';

const SettingFeatured = ({ setting }) => {
  const history = useHistory();
  const onClickItem = () => {
    if (!setting) return;

    history.push(`/setting/${setting.id}`);
  };

  return (
    <SkeletonTheme color="#e1e1e1" highlightColor="#f2f2f2">
      <div className="product-display" onClick={onClickItem} role="presentation">
        <div className="product-display-img">
          {setting.image ? (
            <ImageLoader
              className="product-card-img"
              src={setting.image}
            />
          ) : <Skeleton width="100%" height="100%" />}
        </div>
        <div className="product-display-details">
          <h2>{setting.name || <Skeleton width={80} />}</h2>
          <p className="text-subtle text-italic">
            {setting.brand || <Skeleton width={40} />}
          </p>
        </div>
      </div>
    </SkeletonTheme>
  );
};

SettingFeatured.propTypes = {
  setting: PropType.shape({
    image: PropType.string,
    name: PropType.string,
    id: PropType.string,
    brand: PropType.string
  }).isRequired
};

export default SettingFeatured;
