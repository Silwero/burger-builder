import React from 'react';
import classes from './Order.css';

const order = (props) => {
  const ingredients = [];

  for (let name in props.ingredients) {
    ingredients.push({
      name: name,
      amount: props.ingredients[name]
    });
  }

  const ingridientsOutput = ingredients.map(ig => {
    return <span
              style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px 8px'
              }}
              key={ig.name}>{ig.name} ({ig.amount})</span>;
  });

  return (
      <div className={classes.Order}>
        <p style={{margin: '0 -8px 20px'}}>{ingridientsOutput}</p>
        <p style={{margin: '0'}}>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
      </div>
    );
};

export default order;