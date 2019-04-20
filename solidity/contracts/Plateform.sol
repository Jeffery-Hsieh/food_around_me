pragma solidity >0.4.99 <0.6.0;

contract Plateform {
    struct Comment {
        address author;
        string shopName;
        string description;
        bool accepted;
    }

    Comment[] comments;

    uint256 votePrice;
    uint256 createShopPrice;
    uint256 acceptedCommentCount;

    mapping(string => uint256) commentPrice;
    mapping(string => address) shopNameToAddress;
    mapping(uint256 => address) commentToOwner;
    mapping(uint256 => uint256) acceptedCount;

    constructor(uint256 _votePrice, uint256 _createShopPrice) public {
        votePrice = _votePrice;
        createShopPrice = _createShopPrice;
    }

    function createShop(string memory _shopName) public payable {
        require(msg.value >= createShopPrice);

        commentPrice[_shopName] = 1;
        shopNameToAddress[_shopName] = msg.sender;
    }

    function createComment(string memory _shopName, string memory _description) public payable {
        require(msg.value >= commentPrice[_shopName]);

        uint id = comments.push(Comment(msg.sender, _shopName, _description, false)) - 1;
        commentToOwner[id] = msg.sender;
    }

    function voted(uint _commentId) public payable {
        require(!comments[_commentId].accepted);

        acceptedCount[_commentId] = acceptedCount[_commentId] + 1;

        if(acceptedCount[_commentId] >= 2) {
            string memory shopName = comments[_commentId].shopName;
            comments[_commentId].accepted = true;
            commentPrice[shopName] = commentPrice[shopName] + 1;
        }
    }

    function getCommentPrice(string memory _shopName) public view returns(uint256) {
        return commentPrice[_shopName];
    }

    function getComment(uint256 _commentId) public view returns (address, string memory, string memory, bool, uint256) {
        Comment memory comment = comments[_commentId];
        return (comment.author, comment.shopName, comment.description, comment.accepted, acceptedCount[_commentId]);
    }

}
