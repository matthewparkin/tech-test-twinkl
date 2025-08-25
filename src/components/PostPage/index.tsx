import { useEffect, useState } from "react";
import ErrorMessage from "../ErrorMessage";
import LoadingScreen from "../LoadingScreen";
import NoPosts from "../NoPosts";
import PostList from "../PostList";
import SearchBar from "../SearchBar";
import { useDebounce } from "../utils";
import { API_URL } from "../../constants/config";
import { Post } from "@/types";

const PostPage = () => {
    // can group up on the state some dont need to be independent
    const [posts, setPosts] = useState<Post[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    // Could potentially use memo here but for now this isn"t heavy so i"ll leave it until it bcomes heavy
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // I should split this into more functions to help with readability and to make it easier to test
                // console.log("I"m trying to get some posts");
                setLoading(true);
                setError(null);

                const response = await fetch(API_URL, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch posts");
                }

                const data: Post[] = await response.json();
                setPosts(data);
                setFilteredPosts(data);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("An unknown error occurred");
                }
            }
            // might be a nicer place to put this, but for now it works.
            setLoading(false);
        };

        fetchPosts();
    }, []);

    useEffect(() => {
        // Simple filtering logic using the debounce
        const filtered = posts.filter((post) =>
            post.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
        );
        setFilteredPosts(filtered);
    }, [debouncedSearchQuery, posts]);

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
            return <LoadingScreen />;
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

export default PostPage;