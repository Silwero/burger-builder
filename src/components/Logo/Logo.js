import React from 'react';
import classes from './Logo.css';
import { NavLink } from 'react-router-dom';

import burgerLogo from '../../assets/images/burger-logo.png';

const logo = (props) => (
  <div className={classes.Logo} style={{height: props.height}}>
    <NavLink to="/">
      <img src={burgerLogo} alt="Burger Builder"/>
    </NavLink>
  </div>
);

export default logo;