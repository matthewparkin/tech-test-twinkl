import { Post } from "@/types";
import React from "react";
import "./index.scss"; // Importing styles for PostItem

interface Props {
    post: Post;
    onRemovePost: (id: number) => void;
}

const PostItem: React.FC<Props> = ({ post, onRemovePost }) => {
    // console.log("Rendering PostItem with posst:", post);
    return (
        <li className="post-item" data-testid={`post-${post.id}`}>

            <div className="post-content">
                <h3>{post.title}</h3>
                <p>{post.body}</p>
            </div>

            <div className="divider"></div>
            <button className="remove-button" data-testid={`remove-post-${post.id}`} onClick={() => onRemovePost(post.id)}>Remove</button>
        </li>
    );
};

export default PostItem;