import Web3 from 'web3'
import { ABI as generatorABI, address as generatorAddress } from '../utils/constants/contracts/ShopGenerator'
import { ABI as shopABI } from '../utils/constants/contracts/Shop'

export function getWeb3() {
  return new Promise(function (resolve, reject) {
  // Check for injected web3 (mist/metamask)
  var web3js = window.web3
  if (typeof web3js !== 'undefined') {
    var web3 = new Web3(web3js.currentProvider)
    web3.eth.net.isListening().then(result => {
      resolve({
        injectedWeb3 : result,
        web3:web3
      })
    })
  }
  else {
    // web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545')) GANACHE FALLBACK
    reject(new Error('Unable to connect to Metamask'))
  }
})
  .then(result => {
    return new Promise(function (resolve, reject) {
      // Retrieve network ID
      result.web3.eth.net.getId((err, networkId) => {
        if (err) {
          // If we can't find a networkId keep result the same and reject the promise
          reject(new Error('Unable to retrieve network ID'))
        } else {
          // Assign the networkId property to our result and resolve promise
          result = Object.assign({}, result, {networkId})
          resolve(result)
        }
      })
    })
  })
  .then(result => {
    return new Promise(function (resolve, reject) {
      // Retrieve coinbase
      result.web3.eth.getCoinbase((err, coinbase) => {
        if (err) {
          reject(new Error('Unable to retrieve coinbase'))
        } else {
          result = Object.assign({}, result, { coinbase })
          resolve(result)
        }
      })
    })
  })
  .then(result => {
    return new Promise(function (resolve, reject) {
      // Retrieve balance for coinbase
      result.web3.eth.getBalance(result.coinbase, (err, balance) => {
        if (err) {
          reject(new Error('Unable to retrieve balance for address: ' + result.coinbase))
        } else {
          result = Object.assign({}, result, { balance })
          resolve(result)
        }
      })
    })
  })
}

export function createShop(shopName, account) {
  return new Promise((resolve, reject) => {
    const options = {
      transactionConfirmationBlocks: 1
    };

    let web3 = new Web3(window.web3.currentProvider,null,options)
    let ShopGeneratorContract = web3.eth.Contract(generatorABI, generatorAddress)
    ShopGeneratorContract.methods.createShop(shopName).send({from:account})
    .then((_receipt) => {
        let newContractAddress = _receipt.events.newShop.returnValues._newContract
        console.log("New Shop Contract : " + newContractAddress);
        resolve(newContractAddress)
      })
      .catch(err => {
        console.log(err)
      })
    });
}

export function getComments(address) {
	return new Promise(function(resolve, reject) {
	 let web3 = new Web3(window.web3.currentProvider)
	 let ShopContract = new web3.eth.Contract(shopABI,address)
	 ShopContract.methods.comments().call().then(result => {
		 return({
			 shopContract:ShopContract,
			 comments:result,
		 })
	 })
 })
}
