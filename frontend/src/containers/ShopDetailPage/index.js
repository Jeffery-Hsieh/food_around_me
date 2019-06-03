import React, { Component } from "react"
import { connect } from "react-redux"
import { connectWeb3, getShopDetail, getCommentContent, voteComment } from "../../redux/actions"
import { Link } from "react-router-dom"
import Shop from "../../components/Shop"
import CommentUnAcceptedList from "../../components/CommentUnAcceptedList"
import CommentAcceptedList from "../../components/CommentAcceptedList"
import "./index.css"

import addComment_btn from "../../Assets/addComment_btn.svg"

class ShopDetailPage extends Component {
  componentDidMount() {
    const { shopId, shops, connectWeb3, getShopDetail } = this.props;
    getShopDetail(shopId)
    connectWeb3()
  }

  handleVoting = (commentId) => {
    const { shopDetail, voteComment, account } = this.props
    const { contractAddress, votePrice } = shopDetail
    voteComment(contractAddress, commentId, account, votePrice)
  }

  handleExpand = (commentId, viewPrice) => {
    const { shopDetail, getCommentContent, account } = this.props
    const { contractAddress } = shopDetail
    getCommentContent(shopDetail.contractAddress, commentId, account, viewPrice)
  }

  render() {
    const { shopId, shopDetail, isLoading, commentsAccepted } = this.props;
    return(
      <div className="conatiner-fluid">
        {shopDetail === null
          ? null
          : <React.Fragment>
              <Shop className="row" {...shopDetail} />
              <CommentAcceptedList
                comments={shopDetail.commentAccepted}
                commentFromBlockChain={commentsAccepted}
                handleExpand={this.handleExpand}
                />
              <CommentUnAcceptedList
                comments={shopDetail.commentUnAccepted}
                votePrice={shopDetail.votePrice}
                handleVoting={this.handleVoting}
                />
            </React.Fragment>
        }
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
  commentsAccepted: search.commentInBlockChain,
  isLoadong: search.isLoadong,
  comments: search.commentInBlockChain,
  account: web3.coinbase,
  shopId:ownProps.match.params.shopId,
})

const mapDispatch = { connectWeb3, getShopDetail, voteComment, getCommentContent }

export default connect(mapState, mapDispatch)(ShopDetailPage)
