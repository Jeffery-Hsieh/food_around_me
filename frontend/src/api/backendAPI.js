import axios from 'axios';

const base_url = "http://localhost:5003/api"

export function createShop(shopData) {
  const url = `${base_url}/createShop`
  return axios.post(url, shopData)
    .catch(err => Promise.reject(err))
}

export function getShops(category, country, city) {
  const url = `${base_url}/shops`
  return axios.get(url,
    {
      params: {
        category: category,
        country: country,
        city: city,
      }
    })
    .then(res => {
      return {
        data: res.data
      };
    })
    .catch(err => Promise.reject(err))
}

export function getShopDetail(shopId) {
  const url = `${base_url}/shops/${shopId}`
  return axios.get(url,
    {
      params: {
        shopId: shopId
      }
  })
}
