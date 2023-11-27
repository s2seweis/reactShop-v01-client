import { FilterOutlined, PlusOutlined } from '@ant-design/icons';
import { FiltersToggle, SearchBar } from 'components/common';
import { ADD_SETTING } from 'constants/routes';
import PropType from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';

const 
SettingsNavbar = (props) => {
  const { settingsCount, totalSettingsCount } = props;
  const history = useHistory();

  return (
    <div className="product-admin-header">
      <h3 className="product-admin-header-title">
        Settings &nbsp;
      </h3>
    </div>
  );
};

SettingsNavbar.propTypes = {
  settingsCount: PropType.number.isRequired,
  totalSettingsCount: PropType.number.isRequired
};

export default SettingsNavbar;