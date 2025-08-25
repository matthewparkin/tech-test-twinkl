import { render } from "@testing-library/react";
import LoadingScreen from ".";

describe("Loading Component", () => {
    test("renders the loading message", () => {
        const { getByText } = render(<LoadingScreen />);
        const loadingElement = getByText("Loading..."); // Case-insensitive match
        expect(loadingElement).toBeInTheDocument();
    });
});