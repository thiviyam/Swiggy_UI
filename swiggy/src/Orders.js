import React, { Component } from 'react';
import axios from 'axios';
import {Link } from "react-router-dom";
import image from './images/homefood.png';
import hotelImg from "./HotelImages";

import './Orders.css';

export default class Orders extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         hotels: [],
         orders: []
      }
    }

    componentDidMount(){

        let urls = [
          "http://localhost:8083/order/getAllOrders",
          "http://localhost:8083/hotel/displayHotels",
        ];

        axios.all( urls.map( (url, i) => {
            axios.get(url)
            .then((response) => {

              if (i === 0) {
                this.setState({ orders: response.data }, () => {console.log(this.state.orders)});
              } else if (i === 1) {
                this.setState({ hotels: response.data }, () => {
                  console.log(this.state.hotels);
                });
              }

            });
        } ));

        
    }
    
    reOrder = (event) => {
        let order = event.target.id;
        let orderID = parseInt(order);
        console.log(orderID);

        axios.post("http://localhost:8083/order/reOrder", orderID)
        .then( response => {
           window.location = "/checkout";
        })
    }

  render() {
    return (
      <div className="orderbody">
        <h3 className="ordertitle"> Past Orders </h3>

            <div className="orderbox">
                {this.state.orders.map((order) => {
                    return <div> {
                        this.state.hotels.map((hotel) => {
                            if (order.hotelId == hotel.id) {
                                return (
                                  <div className="orderone">
                                    <div
                                      className="row1"
                                      onClick={() => {
                                        window.location =
                                          "/welcome/profile/displayMenu/" +
                                          hotel.id;
                                      }}
                                    >
                                      {hotelImg.map((image) => {
                                        let formedName = "H" + hotel.id;
                                        if (formedName == image.name) {
                                          return (
                                            <img
                                              src={image.imgg}
                                              id={hotel.id}
                                              className="orderimage"
                                            />
                                          );
                                        }
                                      })}

                                      <div className="orderhotelName">
                                        {" "}{hotel.hotelname}
                                      </div>

                                      <div>
                                        {hotel.cusines.map((c, i) => {
                                          if (i === hotel.cusines.length - 1) {
                                            return (
                                              <span className="ordercusine">                                                
                                                {c}
                                              </span>
                                            );
                                          } else {
                                            return (
                                              <span className="ordercusine">
                                                {c},{" "}
                                              </span>
                                            );
                                          }
                                        })}
                                      </div>
                                      <div className="orderratings">
                                        {" "}
                                        ORDER #{order.id} | Ratings:{" "}
                                        {hotel.ratings}{" "}
                                      </div>

                                      <Link
                                        className="orderlink"
                                        to="/welcome/profile/displayMenu"
                                      >
                                        {" "}
                                        VIEW DETAILS{" "}
                                      </Link>
                                    </div>

                                    <hr className="orderline" />

                                    <div className="row2">
                                      {order.menu.map((om) => {
                                        return (
                                          <span>
                                            {hotel.menu.map((m) => {
                                              if (om.menuId == m.id) {
                                                return (
                                                  <span className="orderlist">
                                                    {" "}
                                                    {m.menuName} x {om.quantity}
                                                    ,
                                                  </span>
                                                );
                                              }
                                            })}
                                          </span>
                                        );
                                      })}
                                      <span className="ordertotal">
                                        Total Paid: &#8377;{order.totalPrice}
                                      </span>
                                      <br /> <br />
                                      <input
                                        type="button"
                                        value="REORDER"
                                        className="orderre"
                                        id={order.id}
                                        onClick={this.reOrder}
                                      />
                                      <input
                                        type="button"
                                        value="HELP"
                                        className="orderhelp"
                                      />
                                    </div>
                                  </div>
                                );

                            }
                        })
                    } </div>
                })}


                {/* {this.state.hotels.map( hotel => (

                <div className="orderone">
                  <div className='row1' onClick={() => {window.location = "/welcome/profile/displayMenu/" + hotel.id;}}>
                    <img src={image} className="orderimage"/>
                    <div className='orderhotelName'> {hotel.hotelname}</div>

                    {hotel.cusines.map ( (c,i) =>{

                        if(i === hotel.cusines.length-1){
                            return <span className="ordercusine"> {c} </span>
                        }else{
                            return <span className="ordercusine"> {c}, </span>
                        }
                    }                                                    
                    )}
                    <h5 className="orderratings"> Ratings: {hotel.ratings} </h5>

                    <Link className="orderlink" to='/welcome/profile/displayMenu'> VIEW DETAILS </Link>
                  </div>

                  <hr className='orderline'/>

                  <div className='row2'>

                    {hotel.menu.map( (m)=> (
                        <span className='orderlist'> {m.menuName} </span>
                    ) )}
                    <div className='orderlist'> Penne Pasta With Red Sauce x 1 </div>
                    <input type='button' value='REORDER' className='orderre'/>
                    <input type='button' value='HELP' className='orderhelp'/>
                  </div>

                </div>
            ) )} */}
            </div>
      </div>
    )
  }
}