import React, { Component } from 'react';
import axios from 'axios';
import food from './images/homefood.png';
import veglogo from './images/veglogo.png';
import nonveglogo from './images/nonveg.png';
import hotelImg from "./HotelImages";

import './MenuChart.css';
import QuantityBox from './QuantityBox';

export default class MenuChart extends Component {

    constructor(props) {
      super(props)
    
      this.state = {
        cartItems: [],
        hotels: [],
        hotelid: 0,
        subTotal: 0
      };
    }

    componentDidMount(){

        let urls = [
            "http://localhost:8083/cart/getCartItem",
            "http://localhost:8083/hotel/displayHotels"
        ]

        axios.all( urls.map ( (url, i) =>{
                
                axios.get(url)
                .then(response => {
                    if(i === 0){
                        this.setState( {cartItems: response.data} , () => {
                            let hotelid = this.state.cartItems[0].hid;
                            this.setState( {hotelid: hotelid} );

                            let sum=0;
                            this.state.cartItems.map( (m)=> {
                                sum += m.cartitem.price * m.quantity;
                            } );

                            this.setState( {subTotal: sum} );
                        });
                        console.log(response.data);
                        
                    }else if( i===1 ){
                        this.setState( {hotels: response.data} );
                        console.log(response.data);
                    }
            });
            
        } )); 
        
    }

    order = () =>{

        axios.post("http://localhost:8083/cart/ordered")
        .then(response =>{
            window.location = "/user";
        });
    }
  render() {
    return (
      <div className="MenuChart">
        {this.state.hotels.map((h) => {
          if (h.id == this.state.hotelid) {
            return (
              <>
                <div className="MChotelhead">

                  <span>
                    {hotelImg.map((image) => {
                      let formedName = "H" + h.id;
                      if (formedName == image.name) {
                        return (
                          <img
                            src={image.imgg}
                            className="MChotelimg"
                          />
                        );
                      }
                    })}
                  </span>

                  <span className="MChoteldetails">
                    <div className="MChotelname"> {h.hotelname} </div>
                    <div className="MChotellocation"> Thiruvermbur </div>
                  </span>
                  
                </div>
                <hr className="MCline" />
              </>
            );
          }
        })}
        <div className="MCitems">
          <table>
            <tbody>
              {this.state.cartItems.map((m) => {
                return (
                  <>
                    <tr className="itemsrow MCrow">
                      <td>
                        {m.cartitem.type === "Veg" ? (
                          <img className="cveglogo" src={veglogo} />
                        ) : (
                          <img className="cnonveglogo" src={nonveglogo} />
                        )}
                      </td>
                      <td>
                        {" "}
                        <span className="cmenuname MCmenuName">
                          {" "}
                          {m.cartitem.menuName}{" "}
                        </span>
                      </td>
                      <td>
                        {" "}
                        <span className="MCquantity">
                          <QuantityBox
                            quantity={m.quantity}
                            id={m.cartitem.id}
                          />
                        </span>{" "}
                      </td>
                      <td>
                        {" "}
                        <span className="cmenuprice MCprice">
                          {" "}
                          &#8377;{m.cartitem.price * m.quantity}{" "}
                        </span>{" "}
                      </td>
                    </tr>
                    <br />
                  </>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="BillDetails">
          {" "}
          <span className="Billhead">Bill Details</span> <br />
          <br />
          <table>
            <tbody>
              <tr className="Billlist">
                <td>Item Total</td>
                <td className="col2">&#8377;{this.state.subTotal}</td>
              </tr>
              <tr className="Billlist">
                <td>Delivery Fee | 0.1Km</td>
                <td className="col2">&#8377;19</td>
              </tr>{" "}
              <br />
              <hr /> <br />
              <tr className="Billlist">
                <td>Taxes and Charges</td>
                <td className="col2">&#8377;10.35</td>
              </tr>
            </tbody>
          </table>
        </div>
        <hr className=" linewidth" />
        <div className="topay">
          <span className="topayword"> TO PAY </span>
          <span className="topayamount"> &#8377; {this.state.subTotal} </span>
        </div>

        {/* <div>
          <button onClick={this.order}> order </button>
        </div> */}
      </div>
    );
  }
}
