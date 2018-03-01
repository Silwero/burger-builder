import React, { Component } from 'react';
import Wrapper from '../../../hoc/Wrapper';
import Button from '../../UI/Button/Button';

export class OrderSummary extends Component {

  render() {
    const ingredientsSummary = Object.keys(this.props.ingredients)
      .map((igKey) => {
        return <li key={igKey}>
            <span style={{textTransform: 'capitalize'}}>{igKey}</span>:
            {this.props.ingredients[igKey]}
          </li>
      });
    return (
      <Wrapper>
        <h3>Your order</h3>
        <p>A delitious burger with the following ingredients:</p>
        <ul>
          {ingredientsSummary}
        </ul>
        <p>Total price: <strong>{this.props.price.toFixed(2)}</strong></p>
        <p>Continue to Checkout?</p>
        <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
        <Button btnType="Success"  clicked={this.props.purchaseContinue}>CONTINUE</Button>
      </Wrapper>
    );
  }
}

export default OrderSummary;