import React, { Component } from "react";
import axios from "axios";
import veglogo from "./images/veglogo.png";
import nonveglogo from "./images/nonveg.png";
import food from "./images/homefood.png";
import { Link } from "react-router-dom";
import hotelImg from "./HotelImages";

import "./CartHover.css";

export default class CartHover extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cartItems: [],
      hotels: [],
      hotelid: 0,
      subTotal: 0,
    };
  }
  componentDidMount() {
    let urls = [
      "http://localhost:8083/cart/getCartItem",
      "http://localhost:8083/hotel/displayHotels",
    ];

    axios.all(
      urls.map((url, i) => {
        axios.get(url).then((response) => {
          if (i === 0) {
            if (response.data.length !== 0) {
              this.setState({ cartItems: response.data }, () => {
                let hotelid = this.state.cartItems[0].hid;
                this.setState({ hotelid: hotelid });

                let sum = 0;
                this.state.cartItems.map((m) => {
                  sum += m.cartitem.price * m.quantity;
                });

                this.setState({ subTotal: sum });
              });
              console.log(response.data);
            }
          } else if (i === 1) {
            if (response.data.length !== 0) {
              this.setState({ hotels: response.data });
              console.log(response.data);
            }
          }
        });
      })
    );
  }

  render() {
    if (this.state.cartItems.length === 0) {
      return (
        <div className="CartHoverBody">
          <h1 className="CartHoverEmptyTitle">Cart Empty</h1>
          <div className="CartHoverEmptyBdy">
            Good food is always cooking! Go ahead, order some yummy items from
            the menu.
          </div>
        </div>
      );
    } else {
      return (
        <div className="CartHoverBody">
          <div>
            {this.state.hotels.map((hotel) => {
              if (hotel.id == this.state.hotelid) {
                return (
                  <div className="cartHtitle">
                    
                    {hotelImg.map((image) => {
                      let formedName = "H" + hotel.id;
                      if (formedName == image.name) {
                        return (
                          <img
                            src={image.imgg}
                            id={hotel.id}
                            className="cartHimg"
                          />
                        );
                      }
                    })}
                    
                    <div className="cartHtitle2">
                      <div className="cartHhotelname">{hotel.hotelname} </div>
                      <div className="cartHimghotelplace">Thiruvermbur</div>
                      <div>
                        <Link
                          className="cartHfullmenu"
                          to={"/welcome/profile/displayMenu/" + hotel.id}
                        >
                          {" "}
                          VIEW FULL MENU{" "}
                        </Link>{" "}
                      </div>
                    </div>
                  </div>
                );
              }
            })}
            <hr />
            {this.state.cartItems.map((cart) => {
              return (
                <div className="itemsrow">
                  {cart.cartitem.type === "Veg" ? (
                    <img className="cveglogo" src={veglogo} />
                  ) : (
                    <img className="cnonveglogo" src={nonveglogo} />
                  )}

                  <span className="cmenuname cartHmenuname">
                    {" "}
                    {cart.cartitem.menuName} x {cart.quantity}
                  </span>
                  <span className="cmenuprice cartHmenuprice">
                    {" "}
                    &#8377;{cart.cartitem.price * cart.quantity}
                  </span>
                </div>
              );
            })}
            <hr />
            <div className="cartHtotalarea">
              <span className="cartHtotal">Sub total</span>
              <span className="cartHtotalprice">
                {" "}
                &#8377;{this.state.subTotal}
              </span>
              <div className="cartHtotalextra"> Extra charges may apply </div>
            </div>

            <div className="checkout cartHcheckout">
              <Link to="/checkout" className="cartcheckout cartHcheckout">
                CHECKOUT &#8594;
              </Link>
            </div>
          </div>
        </div>
      );
    }
  }
}
