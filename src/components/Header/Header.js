import React, { useContext } from 'react';
import './Header.css'
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

const Header = () => {
  const [loggedUser, setLoggedUser] = useContext(UserContext);

  const linkStyle={
    textDecoration: 'none',
    color: 'darkgreen'
  }
    return (
        <div>
            <nav className="navbar navbar-light bg-light">
          <Link to="/" style={linkStyle}><h3 className="logo">TP BOOK CLUB</h3></Link>
          <ul className="navItems">
            <li className="menuItems">
              <Link to="/" style={linkStyle}>Home</Link>
            </li>
            <li className="menuItems">
              <Link to="/orders" style={linkStyle}>Orders</Link>
            </li>
            <li className="menuItems">
              <Link to="/admin" style={linkStyle}>Admin</Link>
            </li>
            <li className="menuItems">
              <Link to="/login" style={linkStyle}>Login</Link>
            </li>
          </ul>
        </nav>
        </div>
    );
};

export default Header;