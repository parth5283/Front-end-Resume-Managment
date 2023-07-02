import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink } from 'react-router-dom';
import logo from "../images/logo.svg";

const Navbar = ({ isLoggedIn, handleLogout }) => {
  const [activeNavItem, setActiveNavItem] = useState('home');

  const handleNavItemClick = (navItem) => {
    setActiveNavItem(navItem);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink
          className="navbar-brand"
          to="/"
          onClick={() => handleNavItemClick('home')}
        >
          <img src={logo} alt="logo" />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className={`nav-item ${activeNavItem === 'home' ? 'active' : ''}`}>
              <NavLink
                className="nav-link"
                to="/"
                onClick={() => handleNavItemClick('home')}
              >
                Home <span className="sr-only">(current)</span>
              </NavLink>
            </li>

            <li className={`nav-item ${activeNavItem === 'hr' ? 'active' : ''}`}>
              {isLoggedIn ? (
                <NavLink
                  className="nav-link"
                  to="/hrview"
                  onClick={() => handleNavItemClick('hr')}
                >
                  HR
                </NavLink>
              ) : (
                <NavLink
                  className="nav-link disabled"
                  to="/hrview"
                  onClick={(e) => e.preventDefault()}
                >
                  HR
                </NavLink>
              )}
            </li>

            <li className={`nav-item ${activeNavItem === 'about' ? 'active' : ''}`}>
              <a
                className="nav-link"
                href="https://www.cabotsolutions.com/about-us"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleNavItemClick('about')}
              >
                About
              </a>
            </li>

            <li className={`nav-item ${activeNavItem === 'login' ? 'active' : ''}`}>
              {!isLoggedIn ? (
                <NavLink
                  className="nav-link"
                  to="/login"
                  onClick={() => handleNavItemClick('login')}
                >
                  Login
                </NavLink>
              ) : (
                <button className="nav-link" onClick={handleLogout}>
                  Logout
                </button>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;







// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.css';
// import { NavLink } from 'react-router-dom';
// import logo from "../images/logo.svg";


// const Navbar = () => {
//   const [activeNavItem, setActiveNavItem] = useState('home');

//   const handleNavItemClick = (navItem) => {
//     setActiveNavItem(navItem);
//   };

//   return (
//     <>
//       <nav className="navbar navbar-expand-lg navbar-light bg-light">
//         <NavLink
//           className="navbar-brand"
//           to="/"
//           onClick={() => handleNavItemClick('home')}
//         >
//           <img src={logo} alt="logo" />
//         </NavLink>
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-toggle="collapse"
//           data-target="#navbarSupportedContent"
//           aria-controls="navbarSupportedContent"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         <div className="collapse navbar-collapse" id="navbarSupportedContent">
//           <ul className="navbar-nav ml-auto">
//             <li className={`nav-item ${activeNavItem === 'home' ? 'active' : ''}`}>
//               <NavLink
//                 className="nav-link"
//                 to="/"
//                 onClick={() => handleNavItemClick('home')}
//               >
//                 Home <span className="sr-only">(current)</span>
//               </NavLink>
//             </li>

//             <li className={`nav-item ${activeNavItem === 'hr' ? 'active' : ''}`}>
//               <NavLink
//                 className="nav-link"
//                 to="/hrview"
//                 onClick={() => handleNavItemClick('hr')}
//               >
//                 HR
//               </NavLink>
//             </li>

//             <li className={`nav-item ${activeNavItem === 'about' ? 'active' : ''}`}>
//               <a
//                 className="nav-link"
//                 href="https://www.cabotsolutions.com/about-us"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 onClick={() => handleNavItemClick('about')}
//               >
//                 About
//               </a>
//             </li>

//             <li className={`nav-item ${activeNavItem === 'login' ? 'active' : ''}`}>
//               <NavLink
//                 className="nav-link"
//                 to="/login"
//                 onClick={() => handleNavItemClick('login')}
//               >
//                 Login
//               </NavLink>
//             </li>
//           </ul>
//         </div>
//       </nav>
//     </>
//   );
// };

// export default Navbar;
