import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Comment from "../Comment"
import "./index.css";

const CommentList = ({ comments }) => {
  return(
    <React.Fragment>
      <h1>Comments</h1>
      <ul className="comments">
        {comments.map(comment =>
          <li key={comment.id}>
            <Comment
              author={comment.author}
              content={comment.description}
              cost={comment.cost}
              />
          </li>
        )}
      </ul>
    </React.Fragment>
  )
}

export default CommentList;
