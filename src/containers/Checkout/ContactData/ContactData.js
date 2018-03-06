import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders.js';
import { withRouter } from 'react-router-dom';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

export class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: ''
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-mail'
        },
        value: ''
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: ''
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zipcode'
        },
        value: ''
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: ''
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {
              value: 'fastest',
              display: 'Fastest'
            }, {
              value: 'cheapest',
              display: 'Cheapest'
            }
          ]
        },
        value: ''
      },
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({loading: true});

    const userInfo = {}

    for (let key in this.state.orderForm) {
      userInfo[key] = this.state.orderForm[key].value;
    }

    const order = {
      ingredients: this.props.ingredients,
      totalPrice: this.props.price,
      userInfo: userInfo
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

  inputChangedHandler = (event, inputId) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    }
    const updatedElement = {
      ...updatedOrderForm[inputId]
    }
    updatedElement.value = event.target.value;
    updatedOrderForm[inputId] = updatedElement;
    this.setState({orderForm: updatedOrderForm});
  }

  render() {
    const formElementsArray = [];

    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    let form = (
      <form>
        {formElementsArray.map(formElement => {
          return <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={(event) => this.inputChangedHandler(event, formElement.id)} />
          }
        )}
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