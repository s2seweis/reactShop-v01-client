// ToggleMenu.js
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import * as ROUTE from 'constants/routes';
// import './ToggleMenu.scss';

const ToggleMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="toggle-menu-container">
      <button style={{marginRight:"15px"}} className="toggle-button" onClick={toggleMenu}>
        More
      </button>
      {menuOpen && (
        <div className="navigation-menu-main" style={{width:"auto", padding:"10px"}}>
          <div style={{padding:"5px"}}><NavLink activeClassName="navigation-menu-active" exact to={ROUTE.HOME}>Home</NavLink></div>
          <div style={{padding:"5px"}}><NavLink activeClassName="navigation-menu-active" to={ROUTE.SHOP}>Shop</NavLink></div>
          <div style={{padding:"5px"}}><NavLink activeClassName="navigation-menu-active" to={ROUTE.POST}>Post</NavLink></div>
          <div style={{padding:"5px"}}><NavLink activeClassName="navigation-menu-active" to={ROUTE.FEATURED_PRODUCTS}>Featured</NavLink></div>
          <div style={{padding:"5px"}}><NavLink activeClassName="navigation-menu-active" to={ROUTE.RECOMMENDED_PRODUCTS}>Recommended</NavLink></div>
        </div>
      )}
    </div>
  );
};

export default ToggleMenu;
