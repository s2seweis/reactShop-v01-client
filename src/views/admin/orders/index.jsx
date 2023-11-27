/* eslint-disable react/jsx-props-no-spreading */
import { Boundary } from 'components/common';
import { OrderAppliedFilters, OrderList } from 'components/order';
import { useDocumentTitle, useScrollTop } from 'hooks';
import React from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { selectFilter } from 'selectors/selector_order';
import { OrdersNavbar } from '../components_order';
import OrdersTable from '../components_order/OrdersTable';

const Orders = () => {
  useDocumentTitle('Order List | Shirts Sale! Admin');
  useScrollTop();

  const store = useSelector((state) => ({
    filteredOrders: selectFilter(state.orders.items, state.filter),
    requestStatus: state.app.requestStatus,
    isLoading: state.app.loading,
    orders: state.orders
  }));

  return (
    <Boundary>
      <OrdersNavbar
        ordersCount={store.orders.items.length}
        totalOrdersCount={store.orders.total}
      />
      <div className="order-admin-items">
        <OrderList {...store}>
          <OrderAppliedFilters filter={store.filter} />
          
          <OrdersTable filteredOrders={store.filteredOrders} />
        </OrderList>
      </div>
    </Boundary>
  );
};

export default withRouter(Orders);