/* eslint-disable indent */
import { FilterOutlined, ShoppingOutlined } from '@ant-design/icons';
import * as ROUTE from 'constants/routes';
import logo from 'images/logo-full.png';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink, useLocation } from 'react-router-dom';
import UserAvatar from 'views/account/components/UserAvatar';
import BasketToggle from '../../basket/BasketToggle';
import Badge from '../Badge';
import FiltersToggle from '../Filter/FiltersToggle';
import MobileNavigation from './MobileNavigation';
import SearchBar from '../SearchBar';
import MenuBurger from './MenuBurger';
import '../../../styles/menu/index.scss'
import ToggleMenu from '../ToggleMenu';

const Navigation = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
  const navbar = useRef(null);
  const { pathname } = useLocation();

  const store = useSelector((state) => ({
    basketLength: state.basket.length,
    user: state.auth,
    isAuthenticating: state.app.isAuthenticating,
    isLoading: state.app.loading
  }));

  const scrollHandler = () => {
    if (navbar.current && window.screen.width > 480) {
      if (window.pageYOffset >= 70) {
        navbar.current.classList.add('is-nav-scrolled');
      } else {
        navbar.current.classList.remove('is-nav-scrolled');
      }
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    window.addEventListener('scroll', scrollHandler);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const onClickLink = (e) => {
    if (store.isAuthenticating) e.preventDefault();
  };

   // disable the basket toggle to these pathnames
   const basketDisabledpathnames = [
    ROUTE.CHECKOUT_STEP_1,
    ROUTE.CHECKOUT_STEP_2,
    ROUTE.CHECKOUT_STEP_3,
    ROUTE.SIGNIN,
    ROUTE.SIGNUP,
    ROUTE.FORGOT_PASSWORD
  ];

  if (store.user && store.user.role === 'ADMIN') {
    return null;
  }

  if (isMobile) {
    return (
      <MobileNavigation
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...store}
        disabledPaths={basketDisabledpathnames}
        pathname={pathname}
      />
    );
  } else {
    return (
      <nav className="navigation" ref={navbar}>
        {/* Navigation Menu */}
        <ul className="navigation-menu-main">
        <li><NavLink activeClassName="navigation-menu-active" exact to={ROUTE.HOME}>Home</NavLink></li>
        <li><NavLink activeClassName="navigation-menu-active" to={ROUTE.SHOP}>Shop</NavLink></li>
      </ul>

        <ToggleMenu />

        {/* Exclude component by a route */}
        {(pathname === ROUTE.SHOP || pathname === ROUTE.SEARCH) && (
          <FiltersToggle>
            <button className="button-muted button-small" type="button">
              Filters &nbsp;
              <FilterOutlined />
            </button>
          </FiltersToggle>
        )}

        {/* SearchBar */}
        <SearchBar />

        {/* Navigation Menu */}
        <ul className="navigation-menu">
          <li className="navigation-menu-item">
            <BasketToggle>
              {({ onClickToggle }) => (
                <button
                  className="button-link navigation-menu-link basket-toggle"
                  disabled={basketDisabledpathnames.includes(pathname)}
                  onClick={onClickToggle}
                  type="button"
                >
                  <Badge count={store.basketLength}>
                    <ShoppingOutlined style={{ fontSize: '2.4rem' }} />
                  </Badge>
                </button>
              )}
            </BasketToggle>
          </li>
          {store.user ? (
            <li className="navigation-menu-item">
              <UserAvatar />
            </li>
          ) : (
            <li className="navigation-action">
              {pathname !== ROUTE.SIGNUP && (
                <Link
                  className="button button-small"
                  onClick={onClickLink}
                  to={ROUTE.SIGNUP}
                >
                  Sign Up
                </Link>
              )}
              {pathname !== ROUTE.SIGNIN && (
                <Link
                  className="button button-small button-muted margin-left-s"
                  onClick={onClickLink}
                  to={ROUTE.SIGNIN}
                >
                  Sign In
                </Link>
              )}
            </li>
          )}
          {/* ... (other navigation menu items) */}
        </ul>
      </nav>
    );
  }
};

export default Navigation;
