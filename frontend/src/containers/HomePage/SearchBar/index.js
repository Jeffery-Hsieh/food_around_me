import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { CountryDropdown, RegionDropdown, CountryRegionData } from "react-country-region-selector"
import "./index.css";

class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      category:"",
      country:"",
      region:"",
    }
  }

  selectCategory = event => {
    this.setState({
      category:event.target.value
    })
  }

  selectCountry = country => {
    this.setState({
      country:country
    })
  }

  selectRegion = region => {
    this.setState({
      region:region
    })
  }


  render() {
    const { category, country, region } = this.state;
    const { categories } = this.props;
    console.log(category)
    return (
      <React.Fragment>
        <div className="col-lg-2">
          <select className="form-control" onChange={this.selectCategory}>
            <option>Select Category</option>
            {categories.map((category, index) =>
              <option key={index}>{category}</option>
            )}
          </select>
        </div>

        <div className="col-lg-2">
          <CountryDropdown
            classes="form-control"
            value={this.state.country}
            onChange={this.selectCountry} />
        </div>

        <div className="col-lg-2">
          <RegionDropdown
            classes="form-control"
            country={this.state.country}
            value={this.state.region}
            onChange={this.selectRegion}
          />
        </div>

        <div className="col-lg-1">
          <Link to={`/shops/${category}/${country}/${region}`} >
            <button className="search__btn btn btn-success" type="button"></button>
          </Link>
        </div>

      </React.Fragment>
    )
  }
}

const mapState = ({ display, search }) => ({
  categories: search.categories,
})

export default connect(mapState, null)(SearchBar);
