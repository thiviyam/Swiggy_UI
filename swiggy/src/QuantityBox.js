import React, { Component } from 'react';
import axios from 'axios';
import './QuantityBox.css';

export default class QuantityBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      updateCart: {
        menuid: 0,
        quantity: 0,
      },
    };
  }

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

  inc = (eve) => {
    let id = eve.target.id;
    console.log(id);
    let qty = document.getElementById("q" + id).textContent;
    let q = parseInt(qty) + 1;

    this.setState(
      {
        updateCart: {
          ...this.state.updateCart,
          menuid: id,
          quantity: q,
        },
      },
      () => this.axiosupdateDbCart()
    );

    window.location.reload();
  };

  dec = (eve) => {
    let id = eve.target.id;
    console.log(id);
    let qty = document.getElementById("q" + id).textContent;
    let q = parseInt(qty) - 1;

    if (q <= 0) {
      this.axiosDeleteDbCart(id);
      window.location.reload();
    }else{
      this.setState(
        {
          updateCart: {
            ...this.state.updateCart,
            menuid: id,
            quantity: q,
          },
        },
        () => this.axiosupdateDbCart()
      );

      window.location.reload();
    }
  };

  render() {
    return (
      <>
        <span className="quantityBox">
          <span
            className="quantityBoxdec"
            id={this.props.id}
            onClick={this.dec}
          >
            {" "}
            -{" "}
          </span>
          <span className="quantityBoxvalue" id={"q" + this.props.id}>
            {" "}
            {this.props.quantity}{" "}
          </span>
          <span
            className="quantityBoxinc"
            id={this.props.id}
            onClick={this.inc}
          >
            {" "}
            +{" "}
          </span>
        </span>
      </>
    );
  }
}
