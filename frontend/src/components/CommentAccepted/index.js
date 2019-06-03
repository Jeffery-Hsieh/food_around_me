import React, { Component } from "react"
import { Link } from "react-router-dom"

class CommentAccepted extends Component {
  handleExpand = () => {
    const { id, viewPrice, handleExpand } = this.props
    handleExpand(id, viewPrice)
  }

  render() {
    const { author, description, viewPrice } = this.props
    return(
        <div className="comment">
          <div className="comment__body">
            <span className="comment__title">Author: {author}</span>
            <p>{description}</p>
            <button
              onClick={this.handleExpand}
            >
            <p>viewPrice</p>
            </button>
          </div>
        </div>
    )
  }
}


export default CommentAccepted
