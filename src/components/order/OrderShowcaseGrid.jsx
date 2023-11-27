/* eslint-disable react/forbid-prop-types */
// import { FeaturedOrder } from 'components/order';
import PropType from 'prop-types';
import React from 'react';

const OrderShowcase = ({ orders, skeletonCount }) => (
  <div className="product-display-grid">
    {/* {(orders.length === 0) ? new Array(skeletonCount).fill({}).map((order, index) => (
      <FeaturedOrder
        // eslint-disable-next-line react/no-array-index-key
        key={`product-skeleton ${index}`}
        order={order}
      />
    )) : orders.map((order) => (
      <FeaturedOrder
        key={order.id}
        order={order}
      />
    ))} */}
  </div>
);
OrderShowcase.defaultProps = {
  skeletonCount: 4
};

OrderShowcase.propTypes = {
  orders: PropType.array.isRequired,
  skeletonCount: PropType.number
};

export default OrderShowcase;
