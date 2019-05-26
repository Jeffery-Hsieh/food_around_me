import { combineReducers } from 'redux';
import { SET_CITY_SEARCH, SET_COUNTRY_SEARCH, SET_CATEGORY_SEARCH,
         GET_SHOPS_BEGIN, GET_SHOPS_SUCCESS, GET_SHOPS_FAILURE,
         WEB3_CONNECTED, WEB3_CONNECTED_FAILURE, GET_COMMENTS_SUCCESS,
         GET_COMMENTS_FAILURE, GET_COMMENTS_BEGIN, CREATE_COMMENT_SUCCESS,
         CREATE_COMMENT_FAILURE, CREATE_SHOP_BEGIN, CREATE_SHOP_SUCCESS,
         CREATE_SHOP_FAILURE
       } from "./actions"


const initialSearchState = {
  categories:["Cafe", "Wine shop", "Breakfast & lunch", "Burgers", "Office Equipment", "Ramen resteraunt"],
  countries:["U.S.","Taiwan","Japan"],
  cities:["Chicago","Taipei","Tokyo"],
  isLoading: false,
  category: null,
  country: null,
  city: null,
  shops: [],
  comments: [],
}

export function searchReducer(state = initialSearchState, action) {
  switch(action.type) {
    case SET_CITY_SEARCH:
      return {
        ...state,
        city: action.payload
      };
    case SET_COUNTRY_SEARCH:
      return {
        ...state,
        country: action.payload
      };
    case SET_CATEGORY_SEARCH:
      return {
        ...state,
        category: action.payload
      }
    case GET_SHOPS_BEGIN:
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
    case GET_COMMENTS_SUCCESS:
      return {
        ...state,
        comments:action.comments
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
  shopIsCreated: false,
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
  case CREATE_SHOP_SUCCESS:
    return {
      ...state,
      shopIsCreated: action.payload
    }
  default:
    return state;
  }
}

export default combineReducers({
  search: searchReducer,
  web3: web3Reducer,
});
