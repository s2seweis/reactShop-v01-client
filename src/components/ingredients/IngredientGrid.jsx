import { useBasket } from 'hooks';
import PropType from 'prop-types';
import React from 'react';
import IngredientItem from './IngredientItem';

const IngredientGrid = ({ ingredients }) => {
  const { addToBasket, isItemOnBasket } = useBasket();

  return (
    <div className="product-grid">
      {ingredients.length === 0 ? new Array(12).fill({}).map((ingredient, index) => (
        <IngredientItem
          // eslint-disable-next-line react/no-array-index-key
          key={`product-skeleton ${index}`}
          ingredient={ingredient}
        />
      )) : ingredients.map((ingredient) => (
        <IngredientItem
          key={ingredient.id}
          isItemOnBasket={isItemOnBasket}
          addToBasket={addToBasket}
          ingredient={ingredient}
        />
      ))}
    </div>
  );
};

IngredientGrid.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  ingredients: PropType.array.isRequired
};

export default IngredientGrid;
