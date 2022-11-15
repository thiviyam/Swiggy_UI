import React, { Component } from 'react';
import {Link } from "react-router-dom";

import './UserSideNav.css';

export default class UserSideNav extends Component {
  render() {
    return (
      <div id='userSNbody'>
        <ul id='userSNunorder' type='none'>
            <li className='userSNode userSNlist'> <Link className='userSNlink' to='/welcome/profile/orders' > Orders</Link> </li>
            <li className='userSNswi userSNlist'> <Link className='userSNlink' to='' > Swiggy One </Link> </li>
            <li className='userSNfav userSNlist'> <Link className='userSNlink' to='/welcome/profile/favorites' > Favourites </Link> </li>
            <li className='userSNpay userSNlist'> <Link className='userSNlink' to='' > Payment </Link> </li>
            <li className='userSNadd userSNlist'> <Link className='userSNlink' to='/welcome/profile/addresses' > Addresses </Link> </li>
            <li className='userSNset userSNlist'> <Link className='userSNlink' to='' > Settings </Link> </li>       
        </ul>  
      </div>
    )
  }
}
