/* eslint-disable react/forbid-prop-types */
import PropType from 'prop-types';
import React from 'react';
import { UserItem } from '.';

const UsersTable = ({ filteredUsers }) => (
  <div>
    {filteredUsers.length > 0 && (
      <div className="grid">
      </div>
    )}
    {filteredUsers.length === 0 ? new Array(10).fill({}).map((user, index) => (
      <UserItem
        // eslint-disable-next-line react/no-array-index-key
        key={`product-skeleton ${index}`}
        user={user}
      />
    )) : filteredUsers.map((user) => (
      <UserItem
        key={user.id}
        user={user}
      />
    ))}
  </div>
);

UsersTable.propTypes = {
  filteredUsers: PropType.array.isRequired
};

export default UsersTable;