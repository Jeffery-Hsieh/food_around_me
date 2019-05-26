import React from "react";
import { Link } from "react-router-dom"

const Shop = ({ _id, shopName, description, tag }) => (
  <div className="col-lg-3 m-5">
    <div className="card h-100 border-dark">
      <img className="card-img-top" src="holder.js/297x100" alt="Card image cap" />

      <div className="card-body">
        <Link to={`/shops/${_id}`}>
          <h5 className="card-title">{shopName}</h5>
        </Link>
        <p className="card-text">{description}</p>
      </div>

      <div className="card-footer bg-transparent border-0">
        <span className="badge badge-warning">{tag}</span>
      </div>

    </div>
  </div>
)

export default Shop;
