import React, {Component} from 'react';
import {connect} from 'react-redux';


import Wrapper from '../../hoc/Wrapper';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

export class Layout extends Component {
  state = {
    shownSideDrawer: false
  }

  sideDrawerClosedHandler = () => {
    this.setState({
      shownSideDrawer: false
    });
  }

  shownSideDrawer = () => {
    this.setState({
      shownSideDrawer: true
    });
  }

  render() {
    return (
      <Wrapper>
        <Toolbar
          shownSideDrawer={this.shownSideDrawer}
          isAuth={this.props.isAuthenticated} />
        <SideDrawer
          open={this.state.shownSideDrawer}
          closed={this.sideDrawerClosedHandler}
          isAuth={this.props.isAuthenticated} />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(Layout);