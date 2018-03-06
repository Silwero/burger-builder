import React, { Component } from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import { withRouter } from 'react-router-dom';
import classes from './CheckoutSummary.css';

export class CheckoutSummary extends Component {
  cancelHandler() {
    this.props.history.goBack();
  }

  nextHandler() {
    this.setState({ loading: true });
    this.props.history.replace('/checkout/contact-data');
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
          clicked={() => this.nextHandler()}>Continue</Button>
      </div>
    );
  }
}


export default withRouter(CheckoutSummary);