import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }
]

const buidControls = (props) => (
  <div className={classes.BuildControls}>
    <p>Total price: <strong>{props.price.toFixed(2)}$</strong></p>
    {controls.map((ctrl) => {
      return <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        added={() => props.ingredientAdded(ctrl.type)}
        removed={() => props.ingredientRemoved(ctrl.type)}
        disabled={props.disabled[ctrl.type]} />;
    })}
    <button
      disabled={!props.purchaseble}
      className={classes.OrderButton}
      onClick={props.ordered()}>ORDER NOW</button>
  </div>
);

export default buidControls;