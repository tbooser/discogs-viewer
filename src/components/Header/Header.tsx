import React from 'react';
import { connect } from 'react-redux';

const Header = () => {
  return <div className="container">Header</div>;
};

const mapStateToProps = (state) => {
  return {
    app: state,
  };
};

export default connect(mapStateToProps)(Header);
