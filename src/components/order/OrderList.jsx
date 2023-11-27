/* eslint-disable react/forbid-prop-types */
import { Boundary, MessageDisplay } from 'components/common';
import PropType from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLoading } from 'redux/actions/miscActions';
import { getOrders } from 'redux/actions/orderActions';

const OrderList = (props) => {
  const {
    orders, filteredOrders, isLoading, requestStatus, children
  } = props;
  const [isFetching, setFetching] = useState(false);
  const dispatch = useDispatch();

  const fetchOrders = () => {
    setFetching(true);
    dispatch(getOrders(orders.lastRefKey));
  };

  useEffect(() => {
    if (orders.items.length === 0 || !orders.lastRefKey) {
      fetchOrders();
    }

    window.scrollTo(0, 0);
    return () => dispatch(setLoading(false));
  }, []);

  useEffect(() => {
    setFetching(false);
  }, [orders.lastRefKey]);

  if (filteredOrders.length === 0 && !isLoading) {
    return (
      <MessageDisplay message={requestStatus?.message || 'No orders found.'} />
    );
  } if (filteredOrders.length === 0 && requestStatus) {
    return (
      <MessageDisplay
        message={requestStatus?.message || 'Something went wrong :('}
        action={fetchOrders}
        buttonLabel="Try Again"
      />
    );
  }
  return (
    <Boundary>
      {children}
      {/* Show 'Show More' button if products length is less than total products */}
      {orders.items.length < orders.total && (
        <div className="d-flex-center padding-l">
          <button
            className="button button-small"
            disabled={isFetching}
            onClick={fetchOrders}
            type="button"
          >
            {isFetching ? 'Fetching Items...' : 'Show More Items'}
          </button>
        </div>
      )}
    </Boundary>
  );
};

OrderList.defaultProps = {
  requestStatus: null
};

OrderList.propTypes = {
  orders: PropType.object.isRequired,
  filteredOrders: PropType.array.isRequired,
  isLoading: PropType.bool.isRequired,
  requestStatus: PropType.string,
  children: PropType.oneOfType([
    PropType.arrayOf(PropType.node),
    PropType.node
  ]).isRequired
};

export default OrderList;
