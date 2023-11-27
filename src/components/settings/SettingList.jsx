/* eslint-disable react/forbid-prop-types */
import { Boundary, MessageDisplay } from 'components/common';
import PropType from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLoading } from 'redux/actions/miscActions';
import { getSetting } from 'redux/actions/settingActions';
import './SettingsList.scss';

const SettingList = (props) => {
  const {
   settings, filteredSettings, isLoading, requestStatus, children
  } = props;
  console.log("line:300", props.settings);
  const [isFetching, setFetching] = useState(false);
  const dispatch = useDispatch();

  const fetchSettings = () => {
    setFetching(true);
    dispatch(getSetting(settings));
  };

  // useEffect(() => {
  //   if (settings === 0 || !settings.lastRefKey) {
  //     fetchSettings();
  //   }

  //   window.scrollTo(0, 0);
  //   return () => dispatch(setLoading(false));
  // }, []);

  // useEffect(() => {
  //   setFetching(false);
  // }, [settings.lastRefKey]);

  const initialSettings = {
    address: props.settings.address,
    avatar: props.settings.avatar,
    banner: props.settings.banner,
    email: props.settings.email,
    fullname: props.settings.fullname
  };

  const [settingsNew, setSettingsNew] = useState(initialSettings);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettingsNew(prevSettings => ({
      ...prevSettings,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic here to handle form submission, e.g., update settingsNew on the server.
    console.log("Form submitted with settingsNew:", settingsNew);
  };

  return (
    // <Boundary>
    //   {children}
    // </Boundary>
    <div>
      <div style={{height: '100vh' }}>
      <form className='form-setting' onSubmit={handleSubmit} style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', padding: '20px', width: '300px' }}>
        <label htmlFor="address">Address:</label>
        <input type="text" id="address" name="address" value={settingsNew.address} onChange={handleChange} />

        <label htmlFor="avatar">Avatar URL:</label>
        <input type="text" id="avatar" name="avatar" value={settingsNew.avatar} onChange={handleChange} />

        <label htmlFor="banner">Banner URL:</label>
        <input type="text" id="banner" name="banner" value={settingsNew.banner} onChange={handleChange} />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={settingsNew.email} onChange={handleChange} />

        <label htmlFor="fullname">Full Name:</label>
        <input type="text" id="fullname" name="fullname" value={settingsNew.fullname} onChange={handleChange} />

        <button type="submit" style={{ backgroundColor: '#4caf50', color: 'white', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Save Changes
        </button>
      </form>
    </div>
    </div>
  );
};

SettingList.defaultProps = {
  requestStatus: null
};

SettingList.propTypes = {
  settings: PropType.object.isRequired,
  filteredSettings: PropType.array.isRequired,
  isLoading: PropType.bool.isRequired,
  requestStatus: PropType.string,
  children: PropType.oneOfType([
    PropType.arrayOf(PropType.node),
    PropType.node
  ]).isRequired
};

export default SettingList;
