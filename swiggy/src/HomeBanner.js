import React, { Component } from "react";
import images from "./HomeBannerImages";

import "./HomeBanner.css";

export default class HomeBanner extends Component {
  render() {
    return (
      <div>
        <div className="HBBody">
          <div className="HBSubBody">
            {images.map((image) => {
              return <img src={image} alt="img" className="images" />;
            })}
          </div>
        </div>
      </div>
    );
  }
}
