import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import Hamburger from './Hamburger/Hamburger';

const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <Hamburger click={props.shownSideDrawer} />
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesctopOnly}>
      <NavItems isAuth={props.isAuth} />
    </nav>
  </header>
);

export default toolbar;