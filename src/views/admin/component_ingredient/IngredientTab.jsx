/* eslint-disable indent */
import { ImageLoader } from 'components/common';
import { ADMIN_INGREDIENT_EDIT } from 'constants/routes';
import { displayDate } from 'helpers/utils';
import PropType from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

const IngredientProfile = (props) => {
  // profile = users, in firebase
  const ingredients = useSelector((state) => state.ingredients);
  const profile = useSelector((state) => state.profile);

  return (
    <div className="user-profile">
      <div className="user-profile-block">
        <div className="user-profile-banner">
          <div className="user-profile-banner-wrapper">
            <ImageLoader
              alt="Banner"
              className="user-profile-banner-img"
              src={ingredients.banner}
            />
          </div>
          <div className="user-profile-avatar-wrapper">
            <ImageLoader
              alt="Avatar"
              className="user-profile-img"
              src={ingredients.avatar}
            />
          </div>
          <button
            className="button button-small user-profile-edit"
            onClick={() => props.history.push(ADMIN_INGREDIENT_EDIT)}
            type="button"
          >
            Edit Ingredients
          </button>
        </div>
        <div className="user-profile-details">
          <span>Full Name</span>
          <br />
          <h5>{profile.fullname}</h5>
          <span>Email</span>
          <br />
          <h5>{ingredients.email}</h5>
          <span>Address</span>
          <br />
          {ingredients.address ? (
            <h5>{ingredients.address}</h5>
          ) : (
            <h5 className="text-subtle text-italic">Address not set</h5>
          )}

          <span>Address</span>
          <br />
          {ingredients.role ? (
            <h5>{ingredients.role}</h5>
          ) : (
            <h5 className="text-subtle text-italic">Address not set</h5>
          )}

          {/* map object */}
          <span>Mobile</span>
          <br />
          {ingredients.mobile ? (
            <h5>{ingredients.mobile.value}</h5>
          ) : (
            <h5 className="text-subtle text-italic">Mobile not set</h5>
          )}
          <span>Country</span>
          <br />
          {ingredients.mobile ? (
            <h5>{ingredients.mobile.country}</h5>
          ) : (
            <h5 className="text-subtle text-italic">Mobile not set</h5>
          )}
          <span>Country Code</span>
          <br />
          {ingredients.mobile ? (
            <h5>{ingredients.mobile.countryCode}</h5>
          ) : (
            <h5 className="text-subtle text-italic">Mobile not set</h5>
          )}
        </div>
      </div>
    </div>
  );
};

IngredientProfile.propTypes = {
  history: PropType.shape({
    push: PropType.func
  }).isRequired
};

export default withRouter(IngredientProfile);