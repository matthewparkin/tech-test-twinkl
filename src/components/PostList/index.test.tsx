import { render, screen, fireEvent } from "@testing-library/react";
import PostList from ".";

describe("PostList Component", () => {
    const mockOnRemovePost = jest.fn();
    const posts = [
        { id: 1, title: "Post 1", body: "This is the first post" },
        { id: 2, title: "Post 2", body: "This is the second post" },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders a list of posts", () => {
        render(<PostList posts={posts} onRemovePost={mockOnRemovePost} />);
        expect(screen.getByText("Post 1")).toBeInTheDocument();
        expect(screen.getByText("Post 2")).toBeInTheDocument();
    });

    test("calls onRemovePost when the remove button is clicked", () => {
        render(<PostList posts={posts} onRemovePost={mockOnRemovePost} />);
        const removeButton = screen.getByTestId("remove-post-1");
        fireEvent.click(removeButton);
        expect(mockOnRemovePost).toHaveBeenCalledWith(1);
        expect(mockOnRemovePost).toHaveBeenCalledTimes(1);
    });

    test("renders an empty list when no posts are provided", () => {
        render(<PostList posts={[]} onRemovePost={mockOnRemovePost} />);
        expect(screen.queryByText("Post 1")).not.toBeInTheDocument();
        expect(screen.queryByText("Post 2")).not.toBeInTheDocument();
    });
});