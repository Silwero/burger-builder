import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import * as actions from './store/actions/index';
import {connect} from 'react-redux';

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignin();
  }

  render() {
    let routs = (
      <Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/auth" exact component={Auth} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuth) {
      routs = (
        <Switch>
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/orders" exact component={Orders} />
          <Route path="/logout" exact component={Logout} />
          <Route path="/checkout" component={Checkout} />
          <Redirect to="/" />
        </Switch>
      );
    }


    return (
      <div>
        <Layout>
          {routs}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignin: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
