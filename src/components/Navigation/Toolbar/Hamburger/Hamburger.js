import React from 'react';
import classes from './Hamburger.css';

const hamburger = (props) => (
  <button
    className={classes['c-hamburger']}
    onClick={props.click}>
      <span>toggle menu</span>
  </button>
)

export default hamburger;