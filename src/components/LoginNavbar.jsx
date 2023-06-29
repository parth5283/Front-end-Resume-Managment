import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = ({ isLoggedIn, handleLogout }) => {
  return (
    <nav>
      <ul className="nav">
        {isLoggedIn && (
          <li className="nav-item">
            <NavLink className="nav-link" to="/hrview">
              HR
            </NavLink>
          </li>
        )}
        {isLoggedIn && (
          <li className="nav-item">
            <button onClick={handleLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
