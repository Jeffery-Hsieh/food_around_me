import * as API from "../api/backendAPI"
import * as web3API from "../api/web3API"

export const GET_SHOPS_BEGIN = "GET_SHOPS_BEGIN"
export const GET_SHOPS_SUCCESS = "GET_SHOPS_SUCCESS"
export const GET_SHOPS_FAILURE = "GET_SHOPS_FAILURE"

export const GET_SHOP_DETAIL_BEGIN = "GET_SHOP_DETAIL_BEGIN"
export const GET_SHOP_DETAIL_SUCCESS = "GET_SHOP_DETAIL_SUCCESS"
export const GET_SHOP_DETAIL_FAILURE = "GET_SHOP_DETAIL_FAILURE"

export const GET_COMMENT_CONTENT_BEGIN = "GET_COMMENT_CONTENT_BEGIN"
export const GET_COMMENT_CONTENT_SUCCESS = "GET_COMMENT_CONTENT_SUCCESS"
export const GET_COMMENT_CONTENT_FAILURE = "GET_COMMENT_CONTENT_FAILURE"

export const ADD_CUSTOMER_BEGIN = "ADD_CUSTOMER_BEGIN"
export const ADD_CUSTOMER_SUCCESS = "ADD_CUSTOMER_SUCCESS"
export const ADD_CUSTOMER_FAILURE = "`ADD_CUSTOMER_FAILURE"

export const CREATE_COMMENT_BEGIN = "CREATE_COMMENT_BEGIN"
export const CREATE_COMMENT_SUCCESS = "CREATE_COMMENT_SUCCESS"
export const CREATE_COMMENT_FAILURE = "CREATET_COMMENT_FAILURE"

export const CREATE_SHOP_BEGIN = "CREATE_SHOP_BEGIN"
export const CREATE_SHOP_SUCCESS = "CREATE_SHOP_SUCCESS"
export const CREATE_SHOP_FAILURE = "CREATE_SHOP_FAILURE"

export const VOTE_COMMENT_BEGIN = "VOTE_COMMENT_BEGIN"
export const VOTE_COMMENT_SUCCESS = "VOTE_COMMENT_SUCCESS"
export const VOTE_COMMENT_FAILURE = "VOTE_COMMENT_FAILURE"

export const WEB3_CONNECTED = "WEB3_CONNECTED"
export const WEB3_CONNECTED_FAILURE = "WEB3_CONNECTED_FAILURE"

export function createShopSuccess(response) {
  return {
    type: CREATE_SHOP_SUCCESS,
    payload: response.data.status
  }
}

export function createShop(shopInfo, account) {
  return dispatch => {
    dispatch({type:CREATE_SHOP_BEGIN})
    web3API.createShop(shopInfo.shopName, account)
      .then(res => {
          return API.createShop({
            ...shopInfo,
            contractAddress:res
          })
      })
      .then(res => dispatch(createShopSuccess(res)))
      .catch(error => dispatch({type:CREATE_SHOP_FAILURE}))
  }
}

export function addCustomer(contractAddress, address, account) {
  return dispatch => {
    dispatch({type:ADD_CUSTOMER_BEGIN})
    web3API.addCustomer(contractAddress, address, account)
      .then(res =>
        API.voteComment({
          commentId: res.commentId.toNumber(),
          agreementCount: res.commentAgreeementCount,
        })
      )
      .then(res => dispatch({type:ADD_CUSTOMER_SUCCESS}))
      .catch(error => dispatch({type:ADD_CUSTOMER_FAILURE}))
  }
}

export function createComment(contractAddress, description, account) {
  return dispatch => {
    dispatch({type:CREATE_COMMENT_BEGIN})
    web3API.createComment(contractAddress, description, account)
      .then(commentId => {
        API.createComment({
          contractAddress:contractAddress,
          commentId:commentId.toNumber(),
          description:description,
          author: account,
        })
          .then(dispatch({type:CREATE_COMMENT_SUCCESS}))
      })
      .catch(error => dispatch({type:CREATE_COMMENT_FAILURE}))
  }
}

export function voteComment(contractAddress, commentId, account, value) {
  return dispatch => {
    dispatch({type:VOTE_COMMENT_BEGIN})
    web3API.voteComment(contractAddress, commentId, account, value)
      .then(res => {
        console.log(res)
        if(commentId == res.commentId && res.viewPrice > 0) {
          API.voteComment(contractAddress, res.commentId, res.viewPrice)
        }

        return dispatch({type:VOTE_COMMENT_SUCCESS})
      })
  }
}

export function getShopsSuccess(shopsResponse) {
  return {
    type: GET_SHOPS_SUCCESS,
    payload: {
      shops:shopsResponse.data,
    }
  }
}

export function getShopsFailure(error) {
  return {
    type: GET_SHOPS_FAILURE,
    error
  }
}

export function getShops(category,country,city) {
  return dispatch => {
    dispatch({type:GET_SHOPS_BEGIN})
    API.getShops(category,country,city)
      .then(res => dispatch(getShopsSuccess(res)))
      .catch(error => dispatch(getShopsFailure(error)))
  }
}

export function getShopDetailSuccess(shopDetail) {
  return {
    type:GET_SHOP_DETAIL_SUCCESS,
    payload:shopDetail
  }
}

export function getShopDetailFailure(err) {
  return {
    type:GET_SHOP_DETAIL_FAILURE,
    err
  }
}

export function getShopDetail(shopId) {
  return dispatch => {
    dispatch({type:GET_SHOP_DETAIL_BEGIN})
    API.getShopDetail(shopId)
      .then(res => dispatch(getShopDetailSuccess(res.data)))
      .catch(err => dispatch(getShopDetailFailure(err)))
  }
}

export function connectWeb3Success(web3Response) {
  return {
    type: WEB3_CONNECTED,
    payload: {
      coinbase:web3Response.coinbase,
      networkId:web3Response.networkId,
      balance:parseInt(web3Response.balance, 10),
      isInjected:web3Response.injectedWeb3,
      web3Instance:web3Response.web3,
    }
  }
}

export function connectWeb3Failure(error) {
  return {
    type: WEB3_CONNECTED_FAILURE,
    error
  }
}

export function connectWeb3() {
    return dispatch => {
      web3API.getWeb3()
        .then(res => dispatch(connectWeb3Success(res)))
        .catch(error => dispatch(connectWeb3Failure(error)))
    }
}

export function getCommentContentSuccess(commentId, commentContent) {
  return {
    type: GET_COMMENT_CONTENT_SUCCESS,
    payload: {
      commentId: commentId,
      commentContent:commentContent,
    }
  }
}

export function getCommentContentFailure(error) {
  return {
    type: GET_COMMENT_CONTENT_FAILURE,
    error
  }
}

export function getCommentContent(contractAddress, commentId, account, viewPrice) {
  return dispatch => {
    dispatch({type:GET_COMMENT_CONTENT_BEGIN})
    web3API.getCommentContent(contractAddress, commentId, account, viewPrice)
      .then(res => {dispatch(getCommentContentSuccess(commentId, res))})
      .catch(error => dispatch(getCommentContentFailure(error)))
  }
}
