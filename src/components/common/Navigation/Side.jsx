import React, { useState } from 'react';
import { Icon } from '../Icon';
import '../../../styles/side/index.css'
import { Sidebar, Menu, MenuItem, useProSidebar, collapseSidebar, SubMenu } from 'react-pro-sidebar';
import { FiArrowLeftCircle, FiArrowRightCircle } from 'react-icons/fi';
import { ADMIN_PRODUCTS, ADMIN_ORDERS, ADMIN_POSTS, ADMIN_USERS, ADMIN_SETTINGS, ADMIN_DASHBOARD, ADMIN_INGREDIENTS, ADMIN_INGREDIENTS_NEW, ADMIN_DOCS } from 'constants/routes';
import { NavLink, useHistory, useLocation, Link } from 'react-router-dom';

const Side = () => {

  const { collapseSidebar } = useProSidebar();
  const [favorite, setFavorite] = useState(false);
  const toggleFavorite = () => setFavorite((prev) => !prev);
  const history = useHistory();

  return (

    <nav className="content-admin-wrapper-sidebar">
      <div style={{ display: 'flex', height: '100%' }}>
        <Sidebar
          width={"140px"}
          collapsedWidth={"70px"}
          defaultCollapsed="true"
        >
          <Menu>
            <MenuItem
              routerLink={<Link to="/admin/dashboard" />}
              active={window.location.pathname === "/admin/dashboard"}
              icon={<Icon name="dashboard" />}
            >
              Dashboard
            </MenuItem>
            <MenuItem
              routerLink={<Link to={ADMIN_INGREDIENTS} />}
              active={window.location.pathname === "/admin/ingredients"}
              icon={<Icon name="messages" />}
            >
              Ingredients
            </MenuItem>
            <MenuItem
              routerLink={<Link to={ADMIN_SETTINGS} />}
              active={window.location.pathname === "/admin/settings"}
              icon={<Icon name="settings" />}
            >
              Settings
            </MenuItem>
            <MenuItem
              routerLink={<Link to={ADMIN_POSTS} />}
              active={window.location.pathname === "/admin/posts"}
              icon={<Icon name="posts" />}
            >
              Posts
            </MenuItem>
            <MenuItem
              routerLink={<Link to={ADMIN_USERS} />}
              active={window.location.pathname === "/admin/users"}
              icon={<Icon name="users" />}
            >
              Users
            </MenuItem>
            <SubMenu label="Stages" icon={<Icon name="products" />}
              routerLink={<Link to={ADMIN_PRODUCTS} />}
              active={window.location.pathname === "/admin/products"}
            >
              <MenuItem
                routerLink={<Link to={ADMIN_PRODUCTS} />}
                active={window.location.pathname === "/admin/products"}
                icon={<Icon name="products" />}
              >
                Products
              </MenuItem>

            </SubMenu>

            <MenuItem
              routerLink={<Link to={ADMIN_ORDERS} />}
              active={window.location.pathname === "/admin/orders"}
              icon={<Icon name="orders" />}
            >
              Orders
            </MenuItem>
            <MenuItem
              routerLink={<Link to={ADMIN_DOCS} />}
              active={window.location.pathname === "/admin/docs"}
              icon={<Icon name="book-2" />}
            >
              Docs
            </MenuItem>
            <MenuItem >
              <button
                onClick={() => { toggleFavorite(); collapseSidebar() }}
                className="top-rated-car-react-button">
                {favorite ? (
                  <FiArrowLeftCircle
                    style={{ color: "#F76631", width: "24px", height: "24px" }} />

                ) : (
                  <FiArrowRightCircle
                    style={{ color: "#F76631", width: "24px", height: "24px" }} />
                )}
              </button>
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>
    </nav>
  );
};

export default Side;
