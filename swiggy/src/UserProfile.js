import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "./UserProfile.css";
import UserSideNav from "./UserSideNav";

export default class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: [],
      hotels: [],
    };
  }

  componentDidMount() {
    axios.get("http://localhost:8083/login/userInfo").then((response) => {
      this.setState({ user: response.data });
    });
  }

  render() {
    return (
      <div className="profilebody">
        {this.state.user.map((u) => (
          <div className="profileheading">
            <h1> {u.cname} </h1>
            <h4 className="miniinfo">
              {" "}
              {u.phoneNumber} . {u.email}{" "}
            </h4>
          </div>
        ))}

        <div className="profileheading profileSpacing">
          <Link className="profilelink" to="/welcome/profile/edit">
            EDIT PROFILE
          </Link>
        </div>

        <div className="profilesubbody">
          <UserSideNav />
        </div>
      </div>
    );
  }
}
