import React, {Component} from 'react';
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
        <Toolbar shownSideDrawer={this.shownSideDrawer} />
        <SideDrawer open={this.state.shownSideDrawer} closed={this.sideDrawerClosedHandler} />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Wrapper>
    );
  }
}

export default Layout;