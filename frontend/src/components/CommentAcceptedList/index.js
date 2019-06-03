import React from "react";
import CommentAccepted from "../CommentAccepted"

const CommentAcceptedList = ({ comments, handleExpand, commentFromBlockChain }) => {
  return(
    <React.Fragment>
      <h4>Comments Accepted</h4>
      <ul>
        {comments.map(comment => {
          commentFromBlockChain.forEach(item => {
            if(comment.id == item.commentId) {
              comment.description = item.commentContent
            }
          })
          return(
            <li key={comment.id}>
              <CommentAccepted
              {...comment}
              handleExpand={handleExpand}
              />
            </li>
          )}
        )}
      </ul>
    </React.Fragment>
  )
}

export default CommentAcceptedList;
