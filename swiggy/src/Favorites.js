import React, { Component } from "react";
import axios from "axios";
import image from "./images/homefood.png";
import hotelImg from "./HotelImages";

import "./Favorites.css";

export default class Favorites extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userDetails: [],
      userFav: [],
      hotels: [],
    };
  }
  componentDidMount() {
    let urls = [
      "http://localhost:8083/login/getUserFav",
      "http://localhost:8083/hotel/displayHotels",
    ];

    axios.all(
      urls.map((url, i) => {
        axios.get(url).then((response) => {
          let responseData = response.data;

          if (i === 0) {
            this.setState(
              {
                userDetails: response.data,
                userFav: responseData[0].fav,
              });
            console.log(response.data);
          }

          if (i === 1) {
            this.setState({
              hotels: response.data,
            });
            console.log(response.data);
          }
        });
      })
    );
  }
  render() {
    return (
      <div className="favBody">
        <h3 className="ordertitle"> Favorites </h3>

        <div className="favSubBody">
          {this.state.userFav.map((fav, i) => {
            return (
              <div className="favHotels">
                {this.state.hotels.map((h) => {
                  if (h.id == fav.hotelId) {
                    return (
                      <div>
                        <span
                          className="hotelBox"
                          onClick={() => {
                            window.location =
                              "/welcome/profile/displayMenu/" + h.id;
                          }}
                        >
                          {hotelImg.map((image) => {
                            let formedName = "H" + h.id;
                            if (formedName == image.name) {
                              return (
                                <img src={image.imgg} className="hotelimage" />
                              );
                            }
                          })}

                          <h4 className="hotelname"> {h.hotelname} </h4>

                          {h.cusines.map((c) => (
                            <span className="hotelcusine"> {c}, </span>
                          ))}

                          <div className="hotelBoxRatingArea">
                            <span>
                              {parseInt(h.ratings) < 4 ? (
                                <h5 className="hotelratings hotelratingsbad">
                                  &#9733; {h.ratings}
                                </h5>
                              ) : (
                                <h5 className="hotelratings hotelratingsgood">
                                  &#9733; {h.ratings}
                                </h5>
                              )}
                            </span>
                            <span className="hotelDot">
                              {"   "}.{"   "}
                            </span>
                            <span className="hotelServing hotelDistance">
                              30 MINS &nbsp; &nbsp; &nbsp; &nbsp;
                            </span>

                            <span className="hotelDot">
                              {"   "}.{"   "}
                            </span>
                            <span className="hotelServing">
                              &#8377;{h.servings} FOR TWO
                            </span>
                          </div>
                        </span>
                      </div>
                    );
                  }
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
