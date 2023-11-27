import { LoadingOutlined } from '@ant-design/icons';
import { useDocumentTitle, useScrollTop } from 'hooks';
import React, { lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addOrder } from 'redux/actions/orderActions';

const OrderForm = lazy(() => import('../components_order/OrderForm'));

const AddOrder = () => {
  useScrollTop();
  useDocumentTitle('Add New Order | Shirts Sale!');
  const isLoading = useSelector((state) => state.app.loading);
  const dispatch = useDispatch();

  const onSubmit = (order) => {
    dispatch(addOrder(order));
  };

  return (
    <div className="order-form-container">
      <h2>Add New Order1</h2>
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
          onSubmit={onSubmit}
          order={{
            name: '',
            brand: '',
            price: 0,
            maxQuantity: 0,
            description: '',
            keywords: [],
            sizes: [],
            image: '',
            isFeatured: false,
            isRecommended: false,
            availableColors: [],
            imageCollection: []
          }}
        />
      </Suspense>
    </div>
  );
};

export default withRouter(AddOrder);