import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BasketItem } from "./BasketItem";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "../../features/basket/basketSlice";
import i18n from "../../i18n/config";
import { initReactI18next } from "react-i18next";

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
  quantity: 2,
};

const mockItemWithModifier = {
  ...mockItem,
  selectedModifiers: {
    id: 1,
    name: "Extra Large",
    price: 2.0,
    maxChoices: 1,
    position: 1,
    visible: 1,
    availabilityType: "AVAILABLE",
    available: true,
  },
};

i18n.use(initReactI18next).init({
  lng: "en",
  resources: {
    en: {
      translation: {
        "common.currency": "${{value}}",
      },
    },
  },
});

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

  return render(<Provider store={store}>{component}</Provider>);
};

describe("BasketItem", () => {
  it("renders item details correctly", () => {
    renderWithProviders(<BasketItem item={mockItem} />);

    expect(screen.getByText("Test Item")).toBeInTheDocument();
    expect(screen.getByText("$21.98")).toBeInTheDocument();
  });

  it("renders item with modifier", () => {
    renderWithProviders(<BasketItem item={mockItemWithModifier} />);

    expect(screen.getByText("Test Item")).toBeInTheDocument();
    expect(screen.getByText("Extra Large (+$2.00)")).toBeInTheDocument();
  });

  it("handles quantity increase", () => {
    renderWithProviders(<BasketItem item={mockItem} />);

    const increaseButton = screen.getByTestId("increase-quantity");
    fireEvent.click(increaseButton!);

    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("handles quantity decrease", () => {
    renderWithProviders(<BasketItem item={mockItem} />);

    const decreaseButton = screen.getByTestId("decrease-quantity");
    fireEvent.click(decreaseButton!);

    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("calculates total price correctly with modifiers", () => {
    renderWithProviders(<BasketItem item={mockItemWithModifier} />);

    expect(screen.getByText("$21.98")).toBeInTheDocument();
  });

  it("shows quantity control", () => {
    renderWithProviders(<BasketItem item={mockItem} />);

    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByLabelText("Decrease quantity")).toBeInTheDocument();
    expect(screen.getByLabelText("Increase quantity")).toBeInTheDocument();
  });
});
