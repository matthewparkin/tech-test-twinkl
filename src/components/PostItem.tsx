import React from 'react';

interface Post {
  id: number;
  title: string;
  body: string;
}

interface Props {
  post: Post;
}

const PostItem: React.FC<Props> = ({ post }) => {
    console.log("Rendering PostItem with posst:", post);
  return (
    <li>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
    </li>
  );
};

export default PostItem;