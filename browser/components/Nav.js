import React from 'react';
import { Link } from 'react-router';


class Nav extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to='/' className="navbar-brand">Welcome to nearest</Link>
          </div>
        </div>
      </nav>
    );
  }
}

export default Nav;
