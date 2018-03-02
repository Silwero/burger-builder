import React, { Component } from 'react';
import classes from './Modal.css';
import Wrapper from '../../../hoc/Wrapper';
import Backdrop from '../Backdrop/Backdrop';

export class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.showing !== this.props.showing || nextProps.children !== this.props.children;
  }

  render() {
    return (
      <Wrapper>
        <Backdrop show={this.props.showing} clicked={this.props.modalClosed} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.showing ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.showing ? '1' : 0,
            visibility: this.props.showing ? '' : 'hidden',
          }}>
          {this.props.children}
        </div>
      </Wrapper>
    );
  }
}

export default Modal;