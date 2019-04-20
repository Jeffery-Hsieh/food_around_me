var Plateform = artifacts.require("./Plateform.sol");

const votedPrice = 1000000000000000; //WEI
const createShopPrice = 3000000000000000;


module.exports = function(deployer, network, accounts) {
  deployer.deploy(Plateform,votedPrice,createShopPrice);
};
