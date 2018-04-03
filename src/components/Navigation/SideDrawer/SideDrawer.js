import React from 'react';
import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import classes from './SideDrawer.css';
import BackDrop from '../../UI/Backdrop/Backdrop';
import Wrapper from '../../../hoc/Wrapper';

const sideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }
  return (
      <Wrapper>
        <BackDrop show={props.open} clicked={props.closed} />
        <div className={attachedClasses.join(' ')}>
          <div className={classes.Logo}>
            <Logo />
          </div>
          <nav>
            <NavItems isAuth={props.isAuth} />
          </nav>
        </div>
      </Wrapper>
    );
}

export default sideDrawer;