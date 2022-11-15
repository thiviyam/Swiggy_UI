import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { cartno } from './DisplayMenu';

import './Welcome.css';
import DropDownUser from './DropDownUser';
import FullLogin from './FullLogin';
import CartHover from './CartHover';

export default class Welcome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: "",
      dropdown: false,
      userCart: [],
      showLogin: false,
      cartHover: false,
      userInfo: [],
      showAddr: true,
      showAcc: false,
      showHelp: false,
    };
  }

  componentDidMount() {
    let urls = [
      "http://localhost:8083/login/user",
      "http://localhost:8083/login/getCart",
      "http://localhost:8083/login/userInfo",
    ];

    axios.all(
      urls.map((url, i) => {
        if (i === 0) {
          axios.get(url).then((response) => {
            this.setState({ user: response.data });
          });
        } else if (i === 1) {
          axios.get(url).then((response) => {
            this.setState({ userCart: response.data });
          });
        } else if (i === 2) {
          axios.get(url).then((response) => {
            this.setState({ userInfo: response.data });
            console.log(response.data);
          });
        }
      })
    );
  }

  showDDown = () => {
    this.setState({ dropdown: true });
  };

  closeDDown = () => {
    this.setState({ dropdown: false });
  };

  addLoginPage = () => {
    this.setState({ showLogin: true });
  };

  showCart = () => {
    this.setState({ cartHover: true });
  };

  closeCart = () => {
    this.setState({ cartHover: false });
  };

  loginOrNot = () => {
    if (this.state.user == "") {
      window.location = "/welcome/signin";
    } else {
      window.location = "/welcome/addAddress";
    }
  };

  setShowAcc = () => {
    this.setState({ showAcc: true, showAddr: false, showHelp: false });
  };

  setShowHelp = () => {
    this.setState({ showAcc: false, showAddr: false, showHelp: true });
  };

  setShowAddr = () => {
    this.setState({ showAcc: false, showAddr: true, showHelp: false });
  };

  render() {
    if (this.props.render === "no") {
      return (
        <div id="welcome">
          <ul id="welcomeNav" type="none">
            <li className="welcomelist">
              {" "}
              <Link id="welcomeSwiggy" to="/user" onClick={this.setShowAddr}>
                SWIGGY
              </Link>{" "}
            </li>
            <li className="welcomelist welcomesecure">SECURE CHECKOUT</li>

            <div className="floatRightNavbar">
              <li className="welcomeHelp welcomelist welcomecartpage">
                <Link className="welcomelink" to="" onClick={this.setShowHelp}>
                  <span className="helpemoji">&spades;</span> &nbsp; Help
                </Link>
              </li>
              {this.state.user === "" ? (
                <li className="welcomeSign welcomelist floatRightNavbar">
                  {" "}
                  <Link className="welcomelink" to="/welcome/signin">
                    {" "}
                    <i class="fas fa-user-alt"></i> &nbsp; SignIn
                  </Link>{" "}
                </li>
              ) : (
                <li
                  className="welcomeSign welcomelist"
                  onMouseEnter={this.showDDown}
                  onMouseLeave={this.closeDDown}
                >
                  <Link
                    className="welcomelink"
                    to="/welcome/profile/orders"
                    onClick={this.setShowAcc}
                  >
                    <i class="fas fa-user-alt"></i> &nbsp; {this.state.user}
                  </Link>
                  {this.state.dropdown && (
                    <div className="dropdownfixcartpage">
                      <DropDownUser />
                    </div>
                  )}
                </li>
              )}
            </div>
          </ul>
        </div>
      );
    } else {
      return (
        <div id="welcome">
          <ul id="welcomeNav" type="none">
            <li className="welcomelist">
              <Link id="welcomeSwiggy" to="/user" onClick={this.setShowAddr}>
                SWIGGY
              </Link>{" "}
            </li>

            <li className="welcomelist">
              {this.state.showAddr && (
                <Link
                  to=""
                  onClick={this.loginOrNot}
                  className="welcomeaddresslnk"
                >
                  {this.state.userInfo.map((u) => {
                    return (
                      <span>
                        {u.address.length === 0 ? (
                          <>
                            <span className="welcomeaddress">Add Address</span>
                            <span className="welcomeaddAddressSpace"></span>
                          </>
                        ) : (
                          <span>
                            {u.address.map((userAddr) => {
                              if (userAddr.type == "Home") {
                                return (
                                  <span className="welcomeaddress0">
                                    <span className="welcomeaddress">
                                      {userAddr.type}
                                    </span>
                                    <span className="welcomeaddressno">
                                      {" "}
                                      {userAddr.plotNo}
                                      {", "}
                                      {userAddr.street}
                                      {" ..."}
                                      <span className="welcomeaddressdownarrow">
                                        &#x2304;
                                      </span>
                                    </span>
                                  </span>
                                );
                              }
                            })}
                          </span>
                        )}
                      </span>
                    );
                  })}
                </Link>
              )}

              {this.state.showAcc && (
                <span className="welcomelist welcomesecure">MY ACCOUNT</span>
              )}

              {this.state.showHelp && (
                <span className="welcomelist welcomesecure">HELP</span>
              )}
            </li>

            <div className="floatRightNavbar">
              <li className="welcomeSearch welcomelist">
                {" "}
                <Link
                  className="welcomelink"
                  to="/welcome/search"
                  onClick={this.setShowAddr}
                >
                  {" "}
                  <i class="fa fa-search"></i> &nbsp; Search
                </Link>{" "}
              </li>

              <li className="welcomeOffer welcomelist">
                {" "}
                <Link className="welcomelink" to="" onClick={this.addLoginPage}>
                  {" "}
                  &#37; &nbsp; Offer
                </Link>{" "}
              </li>

              <li className="welcomeHelp welcomelist">
                {" "}
                <Link className="welcomelink" to="" onClick={this.setShowHelp}>
                  {" "}
                  <span className="helpemoji">&spades;</span> &nbsp; Help
                </Link>{" "}
              </li>

              {this.state.user === "" ? (
                <li className="welcomeSign welcomelist">
                  {" "}
                  <Link className="welcomelink" to="/welcome/signin">
                    {" "}
                    <i class="fas fa-user-alt"></i> &nbsp; SignIn
                  </Link>{" "}
                </li>
              ) : (
                <li
                  className="welcomeSign welcomelist"
                  onMouseEnter={this.showDDown}
                  onMouseLeave={this.closeDDown}
                >
                  <Link
                    className="welcomelink"
                    to="/welcome/profile/orders"
                    onClick={this.setShowAcc}
                  >
                    <i class="fas fa-user-alt"></i> &nbsp;
                    {this.state.user}
                  </Link>
                  {this.state.dropdown && (
                    <div id="dropdownfix">
                      <DropDownUser />
                    </div>
                  )}
                </li>
              )}

              <li
                className="welcomeCart welcomelist"
                onMouseEnter={this.showCart}
                onMouseLeave={this.closeCart}
              >
                {" "}
                <Link className="welcomelink" to="/checkout/0">
                  {this.state.userCart.length == 0 ? (
                    <span>
                      <span>{this.state.userCart.length}</span> &nbsp; Cart
                    </span>
                  ) : (
                    <span id="welcomecartlengthh">
                      <span id="welcomecartlength">
                        {this.state.userCart.length}
                      </span>
                      &nbsp; Cart
                    </span>
                  )}
                </Link>
                {this.state.cartHover && (
                  <div className="carthoverBody">
                    <CartHover />
                  </div>
                )}
              </li>
            </div>
            {/* <cartno.Consumer>
            {(intoc) => {
              if (intoc === undefined || intoc.length === 0) {
                return (
                  <li className="welcomeCart welcomelist">
                    {" "}
                    <Link
                      className="welcomelink"
                      to="/checkout/0"
                      state={{
                        hotelid: this.props.id,
                        intocart: intoc,
                      }}
                    >
                      {this.state.userCart.length == 0 ? (
                        <span>{this.state.userCart.length} &nbsp; Cart</span>
                      ) : (
                        <span id="welcomecartlength">
                          {this.state.userCart.length} &nbsp; Cart
                        </span>
                      )}
                    </Link>{" "}
                  </li>
                );
              } else if (intoc.length > 0) {
                return (
                  <li className="welcomeCart welcomelist">
                    {" "}
                    <Link
                      className="welcomelink"
                      id="changecolorcartfull"
                      to={"/checkout/" + this.props.id}
                      state={{
                        hotelid: this.props.id,
                        intocart: intoc,
                      }}
                    >
                      {intoc.length} &nbsp; Cart
                    </Link>{" "}
                  </li>
                );
              }
            }}
          </cartno.Consumer> */}
          </ul>
        </div>
      );
    }
  }
}
