import { renderHook, act } from "@testing-library/react";
import { useBasket } from "./useBasket";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "../features/basket/basketSlice";
import { MenuItem, ModifierItem } from "../types";

const createWrapper = () => {
  const store = configureStore({
    reducer: {
      basket: basketReducer,
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  );
};

describe("useBasket", () => {
  const mockMenuItem: MenuItem = {
    id: 1,
    name: "Pizza",
    price: 10.0,
    description: "Delicious pizza",
    alcoholic: 0,
    position: 1,
    visible: 1,
    availabilityType: "AVAILABLE",
    sku: "PIZZA1",
    available: true,
  };

  const mockModifier: ModifierItem = {
    id: 2,
    name: "Extra Cheese",
    price: 2.0,
    maxChoices: 1,
    position: 1,
    visible: 1,
    availabilityType: "AVAILABLE",
    available: true,
  };

  it("should add item to basket", () => {
    const { result } = renderHook(() => useBasket(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.addToBasket(mockMenuItem);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0]).toEqual(
      expect.objectContaining({
        id: mockMenuItem.id,
        name: mockMenuItem.name,
        price: mockMenuItem.price,
        quantity: 1,
      })
    );
    expect(result.current.total).toBe(mockMenuItem.price);
  });

  it("should add item with modifier to basket", () => {
    const { result } = renderHook(() => useBasket(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.addToBasket(mockMenuItem, mockModifier);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0]).toEqual(
      expect.objectContaining({
        id: mockModifier.id,
        name: mockMenuItem.name,
        price: mockMenuItem.price + mockModifier.price,
        quantity: 1,
        selectedModifiers: mockModifier,
      })
    );
    expect(result.current.total).toBe(mockMenuItem.price + mockModifier.price);
  });

  it("should increase quantity of existing item", () => {
    const { result } = renderHook(() => useBasket(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.addToBasket(mockMenuItem);
    });

    act(() => {
      result.current.increaseQuantity(mockMenuItem.id);
    });

    expect(result.current.items[0].quantity).toBe(2);
    expect(result.current.items[0].price).toBe(mockMenuItem.price * 2);
  });

  it("should decrease quantity of existing item", () => {
    const { result } = renderHook(() => useBasket(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.addToBasket(mockMenuItem);
    });

    act(() => {
      result.current.increaseQuantity(mockMenuItem.id);
    });

    act(() => {
      result.current.decreaseQuantity(mockMenuItem.id);
    });

    expect(result.current.items[0].quantity).toBe(1);
    expect(result.current.items[0].price).toBe(mockMenuItem.price);
    expect(result.current.total).toBe(mockMenuItem.price);
  });

  it("should remove item when quantity reaches zero", () => {
    const { result } = renderHook(() => useBasket(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.addToBasket(mockMenuItem);
    });

    act(() => {
      result.current.decreaseQuantity(mockMenuItem.id);
    });

    expect(result.current.items).toHaveLength(0);
    expect(result.current.total).toBe(0);
  });

  it("should get correct item quantity", () => {
    const { result } = renderHook(() => useBasket(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.addToBasket(mockMenuItem);
    });

    act(() => {
      result.current.increaseQuantity(mockMenuItem.id);
    });

    expect(result.current.getItemQuantity(mockMenuItem.id)).toBe(2);
    expect(result.current.getItemQuantity(999)).toBe(0); // Non-existent item
  });

  it("should calculate total correctly with multiple items", () => {
    const { result } = renderHook(() => useBasket(), {
      wrapper: createWrapper(),
    });

    const secondItem: MenuItem = {
      ...mockMenuItem,
      id: 3,
      name: "Pasta",
      price: 15.0,
    };

    act(() => {
      result.current.addToBasket(mockMenuItem);
    });

    act(() => {
      result.current.increaseQuantity(mockMenuItem.id);
    });

    act(() => {
      result.current.addToBasket(secondItem);
    });

    expect(result.current.items[0].quantity).toBe(2);
    expect(result.current.items[1].quantity).toBe(1);
    expect(result.current.total).toBeCloseTo(55.0, 2);
  });
});
