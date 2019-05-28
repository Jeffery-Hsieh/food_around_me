import React from "react";
import ShopCard from "../ShopCard";

const ShopList = ({ shops }) => {
  return (
    <div className="row">
      {shops.map(shop =>
        <ShopCard key={shop._id} {...shop}/>
      )}
    </div>
  );
};

export default ShopList;
