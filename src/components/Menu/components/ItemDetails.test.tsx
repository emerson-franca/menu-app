import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ItemDetails } from "./ItemDetails";
import { Provider } from "react-redux";
import { I18nextProvider } from "react-i18next";
import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "../../../features/basket/basketSlice";
import i18n from "../../../i18n/config";
import { RestaurantProvider } from "../../../contexts/RestaurantContext";

const mockRestaurantData = {
  id: 1,
  name: "Test Restaurant",
  internalName: "test_restaurant",
  locale: "en-US",
  webSettings: {
    id: 1,
    venueId: 1,
    bannerImage: "test-banner.jpg",
    backgroundColour: "#FFFFFF",
    primaryColour: "#000000",
    primaryColourHover: "#333333",
    navBackgroundColour: "#4F372F",
  },
  ccy: "USD",
  ccySymbol: "$",
  currency: "USD",
};

const mockItem = {
  id: 1,
  name: "Test Item",
  description: "Test Description",
  price: 10.99,
  position: 1,
  visible: 1,
  sku: "test-sku",
  available: true,
  availabilityType: "AVAILABLE",
  alcoholic: 0,
  images: [{ id: 1, image: "test-image.jpg" }],
  modifiers: [
    {
      id: 1,
      name: "Size",
      maxChoices: 1,
      items: [
        {
          id: 1,
          name: "Large",
          price: 15.99,
          maxChoices: 1,
          position: 1,
          visible: 1,
          availabilityType: "AVAILABLE",
          available: true,
        },
        {
          id: 2,
          name: "Small",
          price: 12.99,
          maxChoices: 1,
          position: 2,
          visible: 1,
          availabilityType: "AVAILABLE",
          available: true,
        },
      ],
      available: true,
      price: 15.99,
    },
  ],
};

const renderWithProviders = (
  component: React.ReactElement,
  initialState = {}
) => {
  const store = configureStore({
    reducer: {
      basket: basketReducer,
    },
    preloadedState: {
      basket: {
        items: [],
        total: 0,
        ...initialState,
      },
    },
  });

  return render(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <RestaurantProvider data={mockRestaurantData}>
          {component}
        </RestaurantProvider>
      </I18nextProvider>
    </Provider>
  );
};

describe("ItemDetails", () => {
  const mockOnClose = jest.fn();

  it("renders item details when open", () => {
    renderWithProviders(
      <ItemDetails item={mockItem} onClose={mockOnClose} isOpen={true} />
    );

    expect(screen.getByText("Test Item")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("does not render when closed", () => {
    renderWithProviders(
      <ItemDetails item={mockItem} onClose={mockOnClose} isOpen={false} />
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    renderWithProviders(
      <ItemDetails item={mockItem} onClose={mockOnClose} isOpen={true} />
    );

    fireEvent.click(screen.getByTestId("close-button"));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("displays size options when item has modifiers", () => {
    renderWithProviders(
      <ItemDetails item={mockItem} onClose={mockOnClose} isOpen={true} />
    );

    expect(screen.getByText("Large")).toBeInTheDocument();
    expect(screen.getByText("Small")).toBeInTheDocument();
  });

  it("displays correct price based on selected size", () => {
    renderWithProviders(
      <ItemDetails item={mockItem} onClose={mockOnClose} isOpen={true} />
    );

    const largeOption = screen.getByText("Large");
    fireEvent.click(largeOption);
    expect(screen.getByText(/USD 15.99/i)).toBeInTheDocument();
  });
});
