pragma solidity >=0.5.0 <0.6.0;

import "./shop.sol";

contract shopCommentFactory is Shop {

    struct Comment {
        address author;
        string description;
    }

    Comment[] private commentList;

    mapping(uint => address payable) public commentToOwner;
    mapping(uint => uint) public viewPrice;
    mapping(address => bool) public isInvestorOrAuthor;
    mapping(uint => uint) internal commentAgreementCount;
    mapping(uint => address[]) internal investors;

    event createCommentSuccess(uint commentId);
    event voteCountIncrease(uint commentId, uint viewPrice);
    event getCommentSuccess(string description);

    modifier isCustomer() {
        require(hasBeenVisited[msg.sender]);
        _;
    }

    constructor(address _owner, string memory _shopName) Shop(_owner, _shopName) public {
        votePrice = 1;
        createCommentPrice = 2;
    }

    function _createComment(address payable _author, string memory _description) internal {
        uint id = commentList.push(Comment(_author,_description)) - 1;
        commentToOwner[id] = _author;
        emit createCommentSuccess(id);
    }

    function createComment(string memory _description) isCustomer payable public {
        require(!isInvestorOrAuthor[msg.sender]);
        require(msg.value >= createCommentPrice);

        _createComment(msg.sender, _description);
        isInvestorOrAuthor[msg.sender] = true;
    }

    function vote(uint _commentId) isCustomer external payable {
        require(viewPrice[_commentId] == 0);
        require(hasBeenVisited[msg.sender]);
        require(!isInvestorOrAuthor[msg.sender]);
        require(msg.value >= votePrice);

        isInvestorOrAuthor[msg.sender] = true;
        investors[_commentId].push(msg.sender);
        commentAgreementCount[_commentId] = commentAgreementCount[_commentId].add(1);

        if(commentAgreementCount[_commentId] >= 3) {
            viewPrice[_commentId] = createCommentPrice;
            createCommentPrice = createCommentPrice.add(2);
            votePrice = votePrice.add(1);
        }

        emit voteCountIncrease(_commentId, viewPrice[_commentId]);
    }

    function getCommentAccepted(uint _commentId) external payable {
		    require(msg.value >= viewPrice[_commentId]);

        commentToOwner[_commentId].transfer(viewPrice[_commentId]);
        emit getCommentSuccess(commentList[_commentId].description);
    }
}
