import { render, screen } from "@testing-library/react";
import NoPosts from ".";

describe("NoPosts Component", () => {
    test("renders the no posts message", () => {
        render(<NoPosts />);
        expect(screen.getByTestId("empty-state")).toHaveTextContent("No posts available.");
    });
});