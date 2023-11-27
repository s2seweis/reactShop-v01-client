import { FilterOutlined, PlusOutlined } from '@ant-design/icons';
import { FiltersToggle, SearchBar } from 'components/common';
import { ADD_INGREDIENT } from 'constants/routes';
import PropType from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';

const 
IngredientsNavbar = (props) => {
  const history = useHistory();
  return (
    <div className="product-admin-header">
      <h3 className="product-admin-header-title">
        Ingredients 1 &nbsp;
      </h3>
    </div>
  );
};

IngredientsNavbar.propTypes = {
  // ingredientsCount: PropType.number.isRequired,
  // totalIngredientsCount: PropType.number.isRequired
};

export default IngredientsNavbar;