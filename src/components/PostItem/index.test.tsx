import { render, screen, fireEvent } from "@testing-library/react";
import PostItem from ".";

describe("PostItem Component", () => {
    const mockOnRemovePost = jest.fn();
    const post = { id: 1, title: "Post 1", body: "I'm a first post" };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders the post title and body", () => {
        render(<PostItem post={post} onRemovePost={mockOnRemovePost} />);
        expect(screen.getByText("Post 1")).toBeInTheDocument();
        expect(screen.getByText("I'm a first post")).toBeInTheDocument();
    });

    test("calls onRemovePost when the remove button is clicked", () => {
        render(<PostItem post={post} onRemovePost={mockOnRemovePost} />);
        const removeButton = screen.getByTestId("remove-post-1");
        fireEvent.click(removeButton);
        expect(mockOnRemovePost).toHaveBeenCalledWith(1);
        expect(mockOnRemovePost).toHaveBeenCalledTimes(1);
    });
});