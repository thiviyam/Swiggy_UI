import React, { Component } from 'react';
import {Link } from "react-router-dom";
import axios from 'axios';
import './DropDownUser.css';

export default class DropDownUser extends Component {

    constructor(props) {
      super(props)
    
      this.state = {
         cname: ""
      }
    }

    loggingOut = () =>{
        axios.post("http://localhost:8083/login/signout", this.state.cname)
        .then(response =>{
            window.location = "/user";
        })
    }

  render() {
    return (
      <div id='userDD'>
        
        <ul className='DDlist' type='none'>
            <li className='DDoption'> <Link className='DDlink' to='/welcome/profile'>Profile</Link> </li>
            <li className='DDoption'> <Link className='DDlink' to='/welcome/profile/orders'>Orders</Link> </li>
            <li className='DDoption'> <Link className='DDlink' to=''>Swiggy One</Link> </li>
            <li className='DDoption'> <Link className='DDlink' to='/welcome/profile/favorites'>Favourite</Link> </li>
            <li className='DDoption'> <Link className='DDlink' to='/user' onClick={this.loggingOut}>Logout</Link> </li>
        </ul>

      </div>
    )
  }
}
