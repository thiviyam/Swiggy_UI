import React, { Component } from 'react';
import {Link } from "react-router-dom";
import axios from 'axios';

import './ClearCart.css';

export default class ClearCart extends Component {

    constructor(props) {
      super(props)
    
      this.state = {
         id: 0
      }
    }

    componentDidMount(){
        let url = window.location.pathname;
                let arr = url.split('/');
                this.setState( {id: arr[arr.length -1] });
    }

    clearCart = ()=> {
        
        axios.delete("http://localhost:8083/login/clearCart")
        .then(response => {
            console.log("cleared");
            window.location = "/welcome/profile/displayMenu/"+ this.state.id;
        })
    }

  render() {

    return (
      <div className='clearcartBody'>
        <h2 className='clearcartTitle'> Items already in cart </h2>
        <div className='clearcartwords'>
            Your cart contains items from other restaurant. Would you like to reset your cart for adding items from this restaurant?
        </div>

        <Link to={'/welcome/profile/displayMenu/'+ this.state.id} className='clearcartno'>NO</Link>
        <Link to={'/welcome/profile/displayMenu/'+ this.state.id} className='clearcartyes' onClick={this.clearCart}> YES, START AFRESH </Link>
      </div>
    )
  }
}
