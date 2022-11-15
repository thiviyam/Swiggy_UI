import React, { Component } from "react";
import axios from 'axios';
import "./UserAddress.css";

export default class UserAddress extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      type: "",
      plotNo: "",
      street: "",
      district: "",
      state: "",
      pincode: 0,
    };
  }

  addUserAddress = (event) => {
    event.preventDefault();
    let value = event.target.id;
    console.log(value);
    this.setState({ type: value }, () => {
      axios
        .post("http://localhost:8083/login/saveUserAddress", this.state)
        .then((response) => {
          console.log("did");
          window.location = "/user";
        });
    });
  };

  changeInplotNo = (event) => {
    this.setState({ plotNo: event.target.value });
  };

  changeInstreet = (event) => {
    this.setState({ street: event.target.value });
  };

  changeIndistrict = (event) => {
    this.setState({ district: event.target.value });
  };

  changeInstate = (event) => {
    this.setState({ state: event.target.value });
  };

  changeInpincode = (event) => {
    this.setState({ pincode: event.target.value });
  };

  crossMark = () => {
    // window.location = this.props.crossloc;
    window.history.back();
  };

  render() {
    return (
      <>
        <div id="UserAddressBody">
          <form>
            <span onClick={this.crossMark} className="UserAddCross">
              &#10005;
            </span>
            <h2 className="UserAddTitle"> Add Address </h2>
            <table id="table">
              <tbody>
                <tr>
                  <td>
                    <input
                      type="text"
                      name="plotNo"
                      placeholder="plot No"
                      onChange={this.changeInplotNo}
                      className="ip"
                    />
                  </td>
                </tr>

                <tr>
                  <td>
                    <input
                      type="text"
                      name="street"
                      placeholder="Street"
                      onChange={this.changeInstreet}
                      className="ip"
                    />
                  </td>
                </tr>

                <tr>
                  <td>
                    <input
                      type="text"
                      name="district"
                      placeholder="District"
                      onChange={this.changeIndistrict}
                      className="ip"
                    />
                  </td>
                </tr>

                <tr>
                  <td>
                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      onChange={this.changeInstate}
                      className="ip"
                    />
                  </td>
                </tr>

                <tr>
                  <td>
                    <input
                      type="numeric"
                      name="pincode"
                      placeholder="Pincode"
                      onChange={this.changeInpincode}
                      className="ip"
                    />
                  </td>
                </tr>

                <tr>
                  <td>
                    <input
                      type="button"
                      value="Home"
                      id="Home"
                      className="UserAddressbtn"
                      onClick={this.addUserAddress}
                    />
                    <input
                      type="button"
                      value="Work"
                      id="Work"
                      className="UserAddressbtn"
                      onClick={this.addUserAddress}
                    />
                    <input
                      type="button"
                      value="Other"
                      id="Other"
                      className="UserAddressbtn"
                      onClick={this.addUserAddress}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
        <div id="UserAddressSubBody" onClick={this.crossMark}></div>
      </>
    );
  }
}
