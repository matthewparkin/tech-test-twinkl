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

// put this in a config file
const API_URL = "https://jsonplaceholder.typicode.com/posts";

const Posts = () => {
    // can group up on the state some dont need to be independent
    const [posts, setPosts] = useState<Post[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');

    // Could potentially use memo here but for now this isn't heavy so i'll leave it until it bcomes heavy
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // I should split this into more functions to help with readability and to make it easier to test
                // console.log("I'm trying to get some posts");
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
        // Quick and dirty filter, could be improved with a debounce or similar to avoid too many renders.
        const filtered = posts.filter((post) =>
            post.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredPosts(filtered);
    }, [searchQuery, posts]);


    const handleRemovePost = async (id: number) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete the post");
            }

            const updatedPosts = posts.filter((post) => post.id !== id);
            setPosts(updatedPosts);

            const updatedFilteredPosts = filteredPosts.filter((post) => post.id !== id);
            setFilteredPosts(updatedFilteredPosts);
            console.log(`Post with id ${id} deleted successfully`);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unknown error occurred while deleting the post");
            }
        }
    };


    // These are semi horrible, but fine as a fallback for now, will replace later if time. 
    // Might be a nicer way to handle rendering posts. But this way means I can keep the loading, error, and no posts logic in one place.
    // Might be better to handle errors as a modal but this is a bit beyond the brief. 
    const handleRenderPosts = () => {
        if (loading) {
            return <Loading />;
        }

        if (error) {
            return <ErrorMessage message={error} />;
        }

        if (filteredPosts.length === 0) {
            return <NoPosts />;
        }

        return <PostList posts={filteredPosts} onRemovePost={handleRemovePost} />;
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