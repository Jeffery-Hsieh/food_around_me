import React, { Component } from "react";
import { connect } from "react-redux";
import { getShops } from "../../redux/actions";
import ShopList from "../../components/ShopList"
import addBtn from "../../Assets/add_btn.svg"
import { Link } from "react-router-dom"
import "./index.css"

class ShopListPage extends Component {
  componentDidMount() {
    const { category, country, city, getShops } = this.props
    getShops(category, country, city)
  }

  render() {
    const { shops, isLoading } = this.props
    return(
      <div className="container-fluid">
          {isLoading
            ? <div>Loading....</div>
            : <ShopList shops={shops}/>
          }
          <Link to="/shop/create" className="sticky-right">
            <img src={addBtn} alt="add" />
          </Link>
      </div>
    )
  }
}

const mapState = ({ search, web3 }, ownProps) => ({
  shops: search.shops,
  isLoading: search.isLoading,
  category: ownProps.match.params.category,
  country: ownProps.match.params.country,
  city: ownProps.match.params.city,
});

const mapDispatch = { getShops }

export default connect(mapState,mapDispatch)(ShopListPage)
