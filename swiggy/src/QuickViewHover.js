import React, { Component } from 'react';
import "./QuickViewHover.css";

export default class QuickViewHover extends Component {

    constructor(props) {
      super(props)
    
      this.state = {
         menu: this.props.menus
      }
    }
  render() {
    return (
      <div className='QVflexBody'>
        <div className="QVBody2"></div>
        <div className="QVBody">
          <div className="QVSubBody">
            <div className="QVTitle">MENU</div>
            <div className="QVDesign">&#9753;</div>

            <div className="QVmenuList">
              {this.props.menus.map((m) => {
                return <div className="QVmenuName">{m.menuName}</div>;
              })}
            </div>

            <div className="QVDesign">&#9753;</div>
          </div>
        </div>
      </div>
    );
  }
}
