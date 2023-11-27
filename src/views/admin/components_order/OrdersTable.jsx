/* eslint-disable react/forbid-prop-types */
import PropType from 'prop-types';
import React from 'react';
import { OrderItem } from '.';

const OrdersTable = ({ filteredOrders }) => (

  <div className="user-tab-new">

    <div>
      {filteredOrders.length > 0 && (
        <div className="grid grid-count-4-table">
          <div className="grid-col">
            <h5>Date</h5>
          </div>
          <div className="grid-col">
            <h5>Address</h5>
          </div>
          <div className="grid-col">
            <h5>ID</h5>
          </div>
          <div className="grid-col">
            <h5>Total</h5>
          </div>
        </div>
      )}
      {filteredOrders.length === 0 ? new Array(10).fill({}).map((order, index) => (
        <OrderItem
          // eslint-disable-next-line react/no-array-index-key
          key={`product-skeleton ${index}`}
          order={order}
        />
      )) : filteredOrders.map((order) => (
        <OrderItem
          key={order.id}
          order={order}
        />
      ))}
    </div>
   </div>
);

OrdersTable.propTypes = {
  filteredOrders: PropType.array.isRequired
};

export default OrdersTable;