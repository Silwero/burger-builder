import React, { Component } from 'react';
import { connect } from 'react-redux';

import Wrapper from '../../hoc/Wrapper';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import ErrorHandler from '../../hoc/ErrorHandler/ErrorHandler';
import axios from '../../axios-orders';
import * as burgerBuilderActions from '../../store/actions/index';

export class BurgerBuilder extends Component {
  state = {
    purchaising: false
  }

  componentDidMount() {
    this.props.onInitIngredients();
  }

  purchaseHandler = () => {
    if (this.props.isAuth) {
      this.setState({
        purchaising: true
      });
    } else {
      this.props.onSetAuthRedirectPath('/checkout');
      this.props.history.push('/auth');
    }
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
            isAuth={this.props.isAuth}
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
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuth: state.auth.token !== null
    };
}

const mapDispatchToProps = dispatch => {
    return {
      onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
      onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
      onInitIngredients: () => dispatch(burgerBuilderActions.getIngredient()),
      onSetAuthRedirectPath: (path) => dispatch(burgerBuilderActions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(BurgerBuilder, axios));
