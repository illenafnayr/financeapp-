
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
  //   let searchQuery = this.state.value
  //   console.log(searchQuery)
  //   this.props.searchQuery(searchQuery)
  // }

  handleSubmit(event) {
    event.preventDefault();
    // axios
    //   .get(`https://api.polygon.io/v1/meta/symbols/${this.state.value}/company?&apiKey=HvlrSrp7V4UMAWFLEpHiW3FpC9VkDpVU`)
    //   .then((response) => {
    //     console.log(response.data)
    //     this.sendData()
    //   })
    let searchQuery = this.state.value
    // console.log(searchQuery)
    this.props.onSearch(searchQuery)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} id='searchBarContainer'>
        {/* <label> */}
          <input type="text" value={this.state.value} onChange={this.handleChange} id='searchField' />
        {/* </label> */}
        <button type="submit" value="Submit" id="submit">
          <img src={searchIcon} alt="wrong url" id="searchIcon" />
        </button>
      </form>
    );
  }
}

export default SearchBar