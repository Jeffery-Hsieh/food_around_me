import React, { Component } from "react";
import { connect } from "react-redux";
import { getShops, getComments } from "../../redux/actions";
import ShopList from "../../components/ShopList"

class ShopListPage extends Component {
  componentDidMount() {
    const { category, country, city, getShops, commentInstance } = this.props
    getShops(category, country, city)
  }

  render() {
    const { category, shops, isLoading } = this.props
    return(
      <div className="container-fluid">
          {isLoading
            ? <div>Loading....</div>
            : <ShopList shops={shops}/>
          }
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
  commentInstance: web3.commentInstance,
});

const mapDispatch = { getShops, getComments };

export default connect(mapState,mapDispatch)(ShopListPage);
