import React, { Component } from 'react';
import {Link } from "react-router-dom";
import Login from './Login';
import './FullLogin.css';


export default class FullLogin extends Component {

    constructor(props) {
      super(props)
    
      this.state = {
         area: this.props.area,
         createAcc: this.props.createAcc,
         loginAcc: this.props.loginAcc,
         crossLoc: this.props.crossLoc
      }
    }
    crossMark = () =>{
        // window.location = this.state.crossLoc;
        window.history.back();
    }

  render() {

    if(this.props.type === "LOGIN"){
        return(
          <>
            <div id='fullbody'>
               <span onClick={this.crossMark} className='cross' >&#10005;</span>
               <h1 id='heading'>Login</h1>

               {this.state.area === "welcome" 
                ?
               <h6 className='subheading'> or <Link className='subheading, link' to={this.state.createAcc}>create an account</Link></h6>
               :
               <h6 className='subheading'> or <Link className='subheading, link' to={this.state.createAcc}>create an account</Link></h6>
               }

               <hr className='line'/>

               <Login type = {this.props.type} area = {this.state.area}/>
            </div>
            <div id='Subfullbody' onClick={this.crossMark}></div>
            </>
        )

    }else{
        return (
          <>
            <div id='fullbody'>
               <span onClick={this.crossMark} className='cross'>&#10005;</span>
               <h1 id='heading'>Signup</h1>

               {this.state.area === "welcome" 
                ?
               <h6 className='subheading'> or <Link className='subheading, link' to={this.state.loginAcc}>login to your account</Link></h6>
               :
               <h6 className='subheading'> or <Link className='subheading, link' to={this.state.loginAcc}>login to your account</Link></h6>
               }
               

               <hr className='line'/>

               <Login type = {this.props.type} area = {this.state.area}/>
            </div>
            <div id='Subfullbody' onClick={this.crossMark}></div>
          </>
    )
    }
    
  }
}
