import { ImageLoader } from 'components/common';
import { EDIT_USER } from 'constants/routes';
import { displayActionMessage, displayDate, displayMoney } from 'helpers/utils';
import PropType from 'prop-types';
import React, { useRef } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useDispatch } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import { removeUser } from 'redux/actions/userActions';
import { useSelector } from 'react-redux';

const UserItem = ({ user }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userRef = useRef(null);

  const onClickEdit = () => {
    history.push(`${EDIT_USER}/${user.id}`);
  };

  const onDeleteUser = () => {
    userRef.current.classList.toggle('item-active');
  };

  const onConfirmDelete = () => {
    dispatch(removeUser(user.id));
    displayActionMessage('Item successfully deleted');
    userRef.current.classList.remove('item-active');
  };

  const onCancelDelete = () => {
    userRef.current.classList.remove('item-active');
  };

  return (
    <SkeletonTheme
      color="#e1e1e1"
      highlightColor="#f2f2f2"
      duration={4}
    >
      <div
        className={`item item ${!user.id && 'item-loading'}`}
        ref={userRef}
      >
        <div className="grid grid-count-8">
          <div className="grid-col item-img-wrapper">
            {user.avatar ? (
              <ImageLoader
                alt={user.name}
                className="item-img"
                src={user.avatar}
              />
            ) : <Skeleton width={50} height={30} />}
          </div>
          <div className="grid-col">
            <span className="text-overflow-ellipsis">Name:</span>
            <span className="text-overflow-ellipsis">{user.fullname || <Skeleton width={50} />}</span>
          </div>
          {/* <div className="grid-col">
            <span>{user.role || <Skeleton width={50} />}</span>
          </div> */}

          <div className="grid-col">
            <span className="text-overflow-ellipsis">Email:</span>
            <span className="text-overflow-ellipsis">{user.email.slice(0, 10) || <Skeleton width={50} />}</span>
          </div>

          {/* <div className="grid-col">
            <span className="text-overflow-ellipsis">{user.id || <Skeleton width={50} />}</span>
          </div> */}

          {/* <div className="grid-col">
            {user.mobile ? (
              <h5>{user.mobile.value}</h5>
            ) : (
              <h5 className="text-subtle text-italic">Mobile not set</h5>
            )}
          </div> */}

          <div className="grid-col">
            <span className="text-overflow-ellipsis">Date:</span>
            <span>
              {user.dateJoined ? displayDate(user.dateJoined) : <Skeleton width={30} />}
            </span>
          </div>

        </div>
        {user.id && (
          <div className="item-action-user">
            <button
              className="button button-border button-small"
              onClick={onClickEdit}
              type="button"
            >
              Edit User
            </button>
            &nbsp;
            <button
              className="button button-border button-small button-danger"
              onClick={onDeleteUser}
              type="button"
            >
              Delete User
            </button>
            <div className="item-action-confirm">
              <h5>Are you sure you want to delete this?</h5>
              <button
                className="button button-small button-border"
                onClick={onCancelDelete}
                type="button"
              >
                No
              </button>
              &nbsp;
              <button
                className="button button-small button-danger"
                onClick={onConfirmDelete}
                type="button"
              >
                Yes
              </button>
            </div>
          </div>
        )}
      </div>
    </SkeletonTheme>
  );
};

UserItem.propTypes = {
  user: PropType.shape({
    id: PropType.string,
    fullname: PropType.string,
    role: PropType.string,
    email: PropType.string,
    address: PropType.string,
    mobile: PropType.number,
    // price: PropType.number,
    // maxQuantity: PropType.number,
    description: PropType.string,
    keywords: PropType.arrayOf(PropType.string),
    imageCollection: PropType.arrayOf(PropType.object),
    sizes: PropType.arrayOf(PropType.string),
    image: PropType.string,
    imageUrl: PropType.string,
    isFeatured: PropType.bool,
    isRecommended: PropType.bool,
    dateJoined: PropType.number,
    availableColors: PropType.arrayOf(PropType.string)
  }).isRequired
};

export default withRouter(UserItem);