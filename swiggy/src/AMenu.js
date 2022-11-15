import React, { Component } from 'react';
import food from "./images/homefood.png";
import veglogo from "./images/veglogo.png";
import nonveglogo from "./images/nonveg.png";
import axios from "axios";
import { Link } from "react-router-dom";
import QuantityBox from "./QuantityBox";

import "./DisplayMenu.css";
import "./AMenu.css";

export default class AMenu extends Component {
    
  render() {
    return (
      <div>
        {this.props.menu.map((m) => (
          <>
            {m.type === "Veg" ? (
              <div className="onemenu">
                <div className="menudetails">
                  {m.type === "Veg" ? (
                    <img className="veglogo" src={veglogo} />
                  ) : (
                    <img className="nonveglogo" src={nonveglogo} />
                  )}
                  <div className="menuname">{m.menuName}</div>
                  <div className="menuprice">&#8377;{m.price}</div>
                </div>
                <div className="menuimg">
                  <div>
                    <img src={food} className="mmenuimg" />
                  </div>
                  <div id={"additems" + m.id}>
                    {this.state.cartItemFromDB[0].hid == hotel.id ? (
                      <div>
                        {this.state.intoCart.map((c, i) => {
                          if (c.id == m.id) {
                            ii = 1;
                            console.log(ii);
                            return (
                              <div className="addlink addlinkNew">
                                <QuantityBox
                                  quantity={
                                    this.state.cartItemFromDB[i].quantity
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
                          <div className="dontShow">{(ii = 0)}</div>
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
        ))}
      </div>
    );
  }
}
