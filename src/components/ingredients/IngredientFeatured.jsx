import { ImageLoader } from 'components/common';
import PropType from 'prop-types';
import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useHistory } from 'react-router-dom';

const IngredientFeatured = ({ ingredient }) => {
  const history = useHistory();
  const onClickItem = () => {
    if (!ingredient) return;

    history.push(`/ingredient/${ingredient.id}`);
  };

  return (
    <SkeletonTheme color="#e1e1e1" highlightColor="#f2f2f2">
      <div className="product-display" onClick={onClickItem} role="presentation">
        <div className="product-display-img">
          {ingredient.image ? (
            <ImageLoader
              className="product-card-img"
              src={ingredient.image}
            />
          ) : <Skeleton width="100%" height="100%" />}
        </div>
        <div className="product-display-details">
          <h2>{ingredient.name || <Skeleton width={80} />}</h2>
          <p className="text-subtle text-italic">
            {ingredient.brand || <Skeleton width={40} />}
          </p>
        </div>
      </div>
    </SkeletonTheme>
  );
};

IngredientFeatured.propTypes = {
  ingredient: PropType.shape({
    image: PropType.string,
    name: PropType.string,
    id: PropType.string,
    brand: PropType.string
  }).isRequired
};

export default IngredientFeatured;
