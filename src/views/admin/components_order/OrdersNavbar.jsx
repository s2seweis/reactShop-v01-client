import { FilterOutlined, PlusOutlined } from '@ant-design/icons';
import { FiltersToogleOrder, SearchBar } from 'components/common';
import { ADD_ORDER } from 'constants/routes';
import PropType from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';

const OrdersNavbar = (props) => {
  const { ordersCount, totalOrdersCount } = props;
  const history = useHistory();

  return (
    <div className="product-admin-header">
      <h5 className="product-admin-header-title">
        Orders &nbsp;
        (
        {`${ordersCount} / ${totalOrdersCount}`}
        )
      </h5>
      <SearchBar />
            &nbsp;
    </div>
  );
};

OrdersNavbar.propTypes = {
  ordersCount: PropType.number.isRequired,
  totalOrdersCount: PropType.number.isRequired
};

export default OrdersNavbar;