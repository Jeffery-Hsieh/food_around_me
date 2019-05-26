import React, { Component } from "react";
import { Link } from "react-router-dom";
import { setCountry, setCategory, setCity } from "../../../redux/actions"
import { connect } from 'react-redux';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import SearchField from "../../../components/SearchField";
import { Redirect } from "react-router-dom";
import "./index.css";

class SearchBar extends Component {

  render() {
    const { categories, countries, cities,  category, country, city,
    setCategory, setCountry, setCity} = this.props;
    return (
      <React.Fragment>
        <SearchField type="category" options={categories} search={category} handleChange={setCategory}/>
        <SearchField type="country" options={countries} search={country} handleChange={setCountry}/>
        <SearchField type="city" options={cities} search={city} handleChange={setCity}/>
        <Link to={`/shops/${category}/${country}/${city}`}>
          <button className="search__btn btn btn-success" type="button"></button>
        </Link>
      </React.Fragment>
    )
  }
}

const mapState = ({ display, search }) => ({
  categories: search.categories,
  countries: search.countries,
  cities: search.cities,
  category: search.category,
  country: search.country,
  city: search.city,
})

const mapDispatch = { setCountry, setCategory, setCity }

export default connect(mapState, mapDispatch)(SearchBar);
