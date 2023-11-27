import { LoadingOutlined } from '@ant-design/icons';
import { useDocumentTitle, useScrollTop } from 'hooks';
import React, { lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addUser } from 'redux/actions/userActions';

const UserForm = lazy(() => import('../components_user/UserForm'));

const AddUser = () => {
  useScrollTop();
  useDocumentTitle('Add New User2 | Shirts Sale!');
  const isLoading = useSelector((state) => state.app.loading);
  const dispatch = useDispatch();

  const onSubmit = (user) => {
    dispatch(addUser(user));
  };

  return (
    <div className="product-form-container">
      <h2>Add New User</h2>
      <Suspense fallback={(
        <div className="loader" style={{ minHeight: '80vh' }}>
          <h6>Loading ... </h6>
          <br />
          <LoadingOutlined />
        </div>
      )}
      >
        <UserForm
          isLoading={isLoading}
          onSubmit={onSubmit}
          user={{
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

export default withRouter(AddUser);
