import { fireEvent, render, waitFor } from "@testing-library/react";
import PostPage from ".";

global.fetch = jest.fn();

describe("PostPage Component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders initial load state", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => [],
        });

        const { getByTestId, queryByTestId } = render(<PostPage />);

        expect(getByTestId("loading")).toBeInTheDocument();

        await waitFor(() => {
            expect(queryByTestId("loading")).not.toBeInTheDocument();
        });
    });

    test("renders posts after fetching", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => [
                { id: 1, title: "Post 1", body: "This is the first post" },
                { id: 2, title: "Post 2", body: "This is the second post" },
            ],
        });

        const { getByTestId } = render(<PostPage />);

        await waitFor(() => {
            expect(getByTestId("post-1")).toBeInTheDocument();
            expect(getByTestId("post-2")).toBeInTheDocument();
        });
    });

    test("handles fetch error", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
        });

        const { getByTestId } = render(<PostPage />);

        await waitFor(() => {
            expect(getByTestId("error-message")).toHaveTextContent("Failed to fetch posts");
        });
    });

    test("handles error", async () => {
        (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

        const { getByTestId } = render(<PostPage />);

        await waitFor(() => {
            expect(getByTestId("error-message")).toHaveTextContent("Network error");
        });
    });

    test("renders empty state when no posts are available", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => [],
        });

        const { getByTestId } = render(<PostPage />);

        await waitFor(() => {
            expect(getByTestId("empty-state")).toHaveTextContent("No posts available.");
        });
    });

    test("filters posts based on search query", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => [
                { id: 1, title: "Post 1", body: "This is the first post" },
                { id: 2, title: "Post 2", body: "This is the second post" },
            ],
        });

        const { getByPlaceholderText, getByTestId, queryByTestId } = render(<PostPage />);

        await waitFor(() => {
            expect(getByTestId("post-1")).toBeInTheDocument();
            expect(getByTestId("post-2")).toBeInTheDocument();
        });

        const searchInput = getByPlaceholderText("Search posts by title...");
        fireEvent.change(searchInput, { target: { value: "Post 1" } });

        await waitFor(() => {
            expect(getByTestId("post-1")).toBeInTheDocument();
            expect(queryByTestId("post-2")).not.toBeInTheDocument();
        });
    });
    
    test("removes a post successfully", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => [
                { id: 1, title: "Post 1", body: "This is the first post" },
                { id: 2, title: "Post 2", body: "This is the second post" },
            ],
        });

        const { getByTestId, queryByTestId } = render(<PostPage />);

        await waitFor(() => {
            expect(getByTestId("post-1")).toBeInTheDocument();
            expect(getByTestId("post-2")).toBeInTheDocument();
        });

        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
        });

        const removeButton = getByTestId("remove-post-1");
        fireEvent.click(removeButton);

        await waitFor(() => {
            expect(queryByTestId("post-1")).not.toBeInTheDocument();
            expect(getByTestId("post-2")).toBeInTheDocument();
        });
    });

});