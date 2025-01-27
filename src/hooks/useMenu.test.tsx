import { renderHook, act } from "@testing-library/react";
import { useMenu } from "./useMenu";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import restaurantReducer from "../features/restaurant/restaurantSlice";
import { ReactNode } from "react";

const mockMenuData = {
  id: 1,
  name: "Test Menu",
  type: "FOOD",
  collapse: 0,
  sections: [
    {
      id: 1,
      name: "Appetizers",
      description: "Starters",
      position: 1,
      visible: 1,
      images: [],
      items: [
        {
          id: 1,
          name: "Spring Rolls",
          description: "Vegetable spring rolls",
          price: 5.99,
          position: 1,
          visible: 1,
          sku: "app-1",
          available: true,
          availabilityType: "AVAILABLE",
          alcoholic: 0,
        },
      ],
    },
    {
      id: 2,
      name: "Main Course",
      description: "Main dishes",
      position: 2,
      visible: 1,
      images: [],
      items: [],
    },
  ],
};

const mockRestaurantData = {
  id: 1,
  name: "Test Restaurant",
  internalName: "test_restaurant",
  description: null,
  liveFlag: 1,
  demoFlag: 0,
  address1: "123 Test St",
  address2: "",
  address3: null,
  city: "Test City",
  county: "Test County",
  postcode: "12345",
  country: "Test Country",
  timezoneOffset: "+00:00",
  locale: "en-US",
  timeZone: "UTC",
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

const createWrapper = () => {
  const store = configureStore({
    reducer: {
      restaurant: restaurantReducer,
    },
    preloadedState: {
      restaurant: {
        restaurantData: mockRestaurantData,
        menuData: mockMenuData,
        status: "succeeded" as const,
        menuStatus: "succeeded" as const,
        error: null,
        menuError: null,
      },
    },
  });

  return ({ children }: { children: ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  );
};

describe("useMenu", () => {
  it("initializes with default values", () => {
    const { result } = renderHook(() => useMenu(), {
      wrapper: createWrapper(),
    });

    expect(result.current.activeTab).toBe("");
    expect(result.current.searchQuery).toBe("");
    expect(Object.keys(result.current.expandedSections)).toHaveLength(2);
  });

  it("expands all sections by default", () => {
    const { result } = renderHook(() => useMenu(), {
      wrapper: createWrapper(),
    });

    expect(result.current.expandedSections).toEqual({
      Appetizers: true,
      "Main Course": true,
    });
  });

  it("toggles section expansion", () => {
    const { result } = renderHook(() => useMenu(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.toggleSection("Appetizers");
    });

    expect(result.current.expandedSections.Appetizers).toBe(false);
  });

  it("handles tab click", () => {
    const { result } = renderHook(() => useMenu(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.handleTabClick("Appetizers");
    });

    expect(result.current.activeTab).toBe("Appetizers");
    expect(result.current.expandedSections.Appetizers).toBe(true);
  });

  it("updates search query", () => {
    const { result } = renderHook(() => useMenu(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.setSearchQuery("spring");
    });

    expect(result.current.searchQuery).toBe("spring");
  });

  it("filters menu items based on search query", () => {
    const { result } = renderHook(() => useMenu(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.setSearchQuery("spring");
    });

    expect(result.current.filteredSections).toHaveLength(1);
    expect(result.current.filteredSections?.[0].items[0].name).toBe(
      "Spring Rolls"
    );
  });
});
