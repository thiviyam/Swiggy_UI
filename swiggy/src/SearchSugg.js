import React, { Component } from "react";
import axios from "axios";
import image from "./images/homefood.png";
import hotelImg from "./HotelImages";

import "./SearchSugg.css";

export default class SearchSugg extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: this.props.text,
      hotels: [],
    };
  }

  componentDidMount() {
    axios.get("http://localhost:8083/hotel/displayHotels").then((response) => {
      this.setState({ hotels: response.data });
    });
  }

  goToHotel = (event) => {
    let hotelId = event.target.id;
    window.location = "/welcome/profile/displayMenu/" + hotelId;
  };

  goToHotelThroughMenuId = (event) => {
    let menuId = event.target.id;
    console.log(menuId);

    this.state.hotels.map((hotel) => {
      let i;
      if (i) {
        return;
      }
      i = false;
      hotel.menu.map((m) => {
        if (m.id == menuId) {
          window.location = "/welcome/profile/displayMenu/" + hotel.id;
          i = true;
          return;
        }
      });
    });
  };

  render() {
    return (
      <div className="suggBox">
        {this.props.hotelSuggestion.map((hotel) => {
          return (
            <>
              <ul type="none" className="suggul">
                <li className="suggopt" onClick={this.goToHotel} id={hotel.id}>

                  {hotelImg.map((image) => {
                    let formedName = "H" + hotel.id;
                    if (formedName == image.name) {
                      return (
                        <img
                          src={image.imgg}
                          className="suggimg"
                          id={hotel.id}
                        />
                      );
                    }
                  })}
                  
                  <div className="suggcol2" id={hotel.id}>
                    <div className="suggname" id={hotel.id}>
                      {hotel.hotelname}
                    </div>
                    <div className="suggtype" id={hotel.id}>
                      Restaurant
                    </div>
                  </div>

                </li>
              </ul>
            </>
          );
        })}

        {this.props.menuSuggestion.map((menu) => {
          return (
            <>
              <ul type="none" className="suggul">
                <li
                  className="suggopt"
                  onClick={this.goToHotelThroughMenuId}
                  id={menu.id}
                >
                  <img src={image} id={menu.id} className="suggimg"></img>
                  <div id={menu.id} className="suggcol2">
                    <div id={menu.id} className="suggname">
                      {menu.menuName}
                    </div>
                    <div id={menu.id} className="suggtype">
                      Dish
                    </div>
                  </div>
                </li>
              </ul>
            </>
          );
        })}
      </div>
    );
  }
}
