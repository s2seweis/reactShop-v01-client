/* eslint-disable react/forbid-prop-types */
import { FeaturedIngredient } from 'components/ingredients';
import PropType from 'prop-types';
import React from 'react';

const IngredientShowcase = ({ ingredients, skeletonCount }) => (
  <div className="product-display-grid">
    {(ingredients.length === 0) ? new Array(skeletonCount).fill({}).map((ingredient, index) => (
      <FeaturedIngredient
        // eslint-disable-next-line react/no-array-index-key
        key={`product-skeleton ${index}`}
        ingredient={ingredient}
      />
    )) : ingredients.map((ingredient) => (
      <FeaturedIngredient
        key={ingredient.id}
        ingredient={ingredient}
      />
    ))}
  </div>
);

IngredientShowcase.defaultProps = {
  skeletonCount: 4
};

IngredientShowcase.propTypes = {
  ingredients: PropType.array.isRequired,
  skeletonCount: PropType.number
};

export default IngredientShowcase;
