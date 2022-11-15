import React from "react";
import { useLocation } from "react-router-dom";
import "./Checkout.css";
import DeliverAddress from "./DeliverAddress";
import MenuChart from "./MenuChart";

export default function Checkout() {
  return (
    <div className="checkoutbody">
      <div className="checkoutbodypartion">
        <DeliverAddress />
        <MenuChart />
      </div>
    </div>
  );
}
