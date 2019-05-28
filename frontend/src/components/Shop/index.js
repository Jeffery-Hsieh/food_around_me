import React from "react";
import { Link } from "react-router-dom"

const Shop = ({ shopName, location, phone, description, category }) => (
  <div className="col-lg-3 m-5">
    <div className="h-100 border-dark">
      <h1>{shopName}</h1>
      <ul className="list-group list-group-flush">
        {location
          ? <li className="list-group-item">location: {location.country}, {location.city}</li>
          : null
        }
        <li className="list-group-item">phone: {phone}</li>
        <li className="list-group-item">description: {description}</li>
        <li className="list-group-item">category: {category}</li>
      </ul>
    </div>
  </div>
)

export default Shop;
