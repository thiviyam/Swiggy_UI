import React, { Component } from "react";
import axios from "axios";
import image from "./images/homefood.png";
import hotelImg from "./HotelImages";

import "./AddHotel.css";
import QuickViewHover from "./QuickViewHover";

export default class AddHotel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hotelname: "Seaking",
      cusines: ["Ice-Creams", "Fruit juices"],
      ratings: 5,
      menu: [
        { menuName: "Cloud Nine", price: 253, type: "Veg" },
        { menuName: "Tutti Fruite", price: 195, type: "Veg" },
        { menuName: "Grape Juice with pulp", price: 138, type: "Veg" },
        { menuName: "Bulebeery Falooda", price: 252, type: "Veg" },
        { menuName: "Choco Factory", price: 181, type: "Veg" },
        { menuName: "Waffel Bridge", price: 141, type: "Veg" },
        { menuName: "Pink Mountain", price: 221, type: "Non-Veg" },
        { menuName: "Family Pack", price: 381, type: "Veg" },
      ],
      hotels: [],
      showQuickHover: false,
    };
  }

  submit = () => {
    axios
      .post("http://localhost:8083/hotel/addHotel", this.state)
      .then((response) => {
        console.log(this.state);
      });
  };

  componentDidMount() {
    axios.get("http://localhost:8083/hotel/displayHotels").then((response) => {
      this.setState({ hotels: response.data });
      console.log(response.data);
    });
  }

  orderByRatings = () => {
    axios
      .get("http://localhost:8083/hotel/getHotelsByRatings")
      .then((response) => {
        this.setState({ hotels: response.data });
        console.log(response.data);
      });
  };

  orderByCostLtoH = () => {
    axios
      .get("http://localhost:8083/hotel/getHotelsByCostLowToHigh")
      .then((response) => {
        this.setState({ hotels: response.data });
        console.log(response.data);
      });
  };

  orderByCostHtoL = () => {
    axios
      .get("http://localhost:8083/hotel/getHotelsByCostHighToLow")
      .then((response) => {
        this.setState({ hotels: response.data });
        console.log(response.data);
      });
  };

  visibleQuickView = (event) => {
    this.setState({ quickView: true });
    let hid = event.target.id;

    let quickViewArea = document.getElementById("quickView" + hid);
    quickViewArea.style.display = "inline";
  };

  dontVisibleQuickView = (event) => {
    this.setState({ quickView: false });
    let hid = event.target.id;

    let quickViewArea = document.getElementById("quickView" + hid);
    quickViewArea.style.display = "none";
  };

  quickHover = (event) => {
    if (this.state.showQuickHover) {
      this.setState({ showQuickHover: false });
    } else {
      this.setState({ showQuickHover: true });
    }
  };

  addNav2 = () => {
    let navBar = document.getElementById("hotelSecondNavBar");
    let sticky = navBar.offsetTop;

    if (window.pageYOffset >= sticky) {
      navBar.classList.add("stickyNav2");
    } else {
      navBar.classList.remove("stickyNav2");
    }
  };

  render() {
    return (
      <div className="hotels" onScroll={this.addNav2}>
        <div className="hotelSecondNavBar" id="hotelSecondNavBar">
          <div className="HSNBnOfRes">
            {this.state.hotels.length} Restaurants
          </div>
          <div className="HSNBListArea">
            <ul type="none" className="HSNBul">
              <li
                className="HSNlist HSNBrelevance"
                onClick={() => this.componentDidMount()}
              >
                Relevance
              </li>
              <li className="HSNlist HSNBdelivery">Delivery Time</li>
              <li className="HSNlist HSNBrating" onClick={this.orderByRatings}>
                Rating
              </li>
              <li
                className="HSNlist HSNBcostLtoH"
                onClick={this.orderByCostLtoH}
              >
                Cost: Low To High
              </li>
              <li
                className="HSNlist HSNBcostHtoL"
                onClick={this.orderByCostHtoL}
              >
                Cost: High To Low
              </li>
              <li className="HSNlist HSNBfilter">Filters</li>
            </ul>
          </div>
        </div>
        <div className="hotelAll">
          {this.state.hotels.map((h, i) => {
            return (
              <span
                className="hotelBox"
                id={h.id}
                onClick={() => {
                  window.location = "/welcome/profile/displayMenu/" + h.id;
                }}
                onMouseOver={this.visibleQuickView}
                onMouseLeave={this.dontVisibleQuickView}
              >
                {hotelImg.map((image) => {
                  let formedName = "H" + h.id;
                  if (formedName == image.name) {
                    return (
                      <img src={image.imgg} id={h.id} className="hotelimage" />
                    );
                  }
                })}

                <h4 id={h.id} className="hotelname">
                  {h.hotelname}
                </h4>
                {h.cusines.map((c) => (
                  <span id={h.id} className="hotelcusine">
                    {" "}
                    {c},{" "}
                  </span>
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

                <div className="quickViewArea" id={"quickView" + h.id}>
                  <hr className="quickViewAreaDivisionLine" />
                  <div>
                    <span
                      className="hotelQuickView"
                      onMouseOver={this.quickHover}
                      onMouseLeave={this.quickHover}
                    >
                      QUICK VIEW
                    </span>
                    {this.state.showQuickHover && (
                      <div className="quickViewAreaHover">
                        <QuickViewHover menus={h.menu} />
                      </div>
                    )}
                  </div>
                </div>
              </span>
            );
          })}
          {/* <div>
          <button onClick={this.submit}>click</button>
        </div> */}
        </div>
      </div>
    );
  }
}
