import { useAppDispatch, useAppSelector } from "../app/hooks";
import { MenuItem, ModifierItem } from "../types";
import {
  addItem,
  removeItem,
  updateQuantity,
} from "../features/basket/basketSlice";

export const useBasket = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.basket);

  const increaseQuantity = (itemId: number, modifierId?: number) => {
    const item = items.find((item) =>
      item.modifiers
        ? item.selectedModifiers?.id === modifierId
        : item.id === itemId && !item.selectedModifiers
    );
    if (item) {
      dispatch(
        updateQuantity({
          id: itemId,
          quantity: item.quantity + 1,
          selectedModifiers: item.selectedModifiers,
        })
      );
    }
  };

  const decreaseQuantity = (itemId: number, modifierId?: number) => {
    const item = items.find((item) =>
      item.modifiers
        ? item.selectedModifiers?.id === modifierId
        : item.id === itemId && !item.selectedModifiers
    );
    if (item) {
      const newQuantity = (item.quantity || 1) - 1;
      if (newQuantity === 0) {
        dispatch(
          removeItem({ id: itemId, selectedModifiers: item.selectedModifiers })
        );
      } else {
        dispatch(
          updateQuantity({
            id: itemId,
            quantity: newQuantity,
            selectedModifiers: item.selectedModifiers,
          })
        );
      }
    }
  };

  const addToBasket = (
    item: MenuItem,
    modifiers?: ModifierItem,
    quantity?: number
  ) => {
    dispatch(addItem({ item, modifiers, quantity }));
  };

  const removeFromBasket = (id: number, selectedModifiers?: ModifierItem) => {
    dispatch(removeItem({ id, selectedModifiers }));
  };

  const getItemQuantity = (itemId: number) => {
    const item = items.find((item) => item.id === itemId);
    return item?.quantity || 0;
  };

  const total = items.reduce(
    (sum, item) => sum + item.price * (item?.quantity || 1),
    0
  );

  return {
    items,
    total,
    increaseQuantity,
    decreaseQuantity,
    addToBasket,
    removeFromBasket,
    getItemQuantity,
  };
};
