pragma solidity >=0.5.0 <0.6.0;

import "./shopCommentFactory.sol";

contract shopGenerator {

	address private owner;

    constructor() public {
        owner = msg.sender;
    }

	event newShop(shopCommentFactory _newContract);

	function shopContractGenerator(address _owner, string memory _shopName) public {
		shopCommentFactory _newContract = new shopCommentFactory(_owner, _shopName);
		emit newShop(_newContract);
	}
}
