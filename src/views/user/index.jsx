/* eslint-disable react/jsx-props-no-spreading */
import { UserAppliedFilters, UserGrid, UserList } from 'components/user';
import { useDocumentTitle, useScrollTop } from 'hooks';
import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { selectFilter } from 'selectors/selector';

const User = () => {
  useDocumentTitle('User | Shirts Sale!');
  useScrollTop();

  const store = useSelector((state) => ({
    filteredUsers: selectFilter(state.users.items, state.filter),
    users: state.users,
    requestStatus: state.app.requestStatus,
    isLoading: state.app.loading
  }), shallowEqual);

  return (
    <main className="content">
      <section className="product-list-wrapper">
        <UserAppliedFilters filteredUsersCount={store.filteredUsers.length} />
        <UserList {...store}>
          <UserGrid users={store.filteredUsers} />
        </UserList>
      </section>
    </main>
  );
};

export default User;