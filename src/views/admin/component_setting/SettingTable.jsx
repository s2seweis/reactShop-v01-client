/* eslint-disable react/no-multi-comp */
import { LoadingOutlined } from '@ant-design/icons';
import { useDocumentTitle, useScrollTop } from 'hooks';
import React, { lazy, Suspense } from 'react';
import SettingTab from '../../../views/admin/component_setting/components/SettingTab';

// const SettingAccountTab = lazy(() => import('../component_setting/SettingTab'));
const EditSettings = lazy(() => import('../component_setting/edit_setting'));
const UserWishListTab = lazy(() => import('../component_setting/components/SettingListTab'));
const UserOrdersTab = lazy(() => import('../../../views/account/components/UserOrdersTab'));

const Loader = () => (
  <div className="loader" style={{ minHeight: '80vh' }}>
    <LoadingOutlined />
    <h6>Loading ... </h6>
  </div>
);

const UserAccount = () => {
  useScrollTop();
  useDocumentTitle('My Settings | Shirts Sale!');

  return (
    <SettingTab>

      <div index={0} label="General">
        <Suspense fallback={<Loader />}>
          <SettingAccountTab />
          <EditSettings />
        </Suspense>
      </div>
      <div index={2} label="Taxes">
        <Suspense fallback={<Loader />}>
          <UserWishListTab />
        </Suspense>
      </div>
      <div index={1} label="Print">
        <Suspense fallback={<Loader />}>
          <UserOrdersTab />
        </Suspense>
      </div>
    </SettingTab>
  );
};

export default UserAccount;