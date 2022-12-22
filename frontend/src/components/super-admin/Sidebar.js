import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar-wrapper">
      <nav id="sidebar">
        <ul className="list-unstyled components mt-4">
          <li className="mb-4">
            <h4>Super-admin</h4>
          </li>
          <li>
            <Link to="/super-admin/dashboard">
              <i className="fa fa-tachometer"></i> Dashboard
            </Link>
          </li>

          <li>
            <a
              href="#productSubmenu"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              <i className="fa fa-product-hunt"></i> Products
            </a>
            <ul className="collapse list-unstyled" id="productSubmenu">
              <li>
                <Link to="/super-admin/products">
                  <i className="fa fa-clipboard"></i> All
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <a
              href="#categorySubmenu"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              <i className="fa fa-product-hunt"></i> Category
            </a>
            <ul className="collapse list-unstyled" id="categorySubmenu">
              <li>
                <Link to="/super-admin/category">
                  <i className="fa fa-clipboard"></i> All
                </Link>
              </li>

              <li>
                <Link to="/super-admin/category/new">
                  <i className="fa fa-plus"></i> Create
                </Link>
              </li>
            </ul>
          </li>

          <li>
            <Link to="/super-admin/orders">
              <i className="fa fa-shopping-basket"></i> Orders
            </Link>
          </li>

          <li>
            <Link to="/super-admin/users">
              <i className="fa fa-users"></i> Users
            </Link>
          </li>

          <li>
            <Link to="/super-admin/reviews">
              <i className="fa fa-star"></i> Reviews
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
