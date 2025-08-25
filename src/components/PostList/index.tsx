import React from "react";
import PostItem from "../PostItem";
import { Post } from "@/types";

interface Props {
    posts: Post[];
    onRemovePost: (id: number) => void;
}

const PostList: React.FC<Props> = ({ posts, onRemovePost }) => {
    // console.log("Rendering PostList with posts:", posts);
    return (
        <ul>
            {posts.map((post) => (
                <PostItem key={post.id} post={post} onRemovePost={onRemovePost} />
            ))}
        </ul>
    );
};

export default PostList;