import { ADMIN_PRODUCTS, ADMIN_ORDERS, ADMIN_POSTS, ADMIN_USERS, ADMIN_SETTINGS, ADMIN_DASHBOARD } from 'constants/routes';
import React from 'react';
import { NavLink } from 'react-router-dom';

const SideNavigation = () => (

  <aside className="sidenavigation">
    <div className="sidenavigation-wrapper">
      <div className="sidenavigation-item">
        <NavLink
          activeClassName="sidenavigation-menu-active"
          className="sidenavigation-menu"
          to={ADMIN_PRODUCTS}
        >
          Products
        </NavLink>
        <NavLink
          activeClassName="sidenavigation-menu-active"
          className="sidenavigation-menu"
          to={ADMIN_ORDERS}
        >
          Orders1
        </NavLink>

        <NavLink
          activeClassName="sidenavigation-menu-active"
          className="sidenavigation-menu"
          to={ADMIN_POSTS}
        >
          Posts
        </NavLink>

        <NavLink
          activeClassName="sidenavigation-menu-active"
          className="sidenavigation-menu"
          to={ADMIN_USERS}
        >
          Users
        </NavLink>

        <NavLink
          activeClassName="sidenavigation-menu-active"
          className="sidenavigation-menu"
          to={ADMIN_SETTINGS}
        >
          Settings
        </NavLink>

      </div>

    </div>
  </aside>
);

export default SideNavigation;
