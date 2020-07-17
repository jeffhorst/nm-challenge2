import React, { Component } from "react";
import Filter from "./Filter";
import Header from "./Header";

import "bootstrap/dist/css/bootstrap.min.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      countries: [],
      filterText: "",
    };
  }

  async componentDidMount() {
    try {
      const url = "https://restcountries.eu/rest/v2/all";
      const response = await fetch(url);
      const data = await response.json();
      this.setState({ countries: data, isLoaded: true });
    catch(e) {
      console.log("There was a problem feting the data.");
    }
    //console.log(this.state.countries);
  }

  handleInput = (event) => {
    //console.log(event.target.value);
    this.setState({ filterText: event.target.value });
  };

  render() {
    let filtered = this.state.countries.filter((country) => {
      return country.name.includes(this.state.filterText);
    });

    return (
      <div>
        <div>
          <Header />
        </div>
        <br />

        <div>
          <label className="text">Filter Countries: </label>
          <Filter handleInput={this.handleInput} />
        </div>
        <br />

        {!this.state.isLoaded || !this.state.countries ? (
          <div>loading...</div>
        ) : (
          <div>
            <ul>
              {filtered.map(function (country) {
                return <li key={country.name}>{country.name}</li>;
              })}
            </ul>
          </div>
        )}
      </div>
    );
  }
}
