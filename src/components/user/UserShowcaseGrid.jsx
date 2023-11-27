/* eslint-disable react/forbid-prop-types */
import { FeaturedUser } from 'components/user';
import PropType from 'prop-types';
import React from 'react';

const UserShowcase = ({ users, skeletonCount }) => (
  <div className="product-display-grid">
    {(users.length === 0) ? new Array(skeletonCount).fill({}).map((user, index) => (
      <FeaturedUser
        // eslint-disable-next-line react/no-array-index-key
        key={`product-skeleton ${index}`}
        user={user}
      />
    )) : users.map((user) => (
      <FeaturedUser
        key={user.id}
        user={user}
      />
    ))}
  </div>
);

UserShowcase.defaultProps = {
  skeletonCount: 4
};

UserShowcase.propTypes = {
  users: PropType.array.isRequired,
  skeletonCount: PropType.number
};

export default UserShowcase;