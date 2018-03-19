import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name
  }
};

export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name
  }
};

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.GET_INGREDIENT,
    ingredients: ingredients
  }
}

export const fetchIngredientsError = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILD
  }
};

export const getIngredient = (name) => {
  return dispatch => {
    axios.get( '/ingredients.json' )
      .then( response => {
        dispatch(setIngredients(response.data));
      })
      .catch( error => {
        dispatch(fetchIngredientsError());
      });
  };
};