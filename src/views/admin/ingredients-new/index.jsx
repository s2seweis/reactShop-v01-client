/* eslint-disable react/jsx-props-no-spreading */
import { Boundary } from 'components/common';
import { IngredientAppliedFilters, IngredientList } from 'components/ingredients';
import { useDocumentTitle, useScrollTop } from 'hooks';
import React from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { selectFilter } from 'selectors/selector_setting';
import { IngredientsNavbar } from '../component_ingredient';
import IngredientsTable from '../component_ingredient/IngredientTable';

const Ingredients = () => {
  useDocumentTitle('Ingredients | Shirts Sale! Admin');
  useScrollTop();

  const store = useSelector((state) => ({
    filteredIngredients: selectFilter(state.ingredients.items, state.filter),
    requestStatus: state.app.requestStatus,
    isLoading: state.app.loading,
    ingredients: state.ingredients
  }));

  return (
    <Boundary>
      {/* <SettingsNavbar
        settingsCount={store.settings.items.length}
        totalSettingsCount={store.settings.total}
      /> */}
      <div className="product-admin-items">
        <IngredientList {...store}>
          {/* <IngredientAppliedFilters filter={store.filter} /> */}
          <IngredientsTable filteredIngredients={store.filteredIngredients} />
        </IngredientList>
      </div>
    </Boundary>
  );
};

export default withRouter(Ingredients);