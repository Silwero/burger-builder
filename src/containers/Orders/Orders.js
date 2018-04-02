import React, { Component } from 'react';
import Order from '../../components/Order/Order/Order';
import axios from '../../axios-orders.js';
import ErrorHandler from '../../hoc/ErrorHandler/ErrorHandler';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';

export class Orders extends Component {

  componentDidMount() {
    this.props.onFetchOrders();
  }

  render() {
    let orders = <Spinner/>

    if(!this.props.loading) {
      orders = <p style={{textAlign: 'center' }}>No orders</p>
    }

    if (this.props.orders.length) {
      orders = (
        <div>
          {this.props.orders.map(order => (
              <Order
                key={order.id}
                ingredients={order.ingredients}
                price={+order.totalPrice}/>
            )
          )}
        </div>
      );
    }
    return orders;
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: () => dispatch(actions.fetchOrders())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(Orders, axios));
