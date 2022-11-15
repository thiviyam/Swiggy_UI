import React, { Component } from "react";
import axios from "axios";

import "./DeliverAddress.css";

export default class DeliverAddress extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: [],
      addresses: [],
      displayAllAddr: true,
      deliverAddr: 0,
      deliverAddrVisible: false,
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

  addAddress = () => {
    window.location = "/checkout/addAddress";
  };

  deliverHere = (event) => {
    let addressId = event.target.id;
    this.setState({ deliverAddr: addressId });

    // this.state.addresses.map((addr) => {
    //   if (addr.id == addressId) {
    //     console.log(addr);
    //     this.setState({ deliverAddr: addr }, () => {
    //       console.log(this.state.deliverAddr);
    //     });
    //   }
    // });

    this.setState({ deliverAddrVisible: true, displayAllAddr: false });
  };

  displayAllAddrAgain = () => {
    this.setState({ deliverAddrVisible: false, displayAllAddr: true });
  };
  render() {
    return (
      <div className="DeliverAddressBody">
        {this.state.deliverAddrVisible && (
          <div className="DeliverAddressInnerBody cDeliverAddressInnerBody">
            <div className="DeliverAddressTitle">
              Delivery address
              <span className="tickmark">&#x2714;</span>
              <span
                onClick={this.displayAllAddrAgain}
                className="DeliverAddressChange"
              >
                CHANGE
              </span>
              <div className="cDeliverAddressAddBody">
                {this.state.addresses.map((addrr) => {
                  if (this.state.deliverAddr == addrr.id) {
                    return (
                      <div>
                        <div className="DeliverAddressType cDeliverAddressType">
                          {addrr.type}
                        </div>
                        <div className="DeliverAddressAdd cDeliverAddressAdd">
                          {addrr.plotNo}
                          {", "}
                          {addrr.street}
                          {", "}
                          {addrr.district}
                          {", "}
                          {addrr.state}
                          {", "}
                          {addrr.pincode}
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        )}

        {this.state.displayAllAddr && (
          <div className="DeliverAddressInnerBody">
            <div className="DeliverAddressTitle">Select delivery address</div>
            <div className="DeliverAddressSubTitle">
              You have a saved address in this location
            </div>

            <div className="DeliverAddressAddBody">
              {this.state.addresses.map((address) => {
                return (
                  <div className="DeliverAddressAddSubBody">
                    <span className="DeliverAddressemoji">
                      {address.type == "Home" && <span>&#127968;</span>}
                      {address.type == "Work" && <span>&#128188;</span>}
                      {address.type == "Other" && <span>&#127960;</span>}
                    </span>
                    <span className="DeliverAddressAddDetails">
                      <div className="DeliverAddressType">{address.type}</div>
                      <div className="DeliverAddressAdd">
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
                      <div className="DeliverAddressBtnArea">
                        <button
                          className="DeliverAddressBtn"
                          id={address.id}
                          onClick={this.deliverHere}
                        >
                          DELIVER HERE
                        </button>
                      </div>
                    </span>
                  </div>
                );
              })}
              <div className="DeliverAddressAddSubBody newAddr">
                <span className="DeliverAddressemoji">
                  <i class="fas fa-map-marked-alt"></i>
                </span>
                <span className="DeliverAddressAddDetails">
                  Add New Address
                  <div className="DeliverAddressBtnArea">
                    <button
                      className="DeliverAddressBtn"
                      onClick={this.addAddress}
                    >
                      ADD ADDRESS
                    </button>
                  </div>
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
