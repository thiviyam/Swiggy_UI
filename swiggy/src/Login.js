import React, { Component } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

import './Login.css';

export default class Login extends Component {

    constructor(props) {
      super(props)
    
      this.state = {
         phoneNumber: 0,
         cname: "",
         email: "",
         password: "",
         type: this.props.type,
         verify: 0,
         otp: 0
      }
    }

    changeInPhNo = (event) => {
        this.setState( {phoneNumber: event.target.value} )
    }

    changeInName = (event) => {
        this.setState( {cname: event.target.value} )
    }

    changeInEmail = (event) => {
        this.setState( {email: event.target.value} )
    }

    changeInPassword = (event) => {
        this.setState( {password: event.target.value} )
    }

    changeInotp = (event) =>{
        this.setState( {otp: event.target.value} )
    }

    submittedSignUp = (event) =>{
        
        event.preventDefault();
        console.log(window.location.href);
        axios.post("http://localhost:8083/login/signup", this.state)
        .then( response => {
            console.log(response.data);
            if(this.props.area === "home"){
                window.location = "/";
            }else{
                window.location = "/user";
            }
        });
    }

    submittedLogin = (event) =>{

        event.preventDefault();
        if(this.state.verify === 0){
            this.setState( {
                verify: 1,
                type: 'VERIFY'
            });

        }
        console.log(this.state.otp);
        if(this.state.otp === "1234"){
        
            axios.post("http://localhost:8083/login/loginn", this.state)
            .then( response => {
                if(this.props.area === "home"){
                   window.location = "/";
                }else{
                   window.location = "/user";
                   localStorage.setItem('user', this.state.phoneNumber)
            }
            });
        }
    }

  render() {

    if(this.props.type === "LOGIN"){
      return(
        <div>
            <form onSubmit={this.submittedLogin}>
                <table id='table'>
                    <tbody>
                        <tr>
                           <td> <input type='text' name='phoneNo' placeholder='Phone Number' onChange={this.changeInPhNo} className='ip'/> </td>
                        </tr>

                        {this.state.verify === 1 ? 
                        <tr>
                            <td> <input type='text' name='otp' placeholder='Enter otp sent to mobile' onChange={this.changeInotp} className='ip'/> </td>
                        </tr>
                        : ""}

                        <tr>
                           <input type='submit' value={this.state.type} className='btn'/>
                        </tr>

                        <tr>
                            <td className='cmd'>By creating an account, I accept the Terms & Conditions & Privacy Policy</td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
      )
    }else{
      return (
      <div >
        <form onSubmit={this.submittedSignUp}>
            <table id='table'>
                <tbody>
                    <tr>
                        <td><input type='text' name='phoneNo' placeholder='Phone Number' onChange={this.changeInPhNo} className='ip'/></td>
                    </tr>

                    <tr>
                        <td><input type='text' name='namee' placeholder='Name' onChange={this.changeInName} className='ip'/></td>
                    </tr>

                    <tr>
                        <td><input type='email' name='email' placeholder='Email ID' onChange={this.changeInEmail} className='ip'/></td>
                    </tr>

                    <tr>
                        <td><input type='password' name='password' placeholder='Password' onChange={this.changeInPassword} className='ip'/></td>
                    </tr>

                    <tr>
                       <td> <input type='submit' value='CONTINUE' className='btn'/> </td>
                    </tr>

                    <tr>
                        <td className='cmd'>By creating an account, I accept the Terms & Conditions & Privacy Policy</td>
                    </tr>
                </tbody>
            </table>
        </form>
      </div>
    )
  }
}
}
