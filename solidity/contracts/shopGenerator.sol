pragma solidity >=0.5.0 <0.6.0;

import "./shopCommentGenerator.sol";

contract shopGenerator {

	address private owner;

	constructor() public {
		owner = msg.sender;
	}

	event newShop(shopCommentGenerator _newContract);

	function createShop(string memory _shopName) public {
		shopCommentGenerator _newContract = new shopCommentGenerator(_shopName);
		emit newShop(_newContract);
	}
}
