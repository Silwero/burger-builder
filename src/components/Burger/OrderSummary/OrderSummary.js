import React from 'react';
import Wrapper from '../../../hoc/Wrapper';

const orderSummary = (props) => {
  const ingredientsSummary = Object.keys(props.ingredients)
    .map((igKey) => {
      return <li key={igKey}>
          <span style={{textTransform: 'capitalize'}}>{igKey}</span>:
          {props.ingredients[igKey]}
        </li>
    });
  return (
      <Wrapper>
        <h3>Your order</h3>
        <p>A delitious burger with the following ingredients:</p>
        <ul>
          {ingredientsSummary}
        </ul>
        <p>Continue to Checkout?</p>
      </Wrapper>
    );
};

export default orderSummary;