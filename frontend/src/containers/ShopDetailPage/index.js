import React, { Component } from "react";
import { connect } from "react-redux";
import { connectWeb3, getComments } from "../../redux/actions";
import Shop from "../../components/Shop";
import CommentList from "../../components/CommentList";


class ShopDetailPage extends Component {
  componentDidMount() {
    const { connectWeb3, getComments, shopId, shops } = this.props;
    const shop = shops.find(shop => shop._id == shopId);

    connectWeb3();
  }

  render() {
    const { shops, shopId, comments, coinbase } = this.props;
    const shop = shops.find(shop => shop._id == shopId);
    return(
      <div className="conatiner-fluid">
        <CommentList className="row" comments={comments} />
      </div>
    );
  }
}

const mapState = ({ search, web3 }, ownProps) => ({
  shops:search.shops,
  comments: search.comments,
  coinbase: search.coinbase,
  shopId:ownProps.match.params.shopId,
  isInjected: web3.isInjected,
})

const mapDispatch = { connectWeb3, getComments };

export default connect(mapState,mapDispatch)(ShopDetailPage);
