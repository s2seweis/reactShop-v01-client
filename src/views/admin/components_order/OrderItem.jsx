import { ImageLoader } from 'components/common';
import { EDIT_ORDER } from 'constants/routes';
import { displayActionMessage, displayDate, displayMoney } from 'helpers/utils';
import PropType from 'prop-types';
import React, { useRef } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useDispatch } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import { removeOrder } from 'redux/actions/orderActions';

const OrderItem = ({ order }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const orderRef = useRef(null);

  const onClickEdit = () => {
    history.push(`${EDIT_ORDER}/${order.id}`);
  };

  const onDeleteOrder = () => {
    orderRef.current.classList.toggle('item-active');
  };

  const onConfirmDelete = () => {
    dispatch(removeOrder(order.id));
    displayActionMessage('Item successfully deleted');
    orderRef.current.classList.remove('item-active');
  };

  const onCancelDelete = () => {
    orderRef.current.classList.remove('item-active');
  };

  return (
    <SkeletonTheme
      color="#5294e0"
      highlightColor="a1633f"
      duration={4}
    >
      <div
        className={`item item-s ${!order.id && 'item-loading'}`}
        ref={orderRef}
      >
        <div className="grid grid-count-orders">
          <div className="grid-col">
              <span className="text-overflow-ellipsis">Date:</span>
            <span>
              {order.dateAdded ? displayDate(order.dateAdded) : <Skeleton width={50} />}
            </span>
          </div>
          <div className="grid-col">
              <span className="text-overflow-ellipsis">Address:</span>
            <span>
              {order.shipping ? (
                <span>{order.shipping.address}</span>
              ) : <Skeleton width={50} />}
            </span>
          </div>
          <div className="grid-col-break">
            <span className="text-overflow-ellipsis">Order ID:</span>
            <span>{order.id || <Skeleton width={50} />}</span>
          </div>
          <div className="grid-col">
            <span className="text-overflow-ellipsis">Sub Total:</span>
            <span className="text-overflow-ellipsis">{order.subtotal || <Skeleton width={50} />}</span>
          </div>
        </div>
        {order.id && (
          <div className="item-action-order">
            <button
              className="button button-border button-small"
              onClick={onClickEdit}
              type="button"
            >
              Invoice
            </button>
            &nbsp;
            <button
              className="button button-border button-small button-danger"
              onClick={onDeleteOrder}
              type="button"
            >
              Print
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

OrderItem.propTypes = {
  order: PropType.shape({
    id: PropType.string,
    subtotal: PropType.number,
    brand: PropType.string,
    basket: PropType.string,
    maxQuantity: PropType.number,
    id: PropType.string,
    keywords: PropType.arrayOf(PropType.string),
    imageCollection: PropType.arrayOf(PropType.object),
    sizes: PropType.arrayOf(PropType.string),
    image: PropType.string,
    imageUrl: PropType.string,
    isFeatured: PropType.bool,
    isRecommended: PropType.bool,
    dateAdded: PropType.number,
    availableColors: PropType.arrayOf(PropType.string)
  }).isRequired
};

export default withRouter(OrderItem);