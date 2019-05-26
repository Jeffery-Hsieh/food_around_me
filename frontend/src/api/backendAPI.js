import axios from 'axios';

export function createShop(shopData) {
  console.log(shopData)
  const url = "http://localhost:5003/api/createShop"
  return axios.post(url, shopData)
    .catch(err => Promise.reject(err))
}

export function getShops(category, country, city) {
  const url = "http://localhost:5003/api/shops"
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
