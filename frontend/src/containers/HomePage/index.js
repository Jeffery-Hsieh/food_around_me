import React from "react"
import SearchBar from "./SearchBar"
import { Link } from "react-router-dom"
import "./index.css";

const Homepage = props => {
  return(
      <div className="container-fluid">
        <div className="search row align-items-center">
          <div className="col">
            <div className="row search__title justify-content-center">
              <h1>Find the best shop around you</h1>
            </div>
            <div className="row justify-content-center">
              <SearchBar/>
            </div>
            <div className="row justify-content-center">
              <Link to="/shop/create" >
                <h1>createShop</h1>
              </Link>
            </div>

          </div>
        </div>
      </div>
  )
}

export default Homepage;
