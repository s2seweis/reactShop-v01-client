/* eslint-disable indent */
import { ImageLoader } from 'components/common';
import { ADMIN_SETTING_EDIT } from 'constants/routes';
import { displayDate } from 'helpers/utils';
import PropType from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

const SettingProfile = (props) => {
  // profile = users, in firebase
  // const profile = useSelector((state) => state.profile);
  const settings = useSelector((state) => state.settings);

  return (
    <div className="user-profile">
      <div className="user-profile-block">
        <div className="user-profile-banner">
          <div className="user-profile-banner-wrapper">
            <ImageLoader
              alt="Banner"
              className="user-profile-banner-img"
              src={settings.banner}
            />
          </div>
          <div className="user-profile-avatar-wrapper">
            <ImageLoader
              alt="Avatar"
              className="user-profile-img"
              src={settings.avatar}
            />
          </div>
          <button
            className="button button-small user-profile-edit"
            onClick={() => props.history.push(ADMIN_SETTING_EDIT)}
            type="button"
          >
            Edit Settings
          </button>
        </div>
        <div className="user-profile-details">
          <span>Full Name</span>
          <br />
          <h5>{settings.fullname}</h5>
          <span>Email</span>
          <br />
          <h5>{settings.email}</h5>
          <span>Address</span>
          <br />
          {settings.address ? (
            <h5>{settings.address}</h5>
          ) : (
            <h5 className="text-subtle text-italic">Address not set</h5>
          )}
          <span>Address</span>
          <br />
          {settings.role ? (
            <h5>{settings.role}</h5>
          ) : (
            <h5 className="text-subtle text-italic">Address not set</h5>
          )}
          {/* map object */}
          <span>Mobile</span>
          <br />
          {settings.mobile ? (
            <h5>{settings.mobile.value}</h5>
          ) : (
            <h5 className="text-subtle text-italic">Mobile not set</h5>
          )}
          <span>Country</span>
          <br />
          {settings.mobile ? (
            <h5>{settings.mobile.country}</h5>
          ) : (
            <h5 className="text-subtle text-italic">Mobile not set</h5>
          )}
          <span>Country Code</span>
          <br />
          {settings.mobile ? (
            <h5>{settings.mobile.countryCode}</h5>
          ) : (
            <h5 className="text-subtle text-italic">Mobile not set</h5>
          )}
        </div>
      </div>
    </div>
  );
};

SettingProfile.propTypes = {
  history: PropType.shape({
    push: PropType.func
  }).isRequired
};

export default withRouter(SettingProfile);