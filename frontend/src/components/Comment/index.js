import React from "react";
import { shorten } from "../../utils/stringUtils";
import { Link } from "react-router-dom";
import './index.css'
export default function Comment({ author, content, cost}) {
  return (
    <div className="comment">
      <div className="comment__body">
        <span className="comment__title">Author: {author}</span>

        <Link>
          <p className="comment__summary">{shorten(content)}</p>
          <p>cost: {cost}</p>
        </Link>
      </div>
    </div>
  );
}
