import React, { Component } from 'react';
import { connect } from 'react-redux';

import Wrapper from '../../hoc/Wrapper';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import ErrorHandler from '../../hoc/ErrorHandler/ErrorHandler';
import * as actionTypes from '../../store/actions';

export class BurgerBuilder extends Component {
  state = {
    totalPrice: 4,
    purchaising: false,
    loading: false
  }

  componentDidMount () {
    axios.get( '/ingredients.json' )
      .then( response => {
        this.props.onGetIngredients(response.data);
      })
      .catch( error => {
        this.setState( { error: true } );
      });
  }

  purchaseHandler = () => {
    this.setState({
      purchaising: true
    });
  }

  purchaseCancelHandler = () => {
    this.setState({
      purchaising: false
    });
  }

  purchaseContinueHandler = () => {
    this.props.history.push('/checkout');
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

      return sum > 0;
  }

  render() {
    const disableInfo = {
      ...this.props.ings
    }

    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0
    }

    let orderSummary = null;

    let burger = <Spinner />

    if (this.props.ings) {
      burger = (
        <Wrapper>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disableInfo}
            price={this.props.price}
            purchaseble={this.updatePurchaseState(this.props.ings)}
            ordered={() => this.purchaseHandler} />
        </Wrapper>
      );

      orderSummary = <OrderSummary
        ingredients={this.props.ings}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinue={this.purchaseContinueHandler}
        price={this.props.price} />

      if(this.state.loading) {
        orderSummary = <Spinner />
      }
    }

    return (
      <Wrapper>
        <Modal
          showing={this.state.purchaising}
          modalClosed={this.purchaseCancelHandler}>
            {orderSummary}
        </Modal>
        {burger}
      </Wrapper>
    );
  }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
}

const mapDispatchToProps = dispatch => {
    return {
      onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
      onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName}),
      onGetIngredients: (ing) => dispatch({type: actionTypes.GET_INGREDIENT, ing: ing})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(BurgerBuilder, axios));
