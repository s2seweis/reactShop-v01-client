import React, { useEffect, useState } from "react";
import { ADMIN_PRODUCTS, ADMIN_ORDERS, ADMIN_POSTS, ADMIN_USERS, ADMIN_SETTINGS, ADMIN_DASHBOARD } from 'constants/routes';
import MenuItem from "./MenuItem";
/**
 * @author
 * @function SideMenu
 **/
export const menuItems = [
  {
    name: "Dashboard1",
    exact: true,
    to: ADMIN_DASHBOARD,
    iconClassName: "bi bi-arrow-right-square-fill",
  },
  {
    name: "Posts",
    exact: true,
    to: "/admin/posts",
    iconClassName: "bi bi-sign-stop",
  },
  {
    name: "Users",
    exact: true,
    to: `/admin/users`,
    iconClassName: "bi bi-rss",
  },
  { name: "Settings", to: `/admin/settings`, iconClassName: "bi bi-shield" },
  { name: "Products", to: `/admin/products`, iconClassName: "bi bi-vector-pen" },
  { name: "Orders", to: `/admin/orders`, iconClassName: "bi bi-arrows-fullscreen" },
];

const SideMenu = (props) => {
  const [inactive, setInactive] = useState(false);

  const removeActiveClassFromSubMenu = () => {
    document.querySelectorAll(".sub-menu").forEach((el) => {
      el.classList.remove("active");
    });
  };

  useEffect(() => {
    let menuItems = document.querySelectorAll(".menu-item");
    menuItems.forEach((el) => {
      el.addEventListener("click", (e) => {
        const next = el.nextElementSibling;
        removeActiveClassFromSubMenu();
        menuItems.forEach((el) => el.classList.remove("active"));
        el.classList.toggle("active");
        console.log(next);
        if (next !== null) {
          next.classList.toggle("active");
        }
      });
    });
  }, []);

  return (
    <div className={`side-menu ${inactive ? "inactive" : ""}`}>
      <div className="top-section">
        <div onClick={() => setInactive(!inactive)} className="toggle-menu-btn">
          {inactive ? (
            <i class="bi bi-arrow-right-square-fill"></i>
          ) : (
            <i class="bi bi-arrow-left-square-fill"></i>
          )}
        </div>
      </div>

      <div className="search-controller">
        <button className="search-btn">
          <i class="bi bi-search"></i>
        </button>

        <input type="text"
          placeholder="search"
        />
      </div>

      <div className="divider"></div>

      <div className="main-menu">
        <ul>
          {menuItems.map((menuItem, index) => (
            <MenuItem
              key={index}
              name={menuItem.name}
              exact={menuItem.exact}
              to={menuItem.to}
              subMenus={menuItem.subMenus || []}
              iconClassName={menuItem.iconClassName}
              onClick={(e) => {
                if (inactive) {
                  setInactive(false);
                }
              }}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideMenu;
