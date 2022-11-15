import React, { Component } from 'react';
import SearchSugg from './SearchSugg';
import axios from "axios";

import './WelcomeSearch.css';

export default class WelcomeSearch extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      render: false,
      text: "",
      hotelSuggestion: [],
      menuSuggestion: [],
    };
  }

  searchInput = (event) =>{

    let searchBox = document.getElementById("searchSugg");
    let tarvalu = event.target.value;
    this.setState( {
      render: true,
      text: event.target.value
    } );

    let urls = [
      "http://localhost:8083/search/hotelSugg",
      "http://localhost:8083/search/menuSugg",
    ];

    axios.all(
      urls.map((url, i) => {
        axios.post(url, tarvalu).then((response) => {
          if (i === 0) {
            this.setState({ hotelSuggestion: response.data });
            console.log(response.data);
          } else if (i === 1) {
            this.setState({ menuSuggestion: response.data });
            console.log(response.data);
          }
        });
      })
    );

    if (tarvalu === "") {
      this.setState({
        render: false
      });
    }
  }

  render() {
    return (
      <div id="searchBody">
        <input
          type="search"
          placeholder="Search for Restaurants and foods"
          className="searchip"
          onChange={this.searchInput}
        ></input>
        <div className="searchSuggestions" id="searchSugg"></div>
        {this.state.render && (
          <SearchSugg
            text={this.state.text}
            hotelSuggestion={this.state.hotelSuggestion}
            menuSuggestion={this.state.menuSuggestion}
          />
        )}
      </div>
    );
  }
}
