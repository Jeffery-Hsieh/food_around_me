import React from "react";
import Shop from "../Shop";

const ShopList = ({ shops }) => {
  return (
    <div className="row">
      {shops.map(shop =>
        <Shop key={shop._id} {...shop}/>
      )}
    </div>
  );
};

export default ShopList;
