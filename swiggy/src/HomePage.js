import React, { Component } from 'react';
import {Link } from "react-router-dom";
import axios from 'axios';

import himg from './images/homefood.png';

import './HomePage.css';
import Banner from './Banner';

export default class HomePage extends Component {

    constructor(props) {
      super(props)
    
      this.state = {
        user: ""
      }
    }

    componentDidMount(){
        
        let words = ["Cooking?",
                     "Hungry?",
                     "Late from work?",
                     "Suprise guest?",
                     "Cooking gone wrong?",
                     "Movie Marathon?",
                     "Game night?"];
        let i=0;

        setInterval(function(){
           let title = document.getElementsByClassName("changingtitle")[0];
           title.textContent = words[i = (i+1)%words.length];
        }, 2000);

        axios.get("http://localhost:8083/login/user")
        .then(response => {

            this.setState( {user: response.data} );
        });
    }

  render() {
    return (
        <>
      <div id='rest' className='fronta'>        
        <h1 className='swiggy'> SWIGGY </h1>
        {this.state.user === "" 
            ? 
              <>
                <Link className='loginbtn hmbtn' to='/login/loginn'>Login</Link>
                <Link className='signupbtn hmbtn' to='/login/signup'>Signup</Link>
              </>
            : 
                <Link className='signupbtn hmbtn' to='/user'>{this.state.user}</Link>
            }

        <h1 className='changingtitle'> Cooking? </h1>
        <h2 className='belowchangingtitle'> Order food from favourite restaurant near you</h2>
        
        <div className='hmlocation'>
            <input className='locationip' type='text' placeholder='Enter your delivery location' />
            <input className='locationbtn' type='submit' value='FIND FOOD'/>
        </div>
      </div>
      <div className='fronta'>
         <img className='homeimg' src={himg}></img>
      </div>
      <div id='bbanner'>
         <Banner/>
      </div>
      </>
    )
  }
}
