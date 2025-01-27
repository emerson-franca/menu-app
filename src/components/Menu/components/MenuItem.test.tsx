import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MenuItem } from "./MenuItem";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "../../../features/basket/basketSlice";
import { I18nextProvider } from "react-i18next";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { RestaurantProvider } from "../../../contexts/RestaurantContext";

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
  images: [],
  modifiers: [],
  sku: "TEST1",
  position: 1,
  visible: 1,
  available: true,
  availabilityType: "AVAILABLE",
  alcoholic: 0,
};

const createMockStore = (initialState = {}) => {
  return configureStore({
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
};

const renderWithProviders = (
  component: React.ReactElement,
  initialState = {}
) => {
  const store = createMockStore(initialState);
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

describe("MenuItem", () => {
  it("renders item details correctly", () => {
    renderWithProviders(<MenuItem item={mockItem} />);

    expect(screen.getByTestId("item-name")).toHaveTextContent("Test Item");
    expect(screen.getByTestId("item-description")).toHaveTextContent(
      "Test Description"
    );
    expect(screen.getByTestId("item-price")).toHaveTextContent(/10.99/i);
  });

  it("shows quantity badge when item is in basket", () => {
    const initialState = {
      items: [
        {
          ...mockItem,
          quantity: 2,
        },
      ],
      total: mockItem.price * 2,
    };

    renderWithProviders(<MenuItem item={mockItem} />, initialState);

    const quantityBadge = screen.getByTestId("quantity-badge");
    expect(quantityBadge).toBeInTheDocument();
    expect(quantityBadge).toHaveTextContent("2");
  });

  it("does not show quantity badge when item is not in basket", () => {
    renderWithProviders(<MenuItem item={mockItem} />);

    expect(screen.queryByTestId("quantity-badge")).not.toBeInTheDocument();
  });

  it("opens modal when clicking on item", () => {
    const itemWithModifiers = {
      ...mockItem,
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
          ],
          available: true,
          price: 15.99,
        },
      ],
    };

    renderWithProviders(<MenuItem item={itemWithModifiers} />);

    const menuItem = screen.getByTestId("menu-item");
    fireEvent.click(menuItem);

    const modal = screen.getByRole("dialog");
    expect(modal).toBeInTheDocument();
  });

  it("displays correct price for items with modifiers and no base price", () => {
    const itemWithModifiers = {
      ...mockItem,
      price: 0,
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
          ],
          available: true,
          price: 15.99,
        },
      ],
    };

    renderWithProviders(<MenuItem item={itemWithModifiers} />);

    expect(screen.getByTestId("item-price")).toHaveTextContent(/15.99/i);
  });

  it("displays image when provided", () => {
    const itemWithImage = {
      ...mockItem,
      images: [
        {
          id: 1,
          image: "test-image.jpg",
        },
      ],
    };

    renderWithProviders(<MenuItem item={itemWithImage} />);

    const image = screen.getByTestId("item-image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "test-image.jpg");
    expect(image).toHaveAttribute("loading", "lazy");
  });

  it("calculates total quantity from multiple basket items with same id", () => {
    const initialState = {
      items: [
        { ...mockItem, quantity: 2 },
        {
          ...mockItem,
          quantity: 3,
          selectedModifiers: {
            id: 1,
            name: "Extra Cheese",
            price: 2,
            maxChoices: 1,
            position: 1,
            visible: 1,
            available: true,
            availabilityType: "AVAILABLE",
          },
        },
      ],
      total: mockItem.price * 5,
    };

    renderWithProviders(<MenuItem item={mockItem} />, initialState);

    const quantityBadge = screen.getByTestId("quantity-badge");
    expect(quantityBadge).toHaveTextContent("5");
  });
});
