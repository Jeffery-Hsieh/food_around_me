pragma solidity >0.5.0 <0.6.0;

contract Plateform {
    struct Comment {
        address author;
        string description;
        bool accepted;
    }

    struct Shop {
        address owner;
        string shopName;
    }

    event CommentAccepted(uint _commentId, uint _shopId);

    Comment[] private comments;
    Shop[] private shops;

    uint256 private createShopPrice;
    uint256 private acceptedCommentCount;
    uint256 startPrice = 1 ether;

    // shopId => price
    mapping(uint256 => uint256) private commentPrice;
    mapping(uint256 => uint256) private commentIdToShopId;
    // commentId => count
    mapping(uint256 => uint256) private acceptedCount;
    mapping(uint256 => uint256[]) private shopComment;

    constructor(uint256 _createShopPrice) public {
        createShopPrice = _createShopPrice;

    }

    function createShop(string memory _shopName) public payable {
        require(msg.value >= createShopPrice);
        uint shopId = shops.push(Shop(msg.sender, _shopName));
        commentPrice[shopId] = startPrice;
    }

    function createComment(uint _shopId, string memory _description) public payable {
        require(msg.value >= commentPrice[_shopId]);

        uint commentId = comments.push(Comment(msg.sender, _description, false)) - 1;
        commentIdToShopId[commentId] = _shopId;
    }

    function vote(uint _commentId) public payable {
        require(!comments[_commentId].accepted);

        acceptedCount[_commentId] = acceptedCount[_commentId] + 1;

        if(acceptedCount[_commentId] >= 2) {
            comments[_commentId].accepted = true;
            uint256 _shopId = commentIdToShopId[_commentId];
            shopComment[_shopId].push(_commentId);
            emit CommentAccepted(_commentId, _shopId);
        }
    }

    function getCreateCommentPrice(uint256 _shopId) public view returns(uint256) {
        return commentPrice[_shopId];
    }

    function getShopComment(uint256 _shopId) public view returns(uint256[] memory) {
        return shopComment[_shopId];
    }

}
