import React, { Component } from "react";
import axios from "axios";

import "./Addresses.css";

export default class Addresses extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: [],
      addresses: [],
    };
  }

  componentDidMount() {
    axios.get("http://localhost:8083/login/userInfo").then((response) => {
      if (response.data.length !== 0) {
        this.setState({ user: response.data });
        response.data.map((m) => {
          this.setState({ addresses: m.address });
        });
      }
    });
  }
  render() {
    return (
      <div className="addressBody">
        {this.state.addresses.length === 0 ? (
          <h2 className="addressEmpty"> There is no door to deliver Food </h2>
        ) : (
          <div className="addressHalfBody">
            <h2 className="addressTitle"> Manage Addresses </h2>
            <div className="addressHalfBody1">
              {this.state.addresses.map((address) => (
                <span className="addressBox">
                  <div className="addresshouse">
                    {address.type == "Home" && <span>&#127968;</span>}
                    {address.type == "Work" && <span>&#128188;</span>}
                    {address.type == "Other" && <span>&#127960;</span>}
                  </div>
                  <div className="addressdetails">
                    <div className="addresstype">{address.type}</div>
                    <div className="addressarea">
                      {address.plotNo}
                      {", "}
                      {address.street}
                      {", "}
                      {address.district}
                      {", "}
                      {address.state}
                      {", "}
                      {address.pincode}
                    </div>
                    <div className="addressfullbtn">
                      <span>
                        <button className="addressbtn addressbtnedit">
                          EDIT
                        </button>
                      </span>
                      <span>
                        <button className="addressbtn addressbtndelete">
                          DELETE
                        </button>
                      </span>
                    </div>
                  </div>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}
