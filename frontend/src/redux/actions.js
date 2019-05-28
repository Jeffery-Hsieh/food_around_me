import * as API from "../api/backendAPI";
import * as web3API from "../api/web3API";

export const GET_SHOPS_BEGIN = "GET_SHOPS_BEGIN";
export const GET_SHOPS_SUCCESS = "GET_SHOPS_SUCCESS";
export const GET_SHOPS_FAILURE = "GET_SHOPS_FAILURE";

export const GET_SHOP_DETAIL_BEGIN = "GET_SHOP_DETAIL_BEGIN";
export const GET_SHOP_DETAIL_SUCCESS = "GET_SHOP_DETAIL_SUCCESS";
export const GET_SHOP_DETAIL_FAILURE = "GET_SHOP_DETAIL_FAILURE";

export const GET_COMMENTS_BEGIN = "GET_COMMENTS_BEGIN";
export const GET_COMMENTS_SUCCESS = "GET_COMMENTS_SUCCESS";
export const GET_COMMENTS_FAILURE = "GET_COMMENTS_FAILURE";

export const CREATE_COMMENT_BEGIN = "CREATE_COMMENT_BEGIN"
export const CREATE_COMMENT_SUCCESS = "CREATE_COMMENT_SUCCESS";
export const CREATE_COMMENT_FAILURE = "CREATET_COMMENT_FAILURE";

export const CREATE_SHOP_BEGIN = "CREATE_SHOP_BEGIN";
export const CREATE_SHOP_SUCCESS = "CREATE_SHOP_SUCCESS";
export const CREATE_SHOP_FAILURE = "CREATE_SHOP_FAILURE";

export const WEB3_CONNECTED = "WEB3_CONNECTED";
export const WEB3_CONNECTED_FAILURE = "WEB3_CONNECTED_FAILURE";

export const SET_CATEGORY_SEARCH = "SET_CATEGORY_SEARCH";
export const SET_COUNTRY_SEARCH = "SET_COUNTRY_SEARCH";
export const SET_CITY_SEARCH = "SET_CITY_SEARCH";


export function setCategory(category) {
  return {
    type:  SET_CATEGORY_SEARCH,
    payload: category
  };
}

export function setCountry(country) {
  return {
    type:  SET_COUNTRY_SEARCH,
    payload: country
  }
}

export function setCity(city) {
  return {
    type:  SET_CITY_SEARCH,
    payload: city
  }
}

export function getShopsSuccess(shopsResponse) {
  return {
    type: GET_SHOPS_SUCCESS,
    payload: {
      shops:shopsResponse.data,
    }
  };
}

export function getShopsFailure(error) {
  return {
    type: GET_SHOPS_FAILURE,
    error
  };
}

export function getShops(category,country,city) {
  return dispatch => {
    dispatch({type:GET_SHOPS_BEGIN});
    API.getShops(category,country,city)
      .then(res => dispatch(getShopsSuccess(res)))
      .catch(error => dispatch(getShopsFailure(error)));
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
    dispatch({type:GET_SHOP_DETAIL_BEGIN});
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
    };
}

export function getCommentsSuccess(commentResponse) {
  return {
    type: GET_COMMENTS_SUCCESS,
    payload: commentResponse
  }
}

export function getCommentsFailure(error) {
  return {
    type: GET_COMMENTS_FAILURE,
    error
  }
}

export function getComments(address) {
  return dispatch => {
    dispatch({type:GET_COMMENTS_BEGIN});
    web3API.getComments(address)
      .then(res => {dispatch(getCommentsSuccess(res))})
      .catch(error => dispatch(getCommentsFailure(error)))
  }
}

export function createShopSuccess(response) {
  return {
    type: CREATE_SHOP_SUCCESS,
    payload: response.data.status
  }
}

export function createShop(shopInfo, account) {
  return dispatch => {
    dispatch({type:CREATE_SHOP_BEGIN});
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
