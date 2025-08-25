import { render, fireEvent } from "@testing-library/react";
import SearchBar from ".";

describe("SearchBar Component", () => {
    test("renders the search input with the correct placeholder", () => {
        const { getByPlaceholderText } = render(
            <SearchBar searchQuery="" setSearchQuery={jest.fn()} />
        );

        const inputElement = getByPlaceholderText(/search posts by title/i);
        expect(inputElement).toBeInTheDocument();
    });

    test("displays the correct value in the input field", () => {
        const { getByDisplayValue } = render(
            <SearchBar searchQuery="test query" setSearchQuery={jest.fn()} />
        );

        const inputElement = getByDisplayValue("test query");
        expect(inputElement).toBeInTheDocument();
    });

    test("calls setSearchQuery when the input value changes", () => {
        const setSearchQueryMock = jest.fn();
        const { getByPlaceholderText } = render(
            <SearchBar searchQuery="" setSearchQuery={setSearchQueryMock} />
        );

        const inputElement = getByPlaceholderText(/search posts by title/i);
        fireEvent.change(inputElement, { target: { value: "new query" } });

        expect(setSearchQueryMock).toHaveBeenCalledWith("new query");
    });
});