import { combineReducers } from 'redux';
import { GET_SHOPS_BEGIN, GET_SHOPS_SUCCESS, GET_SHOPS_FAILURE,
         GET_COMMENTS_BEGIN, GET_COMMENTS_SUCCESS, GET_COMMENTS_FAILURE,
         GET_SHOP_DETAIL_BEGIN, GET_SHOP_DETAIL_SUCCESS, GET_SHOP_DETAIL_FAILURE,
         GET_COMMENT_CONTENT_BEGIN, GET_COMMENT_CONTENT_SUCCESS,GET_COMMENT_CONTENT_FAILURE,
         CREATE_COMMENT_BEGIN, CREATE_COMMENT_SUCCESS, CREATE_COMMENT_FAILURE,
         CREATE_SHOP_BEGIN, CREATE_SHOP_SUCCESS, CREATE_SHOP_FAILURE,
         WEB3_CONNECTED, WEB3_CONNECTED_FAILURE,
       } from "./actions"


const initialSearchState = {
  categories:["Cafe", "Wine shop", "Breakfast & lunch", "Burgers", "Office Equipment", "Ramen resteraunt", "Grocery store"],
  isLoading: false,
  shops: [],
  shopDetail: null,
  commentInBlockChain: [],
}

export function searchReducer(state = initialSearchState, action) {
  switch(action.type) {
    case GET_SHOPS_BEGIN:
    case CREATE_SHOP_BEGIN:
    case CREATE_COMMENT_BEGIN:
    case GET_SHOP_DETAIL_BEGIN:
    case GET_COMMENT_CONTENT_BEGIN:
      return {
        ...state,
        isLoading: true
      }
    case GET_SHOPS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        shops: action.payload.shops
      }
    case GET_SHOP_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        shopDetail: action.payload
      }
    case CREATE_SHOP_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
    case CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
    case GET_COMMENT_CONTENT_SUCCESS:
      return {
        ...state,
        isLoading:false,
        commentInBlockChain:[...state.commentInBlockChain, action.payload]
      }
    default:
      return state;
  }
}

const initialWeb3State = {
  isInjected: false,
  isCreatingShop: false,
  networkId: null,
  coinbase: null,
  balance: null,
}

export function web3Reducer(state = initialWeb3State, action) {
  switch(action.type) {
  case WEB3_CONNECTED:
  console.log('Metamask is connected');
    return {
      ...state,
      coinbase:action.payload.coinbase,
      networkId:action.payload.networkId,
      balance:action.payload.balance,
      isInjected:action.payload.injectedWeb3,
    }
  default:
    return state;
  }
}

export default combineReducers({
  search: searchReducer,
  web3: web3Reducer,
});
