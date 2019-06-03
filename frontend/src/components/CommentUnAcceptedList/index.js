import React from "react";
import CommentUnAccepted from "../CommentUnAccepted"
import "./index.css";

const CommentUnAcceptedList = ({ comments, votePrice, handleVoting }) => {
  return(
    <React.Fragment>
      <h4>Comments UnAccepted</h4>
      <h5>vote price: {votePrice} ETH</h5>
      <ul className="list-group">
        {comments.map(comment =>
          <li
            key={comment.id}
            className="list-group-item list-group-item-action"
          >
            <CommentUnAccepted
            {...comment}
            handleVoting={handleVoting}
            />
          </li>
        )}
      </ul>
    </React.Fragment>
  )
}

export default CommentUnAcceptedList;
