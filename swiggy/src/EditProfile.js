import React, { Component } from 'react';
import axios from 'axios';
// import {Link } from "react-router-dom";

import './EditProfile.css'

export default class EditProfile extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         user: [],
         updatePh: false,
         updateEmail: false,
         updatePwd: false,
         changingAttr: "",
         updatePhSuccess: false,
         updateEmailSuccess: false,
         updatePwdSuccess: false
      }

      this.update = {
         
      }
    }

    componentDidMount(){
        axios.get("http://localhost:8083/login/userInfo")
        .then(response => {
            this.setState( {user: response.data} )
        })
    }

    crossMark = () =>{
        window.location = "/welcome/profile";
    }

    changePhoneNumber = () =>{
        this.setState( {
            updatePh: true,
            updateEmail: false,
            updatePwd: false,
            updatePhSuccess: false,
            updateEmailSuccess: false,
            updatePwdSuccess: false
        } )
    }

    changeEmail = () =>{
        this.setState( {
            updatePh: false,
            updateEmail: true,
            updatePwd: false,
            updatePhSuccess: false,
            updateEmailSuccess: false,
            updatePwdSuccess: false
        } )
    }

    changePassword = () =>{
        this.setState( {
            updatePh: false,
            updateEmail: false,
            updatePwd: true,
            updatePhSuccess: false,
            updateEmailSuccess: false,
            updatePwdSuccess: false
        } )
    }

    updateInPh =(event) =>{
        let users = this.state.user;
        users.map( (us) => {
            us.phoneNumber = event.target.value;
        } )

        this.setState({
            user: users,
            changingAttr: "phone"})
    }

    updateInemail =(event) =>{
        let users = this.state.user;
        users.map( (us) => {
            us.email = event.target.value;
        } )

        this.setState({
            user: users,
            changingAttr: "email"})
    }

    updateInpwd =(event) =>{
        let users = this.state.user;
        users.map( (us) => {
            us.password = event.target.value;
        } )

        this.setState({
            user: users,
            changingAttr: "pwd"})
    }

    updateattribute = (event) =>{
        event.preventDefault();
        this.state.user.map( (u) =>{
        
        axios.post("http://localhost:8083/login/update", u)
        .then(response =>{

        if(response.data === "yes"){

            console.log("updated");
            let unkn = this.state.changingAttr;
            if(unkn === "phone"){
                this.setState( {
                    updatePhSuccess: true,
                    updatePh: null,
                    updateEmail: false,
                    updatePwd: false} )

            }else if(unkn === "email"){
                this.setState( {
                    updateEmailSuccess: true,
                    updatePh: false,
                    updateEmail: null,
                    updatePwd: false} )

            }else if(unkn === "pwd"){
                this.setState( {
                    updatePwdSuccess: true,
                    updatePh: false,
                    updateEmail: false,
                    updatePwd: null} )
            }
        }
        })

        } )
    }

  render() {
    return (
      <>
        <div id="editBody">
          <span onClick={this.crossMark} className="cross">
            &#10005;
          </span>
          <span className="editTitle"> Edit Profile </span>

          <form onSubmit={this.updateattribute} className="editform">
            <table className="edittable">
              <tbody>
                <tr>
                  <td className="editLabel"> Phone Number </td>
                </tr>

                {this.state.user.map((u) => (
                  <>
                    <tr>
                      {this.state.updatePh === false && (
                        <>
                          <td className="editdetail"> {u.phoneNumber} </td>
                          <td
                            className="editchange"
                            onClick={this.changePhoneNumber}
                          >
                            {" "}
                            CHANGE{" "}
                          </td>
                        </>
                      )}
                      {this.state.updatePh === true && (
                        <td>
                          <input
                            type="text"
                            name="phoneNo"
                            placeholder="Phone Number"
                            value={u.phoneNumber}
                            onChange={this.updateInPh}
                            className="editip"
                          />
                          <input
                            type="submit"
                            data-name="phone"
                            value="VERIFY"
                            id="phone"
                            className="editbtn"
                          />
                        </td>
                      )}
                      {this.state.updatePhSuccess && (
                        <>
                          <td className="updsc">
                            {" "}
                            <span className="udsc">Update Successful</span>
                            <br />
                            <span className="udele">
                              Your PhoneNumber has been updated successfully
                            </span>
                          </td>
                        </>
                      )}
                    </tr>
                    <hr />
                    <tr>
                      <td className="editLabel"> Email id </td>
                    </tr>

                    <tr>
                      {this.state.updateEmail === false && (
                        <>
                          <td className="editdetail"> {u.email} </td>
                          <td className="editchange" onClick={this.changeEmail}>
                            {" "}
                            CHANGE{" "}
                          </td>
                        </>
                      )}
                      {this.state.updateEmail === true && (
                        <td>
                          <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={u.email}
                            onChange={this.updateInemail}
                            className="editip"
                          />
                          <input
                            type="submit"
                            data-name="email"
                            value="UPDATE Email"
                            id="email"
                            className="editbtn"
                          />
                        </td>
                      )}
                      {this.state.updateEmailSuccess && (
                        <>
                          <td>
                            {" "}
                            <span className="udsc">Update Successful</span>
                            <br />
                            <span className="udele">
                              Your Email has been updated successfully
                            </span>
                          </td>
                        </>
                      )}
                    </tr>
                    <hr />
                    <tr>
                      <td className="editLabel"> Password </td>
                    </tr>
                    <tr>
                      {this.state.updatePwd === false && (
                        <>
                          <td className="editdetail editpwd"> ...... </td>
                          <td
                            className="editchange"
                            onClick={this.changePassword}
                          >
                            {" "}
                            CHANGE{" "}
                          </td>
                        </>
                      )}
                      {this.state.updatePwd === true && (
                        <td>
                          <input
                            type="password"
                            name="password"
                            placeholder="New Password"
                            onChange={this.updateInpwd}
                            className="editip"
                          />
                          <input
                            type="password"
                            name="password"
                            placeholder="Re-write Password"
                            className="editip"
                          />
                          <input
                            type="submit"
                            data-name="pwd"
                            value="UPDATE Password"
                            id="pwd"
                            className="editbtn"
                          />
                        </td>
                      )}
                      {this.state.updatePwdSuccess && (
                        <>
                          <td>
                            {" "}
                            <span className="udsc">Update Successful</span>
                            <br />
                            <span className="udele">
                              Your password has been updated successfully
                            </span>
                          </td>
                        </>
                      )}
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </form>
        </div>
        <div id="EditProfileSubBody" onClick={this.crossMark}></div>
      </>
    );
  }
}
