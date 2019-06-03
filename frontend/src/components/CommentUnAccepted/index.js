import React, { Component } from "react";
import { Link } from "react-router-dom";
import './index.css'

class CommentUnAccepted extends Component {

  VoteBtnOnClick = event => {
    const { id, viewPrice, handleVoting } = this.props
    handleVoting(id, viewPrice)
  }

  render() {
    const { author, description, viewPrice, handleVoting } = this.props
    return(
        <div className="comment">
          <div className="comment__body">
            <span className="comment__title">Author: {author}</span>
            <p>{description}</p>
            <button
              className="btn btn-primary"
              onClick={this.VoteBtnOnClick}
              >
              vote
            </button>
          </div>
        </div>
    )
  }
}


export default CommentUnAccepted
