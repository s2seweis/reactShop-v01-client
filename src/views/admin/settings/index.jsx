/* eslint-disable react/jsx-props-no-spreading */
import { Boundary } from 'components/common';
import { SettingAppliedFilters, SettingList } from 'components/settings';
import { useDocumentTitle, useScrollTop } from 'hooks';
import React from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { selectFilter } from 'selectors/selector_setting';
import { SettingsNavbar } from '../component_setting';
import SettingsTable from '../component_setting/SettingTable';

const Settings = () => {
  useDocumentTitle('Settings | Shirts Sale! Admin');
  useScrollTop();

  const store = useSelector((state) => ({
    filteredSettings: selectFilter(state.settings.items, state.filter),
    requestStatus: state.app.requestStatus,
    isLoading: state.app.loading,
    settings: state.settings
  }));
  console.log("line:3", store);

  return (
    <Boundary>
      <div className="setting-admin-items">
        <SettingList {...store}>
          {/* <SettingAppliedFilters filter={store.filter} /> */}
          <SettingsTable filteredSettings={store.settings} />
        </SettingList>
      </div>
    </Boundary>
  );
};

export default withRouter(Settings);