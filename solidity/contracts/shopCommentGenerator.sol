pragma solidity >=0.5.0 <0.6.0;

import "./shop.sol";

contract shopCommentGenerator is Shop {

    constructor(string memory _shopName) Shop(_shopName) public {}

    modifier isCustomer() {
        require(hasBeenVisited[msg.sender]);
        _;
    }

    function _createComment(address _author, string memory _description) internal {
        uint id = commentList.push(Comment(_author,_description,false)) - 1;
        commentToOwner[id] = _author;
    }

    function createComment(string calldata _description) isCustomer external payable {
        require(!isInvestorOrAuthor[msg.sender]);
        require(msg.value >= createCommentPrice);
        _createComment(msg.sender, _description);
        isInvestorOrAuthor[msg.sender] = true;
    }

    function vote(uint _commentId) isCustomer external payable {
        require(!commentList[_commentId].accepted);
        require(hasBeenVisited[msg.sender]);
        require(!isInvestorOrAuthor[msg.sender]);
        require(msg.value >= votePrice);

        isInvestorOrAuthor[msg.sender] = true;
        investors[_commentId].push(msg.sender);
        commentAgreementCount[_commentId] = commentAgreementCount[_commentId].add(1);

        if(commentAgreementCount[_commentId] >= 3) {
            commentList[_commentId].accepted = true;
            reviewPrice[_commentId] = createCommentPrice;
            createCommentPrice = createCommentPrice.add(2);
            votePrice = votePrice.add(1);
        }
    }
}
