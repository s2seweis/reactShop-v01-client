/* eslint-disable react/no-multi-comp */
import { LoadingOutlined } from '@ant-design/icons';
import { useDocumentTitle, useScrollTop } from 'hooks';
import React, { lazy, Suspense } from 'react';
import IngredientTab from '../component_ingredient/components/IngredientTab';
// const IngredientAccountTab = lazy(() => import('../component_ingredient/IngredientTab'));
const EditIngredients = lazy(() => import('../component_ingredient/edit-ingredient'));
const UserWishListTab = lazy(() => import('../component_ingredient/components/IngredientListTab'));
const UserOrdersTab = lazy(() => import('../../account/components/UserOrdersTab'));

const Loader = () => (
  <div className="loader" style={{ minHeight: '80vh' }}>
    <LoadingOutlined />
    <h6>Loading ... </h6>
  </div>
);

const UserAccount = () => {
  useScrollTop();
  useDocumentTitle('My Ingredients | Shirts Sale!');
  return (
    <IngredientTab>
      <div index={0} label="General">
        <Suspense fallback={<Loader />}>
          {/* <IngredientAccountTab /> */}
          <EditIngredients />
        </Suspense>
      </div>
      <div index={2} label="Advanced">
        <Suspense fallback={<Loader />}>
          <UserWishListTab />
        </Suspense>
      </div>
      <div index={1} label="My Orders">
        <Suspense fallback={<Loader />}>
          <UserOrdersTab />
        </Suspense>
      </div>
    </IngredientTab>
  );
};

export default UserAccount;