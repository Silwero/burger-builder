import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

export class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0
  }
  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = '';
    for (let param of query.entries()) {
      if (param[0] === 'price') {
        price = param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    this.setState({ingredients: ingredients, totalPrice: price});
  }
  render() {
    return (
      <div>
        <CheckoutSummary ingredients={this.state.ingredients} />
        <Route
          path={this.props.match.path + '/contact-data'}
          render={(props) => (<ContactData price={this.state.totalPrice} ingredients={this.state.ingredients} />)} />
      </div>
    );
  }
}

export default Checkout;
