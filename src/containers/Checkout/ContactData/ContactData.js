import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders.js';
import { withRouter } from 'react-router-dom';
import Spinner from '../../../components/UI/Spinner/Spinner';

export class ContactData extends Component {
  state = {
    userInfo: {
      name: '',
      email: '',
      adress: {
        street: '',
        postalCode: ''
      }
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({loading: true});

    const order = {
      ingredients: this.props.ingredients,
      userInfo: this.state.userInfo,
      totalPrice: this.props.price
    }
    axios.post('/orders.json', order)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch(err => {
        this.setState({loading: false});
      });
  }

  render() {
    let form = (
      <form>
        <input className={classes.Input} type="text" name="name" placeholder="Your Name"/>
        <input className={classes.Input} type="email" name="email" placeholder="Your Email"/>
        <input className={classes.Input} type="text" name="street" placeholder="Your Street"/>
        <input className={classes.Input} type="text" name="postal" placeholder="Postal Code"/>
        <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner />
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default withRouter(ContactData);