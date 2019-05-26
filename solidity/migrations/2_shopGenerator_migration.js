var ShopInstance = artifacts.require("./shopCommentGenerator.sol");
var ShopGenerator = artifacts.require("./shopGenerator.sol");

const productName = 'Shop around me';

module.exports = function(deployer, network, accounts) {
	deployer.deploy(ShopGenerator);
};
