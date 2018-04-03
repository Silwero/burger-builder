import React from 'react';
import NavItem from './NavItem/NavItem';
import classes from './NavItems.css';

const navItems = (props) => (
  <ul className={classes.navItems}>
    <NavItem link='/'>Burger Builder</NavItem>
    { props.isAuth
      ? <NavItem link='/orders'>Orders</NavItem>
      : null }
    { !props.isAuth
      ? <NavItem link='/auth'>Authenticate</NavItem>
      : <NavItem link='/logout'>Logout</NavItem> }
  </ul>
);

export default navItems;