import React, { useState } from "react";
import "./Header.css";
import Search from "../Search/Search";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

const Header = () => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  const { user } = useSelector((state) => state.user);

  const closeMenu = () => setOpen(false);

  return (
    <React.Fragment>
      <div className="header">
        <Link to="/">
          <img src="/assets/tsr-logo.png" alt="tsr" className="site-logo" />
        </Link>
        <Search />
        <div className="nav-menu-lg">
          {user ? (
            <Link to="/profile">Profile</Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
          <Link to="/cart">Cart</Link>
        </div>
        <GiHamburgerMenu className="burger-icon" onClick={handleClick} />
      </div>
      {open ? (
        <div className="nav-menu-mb">
          {user ? (
            <Link to="/profile" onClick={closeMenu}>
              Profile
            </Link>
          ) : (
            <Link to="/login" onClick={closeMenu}>
              Login
            </Link>
          )}

          <Link to="/cart" onClick={closeMenu}>
            Cart
          </Link>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default Header;
