import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MenuSection } from "./MenuSection";
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

const mockSection = {
  id: 1,
  name: "Test Section",
  description: "Test Description",
  position: 1,
  visible: 1,
  images: [],
  items: [
    {
      id: 1,
      name: "Test Item",
      description: "Test Item Description",
      price: 10.99,
      position: 1,
      visible: 1,
      sku: "test-sku",
      available: true,
      availabilityType: "AVAILABLE",
      alcoholic: 0,
      images: [],
    },
    {
      id: 2,
      name: "Hidden Item",
      description: "This item should be hidden when searching",
      price: 15.99,
      position: 2,
      visible: 1,
      sku: "hidden-sku",
      available: true,
      availabilityType: "AVAILABLE",
      alcoholic: 0,
      images: [],
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

describe("MenuSection", () => {
  const mockToggleSection = jest.fn();
  const expandedSections = { "Test Section": true };

  it("renders section name", () => {
    renderWithProviders(
      <MenuSection
        section={mockSection}
        searchQuery=""
        expandedSections={expandedSections}
        toggleSection={mockToggleSection}
      />
    );

    expect(screen.getByText("Test Section")).toBeInTheDocument();
  });

  it("toggles section when clicked", () => {
    renderWithProviders(
      <MenuSection
        section={mockSection}
        searchQuery=""
        expandedSections={expandedSections}
        toggleSection={mockToggleSection}
      />
    );

    fireEvent.click(screen.getByText("Test Section"));
    expect(mockToggleSection).toHaveBeenCalledWith("Test Section");
  });

  it("filters items based on search query", () => {
    renderWithProviders(
      <MenuSection
        section={mockSection}
        searchQuery="Test Item"
        expandedSections={expandedSections}
        toggleSection={mockToggleSection}
      />
    );

    expect(screen.getByText("Test Item")).toBeInTheDocument();
    expect(screen.queryByText("Hidden Item")).not.toBeInTheDocument();
  });

  it("shows correct icon based on expanded state", () => {
    const collapsedSections = { "Test Section": false };

    renderWithProviders(
      <MenuSection
        section={mockSection}
        searchQuery=""
        expandedSections={collapsedSections}
        toggleSection={mockToggleSection}
      />
    );

    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
