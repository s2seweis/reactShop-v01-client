/* eslint-disable react/forbid-prop-types */
import PropType from 'prop-types';
import React from 'react';
import { PostItem } from '.';

const PostsTable = ({ filteredPosts }) => (
  <div>
    {filteredPosts.length === 0 ? new Array(10).fill({}).map((post, index) => (
      <PostItem
        key={`product-skeleton ${index}`}
        post={post}
      />
    )) : filteredPosts.map((post) => (
      <PostItem
        key={post.id}
        post={post}
      />
    ))}
  </div>
);

PostsTable.propTypes = {
  filteredPosts: PropType.array.isRequired
};

export default PostsTable;