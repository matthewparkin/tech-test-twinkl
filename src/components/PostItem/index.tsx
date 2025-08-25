import { Post } from "@/types";
import React from "react";

interface Props {
    post: Post;
    onRemovePost: (id: number) => void;
}

const PostItem: React.FC<Props> = ({ post, onRemovePost }) => {
    // console.log("Rendering PostItem with posst:", post);
    return (
        <li data-testid={`post-${post.id}`}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <button data-testid={`remove-post-${post.id}`} onClick={() => onRemovePost(post.id)}>Remove</button>
        </li>
    );
};

export default PostItem;