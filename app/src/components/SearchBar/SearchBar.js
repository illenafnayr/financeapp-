
// import axios from "axios";
import React from "react";
// import ChartJs from "chart.js";
import searchIcon from './searchIcon.png'
import './SearchBar.css'

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  // sendData = () => {
  //   console.log(this.state.value)
  //   const searchQuery = `${this.state.value}`
  //   this.props.searchQuery(searchQuery.toUpperCase())
  // }

  handleSubmit(event) {
    event.preventDefault();
    // axios
    //   .get(`https://api.polygon.io/v1/meta/symbols/${this.state.value}/company?&apiKey=HvlrSrp7V4UMAWFLEpHiW3FpC9VkDpVU`)
    //   .then((response) => {
    //     console.log(response.data)
    //     this.sendData()
    //   })
    // this.props.searchQuery()
    // console.log(this.state.value)
    // const searchQuery = `${this.state.value}`
    // this.props.searchQuery(searchQuery.toUpperCase())
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} id='searchBarContainer'>
        {/* <label> */}
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        {/* </label> */}
        <button type="submit" value="Submit" id="submit">
          <img src={searchIcon} alt="wrong url" id="searchIcon" />
        </button>
      </form>
    );
  }
}

export default SearchBar