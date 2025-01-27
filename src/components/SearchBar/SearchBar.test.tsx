import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchBar } from "./SearchBar";
import i18n from "../../i18n/config";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  lng: "en",
  resources: {
    en: {
      translation: {
        "search.placeholder": "Search menu items",
      },
    },
  },
});

describe("SearchBar", () => {
  const mockSetSearchQuery = jest.fn();
  const defaultProps = {
    searchQuery: "",
    setSearchQuery: mockSetSearchQuery,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with default props", () => {
    render(<SearchBar {...defaultProps} />);

    const searchInput = screen.getByPlaceholderText(/search menu items/i);
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveValue("");
  });

  it("displays the current search query", () => {
    const searchQuery = "burger";
    render(<SearchBar {...defaultProps} searchQuery={searchQuery} />);

    const searchInput = screen.getByPlaceholderText(/search menu items/i);
    expect(searchInput).toHaveValue(searchQuery);
  });

  it("has the correct styling classes", () => {
    render(<SearchBar {...defaultProps} />);

    const inputContainer = screen.getByTestId("search-container");
    expect(inputContainer).toHaveClass("p-4");

    const inputWrapper = screen.getByTestId("search-wrapper");
    expect(inputWrapper).toHaveClass("relative");

    const input = screen.getByRole("textbox");
    expect(input).toHaveClass(
      "w-full",
      "pl-10",
      "pr-4",
      "py-2",
      "border",
      "border-[#8A94A4]",
      "rounded-lg"
    );
  });

  it("has the search icon", () => {
    render(<SearchBar {...defaultProps} />);

    const searchIcon = screen.getByTestId("search-icon");
    expect(searchIcon).toBeInTheDocument();
    expect(searchIcon).toHaveClass("h-5", "w-5", "text-gray-400");
  });

  it("has proper focus styles", async () => {
    render(<SearchBar {...defaultProps} />);
    const user = userEvent.setup();

    const input = screen.getByRole("textbox");
    await user.click(input);

    expect(input).toHaveFocus();
    expect(input).toHaveClass(
      "focus:outline-none",
      "focus:ring-2",
      "focus:ring-primary"
    );
  });
});
