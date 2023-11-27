import { LoadingOutlined } from '@ant-design/icons';
import { useDocumentTitle, useOrder, useScrollTop } from 'hooks';
import PropType from 'prop-types';
import React, { lazy, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { editOrder } from 'redux/actions/orderActions';

const OrderForm = lazy(() => import('../components_order/OrderForm'));

const EditOrder = ({ match }) => {
  useDocumentTitle('Order Summary | Shirts Sale!');
  useScrollTop();
  const { order, error, isLoading } = useOrder(match.params.id);
  const dispatch = useDispatch();

  const onSubmitForm = (updates) => {
    dispatch(editOrder(order.id, updates));
  };

  return (
    <div className="product-form-container">
      {error && <Redirect to="/dashboard/orders" />}
      {order && (
        <Suspense fallback={(
          <div className="loader" style={{ minHeight: '80vh' }}>
            <h6>Loading ... </h6>
            <br />
            <LoadingOutlined />
          </div>
        )}
        >
          <OrderForm
            isLoading={isLoading}
            onSubmit={onSubmitForm}
            order={order}
          />
        </Suspense>
      )}
    </div>
  );
};

EditOrder.propTypes = {
  match: PropType.shape({
    params: PropType.shape({
      id: PropType.string
    })
  }).isRequired
};

export default withRouter(EditOrder);