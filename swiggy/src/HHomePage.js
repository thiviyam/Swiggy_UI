import React, { Component } from 'react';
import {Link } from "react-router-dom";

export default class Banner extends Component {

    constructor(props) {
      super(props)
    
      this.state = {
         user: this.props.user
      }
    }
  render() {
    return (
      <div>
        <Link className='signupbtn hmbtn' to='/login/user'>{this.state.user}</Link>
      </div>
    )
  }
}
