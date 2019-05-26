pragma solidity >=0.5.0 <0.6.0;

import "./safeMath.sol";
import "./ownable.sol";

contract Shop is Ownable {
    using SafeMath for uint;

    struct Comment {
        address author;
        string description;
        bool accepted;
    }

    string shopName;
    uint public votePrice;
    uint public createCommentPrice;

    Comment[] public commentList;

    //cutomer has been visited
    mapping(address => bool) internal hasBeenVisited;

    mapping(uint => address) public commentToOwner;
    mapping(uint => uint) internal commentAgreementCount;

    mapping(address => bool) internal isInvestorOrAuthor;
    mapping(uint => address[]) internal investors;

    mapping(uint => uint) public reviewPrice;


    constructor(string memory _shopName) public {
        shopName = _shopName;
        votePrice = 1;
        createCommentPrice = 2;
    }

    function addCutomer(address _customerAddress) external onlyOwner {
        hasBeenVisited[_customerAddress] = true;
    }
}
