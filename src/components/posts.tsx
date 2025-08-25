import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import PostList from "./PostList";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
import NoPosts from "./NoPosts";

interface Post {
    id: number;
    title: string;
    body: string;
}

const API_URL = "https://jsonplaceholder.typicode.com/posts";

const Posts = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                console.log("I'm trying to get some posts");
                setLoading(true);
                setError(null);

                const response = await fetch(API_URL, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch posts');
                }

                const data: Post[] = await response.json();
                setPosts(data);
                setFilteredPosts(data);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred');
                }
            }
            // might be a nicer place to put this, but for now it works.
            setLoading(false);
        };

        fetchPosts();
    }, []);

    // Filter posts - this should probably be shifted to a use memo. Looks like this will rerender a lot unnecessarily.
    useEffect(() => {
        const filtered = posts.filter((post) =>
            post.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredPosts(filtered);
    }, [searchQuery, posts]);

    // These are semi horrible, but fine as a fallback for the example will replace later if time. 
    // Might be a nicer way to handle rendering posts. But this way means I can keep the loading, error, and no posts logic in one place.
    // Might be better to handle errors as a modal but this is a bit beyond the brief. 
    const handleRenderPosts = () => {
        switch (true) {
            case loading:
                return <Loading />;
        
            case !!error:
                return <ErrorMessage message={error} />;
        
            case filteredPosts.length === 0:
                return <NoPosts />;
        
            default:
                return <PostList posts={filteredPosts} />;
        }
      };

    return (
        <div>
            <h2>Posts</h2>
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            {handleRenderPosts()}
        </div>
    );
};

export default Posts;