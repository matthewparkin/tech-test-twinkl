import { render } from "@testing-library/react";
import ErrorMessage from ".";

describe("ErrorMessage Component", () => {
    test("renders the error message", () => {
        const errorMessage = "Something went wrong!";
        const { getByText } = render(<ErrorMessage message={errorMessage} />);
        const errorElement = getByText(`Error: ${errorMessage}`);
        expect(errorElement).toBeInTheDocument();
    });
});