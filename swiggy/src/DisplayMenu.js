import React, { Component, createContext, useRef, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import food from "./images/homefood.png";
import veglogo from "./images/veglogo.png";
import nonveglogo from "./images/nonveg.png";
import hotelImg from "./HotelImages";

import "./DisplayMenu.css";
import Welcome from "./Welcome";
import FullLogin from "./FullLogin";
import QuantityBox from "./QuantityBox";
import HomeBanner from "./HomeBanner";

const cartno = createContext();
export { cartno };
export default class DisplayMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      changeNavBar: false,
      user: "",
      hotels: [],
      hotelIdInCart: 0,
      vegChecked: false,
      displayVegMenu: false,
      searchForDish: false,
      menuSuggestion: [],
      userDetails: [],
      userFav: [],
      searchIpText: "",
      id: 0,
      intoCart: [],
      cartTotal: 0,
      inc: 0,
      cart: {
        hid: 0,
        cartitem: {},
        quantity: 1,
      },
      updateCart: {
        menuid: 0,
        quantity: 0,
      },
      dbCartId: [],
      cartItemFromDb: {},
      cartItemFromDB: [],
      iteration: 0,
      showLogin: false, //not in use
    };
  }

  display = () => {
    this.setState({ menus: this.props.menu });
  };

  componentDidMount() {
    let urls = [
      "http://localhost:8083/hotel/displayHotels",
      "http://localhost:8083/login/getCart",
      "http://localhost:8083/login/user",
      "http://localhost:8083/login/getUserFav",
    ];

    axios.all(
      urls.map((url, i) => {
        if (i === 0) {
          axios.get(url).then((response) => {
            this.setState({ hotels: response.data });

            let url = window.location.pathname;
            let arr = url.split("/");
            this.setState({
              id: arr[arr.length - 1],
              cart: {
                ...this.state.cart,
                hid: arr[arr.length - 1],
              },
            });
          });
        } else if (i === 1) {
          axios.get(url).then((response) => {
            let responseData = response.data;
            let hotelIdFromCart = responseData[0].hid;

            let tempCart = [];

            responseData.map((m) => {
              tempCart.push(m.cartitem);
            });
            this.setState({
              cartItemFromDB: responseData,
              intoCart: tempCart,
              hotelIdInCart: hotelIdFromCart,
            });

            let sum = 0;
            this.state.intoCart.map((m) => {
              sum += m.price;
            });

            this.setState({ cartTotal: sum });
            console.log(this.state.intoCart);
          });
        } else if (i === 2) {
          axios.get(url).then((response) => {
            this.setState({ user: response.data });
          });
        } else if (i === 3) {
          axios.get(url).then((response) => {
            let responseData = response.data;

            this.setState({
              userDetails: response.data,
              userFav: responseData[0].fav,
            });
          });
        }
      })
    );

    // window.scroll(()=>{
    //    console.log("scrolling");
    // });
    window.addEventListener("scrollY", () => {
      if (window.scrollY >= 2) {
        this.setState({ changeNavBar: true });
      } else {
        this.setState({ changeNavBar: false });
      }
    });
  }

  componentDidUpdate() {
    window.addEventListener("scrollY", () => {
      if (window.scrollY >= 2) {
        console.log("scrolling");
        this.setState({ changeNavBar: true });
      } else {
        this.setState({ changeNavBar: false });
      }
    });
  }

  axiosPostIntoDbCart = () => {
    axios
      .post("http://localhost:8083/login/addToCart", this.state.cart)
      .then((response) => {
        this.state.dbCartId.push(response.data);
        console.log("added");
      });
  };

  axiosGetFromDbCart = (menuid) => {
    axios
      .get("http://localhost:8083/cart/getcartItem/" + menuid)
      .then((response) => {
        let responseData = response.data;
        // this.state.cartItemFromDb = response.data;
        this.setState({ cartItemFromDb: responseData });
        console.log(this.state.cartItemFromDb);
        console.log("got data");
        console.log(response.data);
      });
  };

  axiosupdateDbCart = () => {
    axios
      .post("http://localhost:8083/login/updateToCart", this.state.updateCart)
      .then((responsee) => {
        console.log("updated");
      });
  };

  axiosDeleteDbCart = (menuid) => {
    axios
      .delete("http://localhost:8083/cart/delete/" + menuid)
      .then((response) => {
        console.log("deleted");
      });
  };

  colorHeart = (event, hOtelId) => {
    event.target.classList.toggle("colorTheHeart");

    if (event.target.classList.contains("colorTheHeart")) {

        const toSendObj = {
          hotelId: hOtelId,
        };
        axios
          .post("http://localhost:8083/login/addUserFavRestaurent", toSendObj)
          .then((response) => {});

    }else {

        axios
          .delete("http://localhost:8083/login/userFavRestaurentNolongerFavAnymore/" + hOtelId )
          .then((response) => {});

    }

  };

  vegCheckedd = (event) => {
    if (this.state.vegChecked) {
      this.setState({ vegChecked: false, displayVegMenu: false });
    } else {
      this.setState({ vegChecked: true, displayVegMenu: true });
    }
  };

  searchIp = (event) => {
    if (event.target.value == "") {
      this.setState({
        searchIpText: event.target.value,
        searchForDish: false,
        vegChecked: false,
        displayVegMenu: false,
      });
    } else {
      this.setState({
        searchIpText: event.target.value,
        searchForDish: true,
        vegChecked: false,
        displayVegMenu: false,
      });
    }

    let urls = ["http://localhost:8083/search/menuSugginsideHotel"];
    let tarval = event.target.value;
    let hID = event.target.id;
    let obj = { tarvalu: tarval, hotelID: hID };

    axios.all(
      urls.map((url, i) => {
        axios.post(url, obj).then((response) => {
          if (i === 0) {
            this.setState({ menuSuggestion: response.data }, () => {
              console.log(this.state.menuSuggestion);
            });
            // console.log(response.data);
          }
        });
      })
    );
  };

  add = (e, m) => {
    window.location.reload();
    if (this.state.user === "") {
      window.location = "/welcome/signin";
    } else if (
      this.state.id == this.state.hotelIdInCart ||
      this.state.hotelIdInCart == 0
    ) {
      this.state.intoCart.push(m);
      let sum = 0;

      this.state.intoCart.map((m, i) => {
        sum += m.price;
      });

      this.setState({ cartTotal: sum });

      ////////// going into axios post --> server

      this.state.cart.cartitem = m;
      this.setState({
        cart: {
          ...this.state.cart,
          cartitem: m,
        },
      });

      this.axiosPostIntoDbCart();

      ////////////// replacing add button --> quantity button

      let ele = e.target;
      let eleid = ele.id;
      ele.remove();

      let pele = document.getElementById("additems" + eleid);

      let newele = document.createElement("span");

      let newcele1 = document.createElement("span");
      newcele1.textContent = "-";
      newcele1.className = "spandecr";
      newcele1.id = eleid;

      let txt = document.createElement("span");
      txt.textContent = "1";
      txt.id = "numberspace" + eleid;
      txt.className = "spantext";

      let newcele2 = document.createElement("span");
      newcele2.textContent = "+";
      newcele2.className = "spanincr";

      newele.appendChild(newcele1);
      newele.appendChild(txt);
      newele.appendChild(newcele2);
      newele.className = "spanaddingbody";

      newcele1.addEventListener("click", (el) => {
        let s = document.getElementById("numberspace" + eleid).textContent;
        let subb = parseInt(s);
        subb = subb - 1;

        let elid = el.target;

        if (subb <= 0) {
          let superparent = document.getElementById("additems" + elid.id);

          let neweleadd = document.createElement("div");
          neweleadd.className = "addlink";
          neweleadd.id = elid.id;
          neweleadd.textContent = "ADD";

          superparent.innerHTML = "";
          superparent.appendChild(neweleadd);

          const newCart = this.state.intoCart.filter(
            (element) => element.id != elid.id
          );
          this.setState({ intoCart: newCart });

          this.axiosDeleteDbCart(elid.id);
        } else {
          document.getElementById("numberspace" + eleid).textContent = subb;

          // this.setState( {
          // cartItemFromDb : {
          //     ...this.state.cartItemFromDb,
          //     quantity : subb
          // }
          // } );

          this.setState(
            {
              updateCart: {
                ...this.state.updateCart,
                menuid: eleid,
                quantity: subb,
              },
            },
            () => this.axiosupdateDbCart()
          );
        }
      });

      newcele2.addEventListener("click", () => {
        let s = document.getElementById("numberspace" + eleid).textContent;
        let adding = parseInt(s);
        adding = adding + 1;
        document.getElementById("numberspace" + eleid).textContent = adding;

        this.setState(
          {
            updateCart: {
              ...this.state.updateCart,
              menuid: eleid,
              quantity: adding,
            },
          },
          () => this.axiosupdateDbCart()
        );
      });

      pele.appendChild(newele);
    } else {
      window.location = "/cart/clear/" + this.state.id;
    }
  };

  render() {
    let ii = 0;
    let favtoggle = 0;
    return (
      <div>
        <cartno.Provider value={this.state.intoCart}>
          <Welcome id={this.state.id} />
        </cartno.Provider>

        <div className="menubody">
          {this.state.hotels.map((hotel) => {
            if (hotel.id == this.state.id) {
              return (
                <>
                  <div
                    className={
                      this.state.changeNavBar
                        ? "alternatemenuhotel"
                        : "menuhotel"
                    }
                  >
                    <span>
                      {hotelImg.map((image) => {
                        let formedName = "H" + hotel.id;
                        if (formedName == image.name) {
                          return <img src={image.imgg} className="hotelimg" />;
                        }
                      })}
                    </span>

                    <span className="menuhotelname"> {hotel.hotelname} </span>
                    <div>
                      {hotel.cusines.map((c, i) => {
                        if (i === hotel.cusines.length - 1) {
                          return <span className="menucusines"> {c} </span>;
                        } else {
                          return <span className="menucusines"> {c}, </span>;
                        }
                      })}

                      <div className="menuratingArea">
                        <span className="menuhotelratings">
                          <div className="menuratingAreaRow1">
                            &#9733; {hotel.ratings}
                          </div>
                          <div className="menuratingAreaRow2">50+ Ratings</div>
                        </span>

                        {/* <span className="menuhotelBar">
                          {"   "}|{"   "}
                        </span> */}

                        <span className="menuhotelDistance">
                          <div className="menuratingAreaRow1">30 MINS</div>
                          <div className="menuratingAreaRow2">
                            Delivery Time
                          </div>
                        </span>

                        {/* <span className="menuhotelBar">
                          {"   "}|{"   "}
                        </span> */}

                        <span className="menuhotelServing">
                          <div className="menuratingAreaRow1">
                            &#8377;{hotel.servings}
                          </div>
                          <div className="menuratingAreaRow2">Cost for two</div>
                        </span>
                      </div>

                      <div className="menurowlast">
                        <span className="menusearch">
                          <i class="fa fa-search"></i> &nbsp;
                          <input
                            type="text"
                            placeholder="Search for dishes..."
                            className="menusearchip"
                            id={hotel.id}
                            onChange={this.searchIp}
                          />
                        </span>

                        <span
                          className="menuvegonly"
                          onClick={this.vegCheckedd}
                          id={this.state.vegChecked ? "vegchecked" : ""}
                        >
                          <input
                            type="checkbox"
                            className="menuvegonlycheckbox"
                            id="menuvegonlycheckbox"
                            checked={this.state.vegChecked}
                            onChange={this.vegCheckedd}
                            onClick={this.vegCheckedd}
                          />
                          Veg Only
                        </span>

                        {this.state.userFav.map((fav, i) => {
                          if (fav.hotelId == hotel.id) {
                            favtoggle = 1;
                            return (
                              <span
                                className="menufavo colorTheHeart"
                                onClick={(event) =>
                                  this.colorHeart(event, hotel.id)
                                }
                              >
                                &#x2764; Favourite
                                {/* <span className="menufavoheart">&#x2764;</span>
                                <span id="fav">Favourited</span> */}
                              </span>
                            );
                          }
                        })}
                        {favtoggle === 0 ? (
                          <span
                            className="menufavo"
                            onClick={(event) =>
                              this.colorHeart(event, hotel.id)
                            }
                          >
                            &#x2764; Favourite
                          </span>
                        ) : (
                          <div className="dontShow">{(favtoggle = 0)}</div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="menubody2">
                    <div className="menumenu">
                      {hotel.menu.map((m) => (
                        <>
                          {this.state.displayVegMenu ? (
                            <>
                              {m.type === "Veg" ? (
                                <div className="onemenu">
                                  <div className="menudetails">
                                    {m.type === "Veg" ? (
                                      <img className="veglogo" src={veglogo} />
                                    ) : (
                                      <img
                                        className="nonveglogo"
                                        src={nonveglogo}
                                      />
                                    )}
                                    <div className="menuname">{m.menuName}</div>
                                    <div className="menuprice">
                                      &#8377;{m.price}
                                    </div>
                                  </div>
                                  <div className="menuimg">
                                    <div>
                                      <img src={food} className="mmenuimg" />
                                    </div>
                                    <div id={"additems" + m.id}>
                                      {this.state.cartItemFromDB[0].hid ==
                                      hotel.id ? (
                                        <div>
                                          {this.state.intoCart.map((c, i) => {
                                            if (c.id == m.id) {
                                              ii = 1;
                                              console.log(ii);
                                              return (
                                                <div className="addlink addlinkNew">
                                                  <QuantityBox
                                                    quantity={
                                                      this.state.cartItemFromDB[
                                                        i
                                                      ].quantity
                                                    }
                                                    id={m.id}
                                                  />
                                                </div>
                                              );
                                            }
                                          })}
                                          {ii != 1 ? (
                                            <div
                                              className="addlink"
                                              id={m.id}
                                              onClick={(e) => this.add(e, m)}
                                            >
                                              ADD
                                            </div>
                                          ) : (
                                            <div className="dontShow">
                                              {(ii = 0)}
                                            </div>
                                          )}
                                        </div>
                                      ) : (
                                        <div
                                          className="addlink"
                                          id={m.id}
                                          onClick={(e) => this.add(e, m)}
                                        >
                                          ADD
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  <hr className="menudivision" />
                                </div>
                              ) : (
                                ""
                              )}
                            </>
                          ) : this.state.searchForDish ? (
                            <>
                              {this.state.menuSuggestion.map((sm) => {
                                if (sm.id == m.id) {
                                  return (
                                    <>
                                      <div className="onemenu">
                                        <div className="menudetails">
                                          {sm.type === "Veg" ? (
                                            <img
                                              className="veglogo"
                                              src={veglogo}
                                            />
                                          ) : (
                                            <img
                                              className="nonveglogo"
                                              src={nonveglogo}
                                            />
                                          )}
                                          <div className="menuname">
                                            {" "}
                                            {sm.menuName}{" "}
                                          </div>
                                          <div className="menuprice">
                                            {" "}
                                            &#8377;{sm.price}{" "}
                                          </div>
                                        </div>
                                        <div className="menuimg">
                                          <div>
                                            {" "}
                                            <img
                                              src={food}
                                              className="mmenuimg"
                                            />{" "}
                                          </div>
                                          <div id={"additems" + sm.id}>
                                            {this.state.cartItemFromDB[0].hid ==
                                            hotel.id ? (
                                              <div>
                                                {this.state.intoCart.map(
                                                  (c, i) => {
                                                    if (c.id == m.id) {
                                                      ii = 1;
                                                      console.log(ii);
                                                      return (
                                                        <div className="addlink addlinkNew">
                                                          <QuantityBox
                                                            quantity={
                                                              this.state
                                                                .cartItemFromDB[
                                                                i
                                                              ].quantity
                                                            }
                                                            id={m.id}
                                                          />
                                                        </div>
                                                      );
                                                    }
                                                  }
                                                )}
                                                {ii != 1 ? (
                                                  <div
                                                    className="addlink"
                                                    id={m.id}
                                                    onClick={(e) =>
                                                      this.add(e, m)
                                                    }
                                                  >
                                                    ADD
                                                  </div>
                                                ) : (
                                                  <div className="dontShow">
                                                    {(ii = 0)}
                                                  </div>
                                                )}
                                              </div>
                                            ) : (
                                              <div
                                                className="addlink"
                                                id={m.id}
                                                onClick={(e) => this.add(e, m)}
                                              >
                                                ADD
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                        <hr className="menudivision" />
                                      </div>
                                    </>
                                  );
                                }
                              })}
                            </>
                          ) : (
                            <div className="onemenu">
                              <div className="menudetails">
                                {m.type === "Veg" ? (
                                  <img className="veglogo" src={veglogo} />
                                ) : (
                                  <img
                                    className="nonveglogo"
                                    src={nonveglogo}
                                  />
                                )}
                                <div className="menuname"> {m.menuName} </div>
                                <div className="menuprice">
                                  {" "}
                                  &#8377;{m.price}{" "}
                                </div>
                              </div>
                              <div className="menuimg">
                                <div>
                                  {" "}
                                  <img src={food} className="mmenuimg" />{" "}
                                </div>
                                <div id={"additems" + m.id}>
                                  {this.state.cartItemFromDB[0].hid ==
                                  hotel.id ? (
                                    <div>
                                      {this.state.intoCart.map((c, i) => {
                                        if (c.id == m.id) {
                                          ii = 1;
                                          console.log(ii);
                                          return (
                                            <div className="addlink addlinkNew">
                                              <QuantityBox
                                                quantity={
                                                  this.state.cartItemFromDB[i]
                                                    .quantity
                                                }
                                                id={m.id}
                                              />
                                            </div>
                                          );
                                        }
                                      })}
                                      {ii != 1 ? (
                                        <div
                                          className="addlink"
                                          id={m.id}
                                          onClick={(e) => this.add(e, m)}
                                        >
                                          ADD
                                        </div>
                                      ) : (
                                        <div className="dontShow">
                                          {(ii = 0)}
                                        </div>
                                      )}
                                    </div>
                                  ) : (
                                    <div
                                      className="addlink"
                                      id={m.id}
                                      onClick={(e) => this.add(e, m)}
                                    >
                                      ADD
                                    </div>
                                  )}
                                </div>
                              </div>
                              <hr className="menudivision" />
                            </div>
                          )}
                        </>
                      ))}
                    </div>
                    {this.state.intoCart.length === 0 ? (
                      <div className="menuCart">
                        <h1 className="emptycarttitle"> Cart Empty </h1>

                        <div className="emptycartwords">
                          {" "}
                          Good food is always cooking! <br />
                          Go ahead, order some yummy <br />
                          items from the menu.{" "}
                        </div>
                      </div>
                    ) : (
                      <div className="menuCartI">
                        <h1 className="carttitle"> Cart </h1>

                        <div className="carttotal">
                          {this.state.id != this.state.hotelIdInCart ||
                          this.state.hotelIdInCart == 0 ? (
                            <>
                              {this.state.hotels.map((h) => {
                                if (h.id == this.state.hotelIdInCart) {
                                  return (
                                    <div className="cartfrom">
                                      from{" "}
                                      <span
                                        className="cartforeign"
                                        onClick={() => {
                                          window.location =
                                            "/welcome/profile/displayMenu/" +
                                            h.id;
                                        }}
                                      >
                                        {h.hotelname}
                                      </span>
                                    </div>
                                  );
                                }
                              })}
                            </>
                          ) : (
                            <div></div>
                          )}
                          {this.state.intoCart.length} ITEMS{" "}
                        </div>
                        <div className="cartitemsrow">
                          {this.state.intoCart.map((m, i) => (
                            <div>
                              <div className="itemsrow">
                                {m.type === "Veg" ? (
                                  <img className="cveglogo" src={veglogo} />
                                ) : (
                                  <img
                                    className="cnonveglogo"
                                    src={nonveglogo}
                                  />
                                )}
                                <span className="cmenuname">
                                  {" "}
                                  {m.menuName}
                                  {/* x{" "}
                                {this.state.cartItemFromDB[i].quantity ===
                                undefined
                                  ? "1"
                                  : this.state.cartItemFromDB[i].quantity} */}
                                </span>
                                <span className="cmenuprice">
                                  {" "}
                                  &#8377;
                                  {m.price *
                                    this.state.cartItemFromDB[i].quantity}{" "}
                                </span>
                                <span className="cmenuquantity">
                                  <QuantityBox
                                    quantity={
                                      this.state.cartItemFromDB[i].quantity
                                    }
                                    id={m.id}
                                  />
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="cartsubtotalarea">
                          <span className="cartsubtotal">Subtotal</span>
                          <span className="cartamount">
                            {" "}
                            &#8377;{this.state.cartTotal}
                          </span>
                        </div>
                        <div className="extra"> Extra charges may apply</div>
                        <div className="checkout">
                          {" "}
                          <Link
                            to={"/checkout/" + this.state.id}
                            state={{
                              intocart: this.state.intoCart,
                            }}
                            className="cartcheckout"
                          >
                            {" "}
                            CHECKOUT &#8594;{" "}
                          </Link>{" "}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              );
            }
          })}
        </div>
      </div>
    );
  }
}
