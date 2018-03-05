import React, { Component } from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import { withRouter } from 'react-router-dom';
import classes from './CheckoutSummary.css';
import axios from '../../../axios-orders.js';

export class CheckoutSummary extends Component {
  cancelHandler() {
    this.props.history.goBack();
  }

  sendDataHandler() {
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      customer: {
        name: 'Igor Kleponosov',
        adress: {
          street: 'Teststreet 1',
          country: 'Ukraine',
          zipCode: '454522'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    }
    axios.post('/orders.json', order)
      .then(response => {
        this.setState({ loading: false, purchaising: false });
        this.props.history.goBack();
      })
      .catch(err => {
        this.setState({ loading: false, purchaising: false });
        this.props.history.goBack();
      });
  }


  render() {
    return (
      <div className={classes.CheckoutSummary}>
        <h1>We hope it tastes well!</h1>
        <div style={{width: '100%', margin: 'auto'}}>
          <Burger ingredients={this.props.ingredients} />
        </div>
        <Button
          btnType="Danger"
          clicked={() => this.cancelHandler()}>Cancel</Button>
        <Button
          btnType="Success"
          clicked={() => this.sendDataHandler()}>Continue</Button>
      </div>
    );
  }
}


export default withRouter(CheckoutSummary);