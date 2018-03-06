import React, { Component } from 'react';
import Order from '../../components/Order/Order/Order';
import axios from '../../axios-orders.js';
import ErrorHandler from '../../hoc/ErrorHandler/ErrorHandler';

export class Orders extends Component {
  state = {
    orders: [],
    loading: true
  }

  componentDidMount() {
    axios.get('/orders.json')
      .then(resp => {
        const fetchedOrders = [];
        for (let key in resp.data) {
          fetchedOrders.push({
            ...resp.data[key],
            id: key
          });
        }
        this.setState({loading: false});
      })
      .catch(err => {
        this.setState({loading: false});
      });
  }

  render() {
    return (
      <div>
        <Order />
        <Order />
      </div>
    );
  }
}

export default ErrorHandler(Orders, axios);
