pragma solidity >=0.5.0 <0.6.0;

import "./safeMath.sol";

contract Shop {
    using SafeMath for uint;

    string public shopName;
    address public shopOwner;
    uint public votePrice;
    uint public createCommentPrice;

    mapping(address => bool) internal hasBeenVisited;

    modifier onlyOwner() {
        require(shopOwner == msg.sender);
        _;
    }

    constructor(address _owner, string memory _shopName) public {
        shopOwner = _owner;
        shopName = _shopName;
    }

    function addCustomer(address _customerAddress) external onlyOwner {
        hasBeenVisited[_customerAddress] = true;
    }
}
