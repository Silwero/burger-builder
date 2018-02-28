import React from 'react';
import classes from './Burger.css';
import BurgerIngridient from './BurgerIngridient/BurgerIngridient';

const burger = (props) => {
  let transformdIngredients = Object.keys(props.ingredients)
    .map((igKey) => {
        return [...Array(props.ingredients[igKey])].map((_, i) => { // @ToDo why this work so?
          return <BurgerIngridient key={igKey + i} type={igKey} />
        });
      })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

  if (transformdIngredients.length === 0) {
    transformdIngredients = <p>Please start adding ingredients!</p>
  }
  return (
      <div className={classes.Burger}>
        <BurgerIngridient type="bread-top" />
        {transformdIngredients}
        <BurgerIngridient type="bread-bottom" />
      </div>
    )
};

export default burger;