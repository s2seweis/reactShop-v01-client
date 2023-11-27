/* eslint-disable react/jsx-props-no-spreading */
import { Boundary } from 'components/common';
import { UserAppliedFilters, UserList } from 'components/user';
import { useDocumentTitle, useScrollTop } from 'hooks';
import React from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { selectFilter } from 'selectors/selector_user';
import { UsersNavbar } from '../components_user';
import UsersTable from '../components_user/UsersTable';

const User = () => {
  useDocumentTitle('User List | Shirts Sale! Admin');
  useScrollTop();

  const store = useSelector((state) => ({
    filteredUsers: selectFilter(state.users.items, state.filter),
    requestStatus: state.app.requestStatus,
    isLoading: state.app.loading,
    users: state.users
  }));

  return (
    <Boundary>
      <UsersNavbar
        usersCount={store.users.items.length}
        totalUsersCount={store.users.total}
      />
      <div className="product-admin-items">
        <UserList {...store}>
          <UserAppliedFilters filter={store.filter} />
          <UsersTable filteredUsers={store.filteredUsers} />
        </UserList>
      </div>
    </Boundary>
  );
};

export default withRouter(User);