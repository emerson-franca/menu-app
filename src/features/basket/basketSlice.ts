import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BasketState, MenuItem, ModifierItem } from "../../types";

interface AddItemPayload {
  item: MenuItem;
  modifiers?: ModifierItem;
  quantity?: number;
}

const initialState: BasketState = {
  items: [],
  total: 0,
};

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<AddItemPayload>) => {
      const { item, modifiers, quantity } = action.payload;
      const itemPrice = modifiers ? item.price + modifiers.price : item.price;

      const existingItemIndex = state.items.findIndex((basketItem) =>
        modifiers
          ? basketItem.selectedModifiers?.id === modifiers.id
          : basketItem.id === item.id && !basketItem.selectedModifiers
      );

      if (existingItemIndex !== -1) {
        const existingItem = state.items[existingItemIndex];
        existingItem.quantity = (existingItem.quantity || 1) + 1;
        existingItem.price = itemPrice;
      } else {
        state.items.push({
          ...item,
          id: modifiers ? modifiers.id : item.id,
          selectedModifiers: modifiers,
          price: itemPrice,
          quantity: quantity || 1,
        });
      }

      state.total = state.items.reduce(
        (sum, item) => sum + item.price * (item.quantity || 1),
        0
      );
    },
    removeItem: (
      state,
      action: PayloadAction<{ id: number; selectedModifiers?: ModifierItem }>
    ) => {
      const { id, selectedModifiers } = action.payload;
      const index = state.items.findIndex((item) =>
        selectedModifiers
          ? item.selectedModifiers?.id === selectedModifiers.id
          : item.id === id && !item.selectedModifiers
      );

      if (index !== -1) {
        state.total -= state.items[index].price;
        state.items.splice(index, 1);
      }
    },
    updateQuantity: (
      state,
      action: PayloadAction<{
        id: number;
        quantity: number;
        selectedModifiers?: ModifierItem;
      }>
    ) => {
      const { id, quantity, selectedModifiers } = action.payload;
      const itemIndex = state.items.findIndex((item) =>
        selectedModifiers
          ? item.selectedModifiers?.id === selectedModifiers.id
          : item.id === id && !item.selectedModifiers
      );

      if (itemIndex !== -1) {
        const item = state.items[itemIndex];
        item.quantity = quantity;

        state.total = state.items.reduce((sum, item) => sum + item.price, 0);
      }
    },
    clearBasket: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearBasket } =
  basketSlice.actions;
export default basketSlice.reducer;
