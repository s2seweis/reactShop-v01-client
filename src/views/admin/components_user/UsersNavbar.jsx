import { FilterOutlined, PlusOutlined } from '@ant-design/icons';
import { FiltersToggle, SearchBar } from 'components/common';
import { ADD_USER } from 'constants/routes';
import PropType from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';

const UsersNavbar = (props) => {
  const { usersCount, totalUsersCount } = props;
  const history = useHistory();

  return (
    <div className="product-admin-header">
      <h5 className="product-admin-header-title"
       style={{ 
          width: '200px', 
        }}
      
      >
        Users &nbsp;
        (
        {`${usersCount} / ${totalUsersCount}`}
        )
      </h5>
            &nbsp;
      <FiltersToggle>
        <button className="button-muted button-small" type="button">
          <FilterOutlined />
          &nbsp;More Filters
        </button>
      </FiltersToggle>
      <button
        className="button button-small"
        onClick={() => history.push(ADD_USER)}
        type="button"
      >
        <PlusOutlined />
        &nbsp; Add Users
      </button>
    </div>
  );
};

UsersNavbar.propTypes = {
  usersCount: PropType.number.isRequired,
  totalUsersCount: PropType.number.isRequired
};

export default UsersNavbar;