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
        this.setState({loading: false, orders: fetchedOrders});
      })
      .catch(err => {
        this.setState({loading: false});
      });
  }

  render() {
    let orders = <p style={{textAlign: 'center' }}>No orders</p>

    if (this.state.orders.length) {
      orders = (
        <div>
          {this.state.orders.map(order => (
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

export default ErrorHandler(Orders, axios);
