import React from 'react';
import NavItem from './NavItem/NavItem';
import classes from './NavItems.css';

const navItems = (props) => (
  <ul className={classes.navItems}>
    <NavItem link='/'>Burger Builder</NavItem>
    <NavItem link='/checkout'>Checkout</NavItem>
  </ul>
);

export default navItems;