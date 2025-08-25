import React from 'react';

interface Post {
    id: number;
    title: string;
    body: string;
}

interface Props {
    post: Post;
    onRemovePost: (id: number) => void;
}

const PostItem: React.FC<Props> = ({ post, onRemovePost }) => {
    // console.log("Rendering PostItem with posst:", post);
    return (
        <li>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <button onClick={() => onRemovePost(post.id)}>Remove</button>
        </li>
    );
};

export default PostItem;