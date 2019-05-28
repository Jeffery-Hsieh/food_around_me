import React, { Component } from "react"
import { connect } from "react-redux"
import { connectWeb3, getShops, getShopDetail, getComments } from "../../redux/actions"
import Shop from "../../components/Shop"
import CommentList from "../../components/CommentList"
import { Link } from "react-router-dom"
import "./index.css"

import addComment_btn from "../../Assets/addComment_btn.svg"

class ShopDetailPage extends Component {
  componentDidMount() {
    const { shopId, shops, connectWeb3, getComments, getShopDetail } = this.props;
    getShopDetail(shopId)
    connectWeb3()
  }

  render() {
    const { shopId, shopDetail, comments, isLoading } = this.props;
    return(
      <div className="conatiner-fluid">
        <div className="row">
          {isLoading
            ? null
            : <Shop {...shopDetail} />
          }
        </div>
        <CommentList className="row" comments={comments} />
        <Link className="sticky-right" to={`/shops/${shopId}/createComment`}>
          <img src={addComment_btn} alt="addComment" />
        </Link>
      </div>
    );
  }
}

const mapState = ({ search, web3 }, ownProps) => ({
  shops:search.shopDetail,
  shopDetail: search.shopDetail,
  comments: search.comments,
  isLoadong: search.isLoadong,
  shopId:ownProps.match.params.shopId,
})

const mapDispatch = { connectWeb3, getShopDetail, getComments }

export default connect(mapState, mapDispatch)(ShopDetailPage)
