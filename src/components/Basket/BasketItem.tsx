import React from "react";
import { MenuItem } from "../../types";
import { styles } from "./styles";
import { useBasket } from "../../hooks/useBasket";
import { QuantityControl } from "../QuantityControl";

interface BasketItemProps {
  item: MenuItem & {
    quantity?: number;
    selectedModifiers?: {
      name: string;
      price: number;
    };
  };
}

export const BasketItem: React.FC<BasketItemProps> = ({ item }) => {
  const { increaseQuantity, decreaseQuantity } = useBasket();

  return (
    <div key={item.id} className={styles.basketItem}>
      <div className="w-full ">
        <div className="flex justify-between">
          <div>
            <p className={styles.basketItemName}>{item.name}</p>
            {item.selectedModifiers && (
              <p className={styles.basketItemModifier}>
                {item.selectedModifiers.name} (+$
                {item.selectedModifiers.price.toFixed(2)})
              </p>
            )}
            <div className={styles.basketItemControls}>
              <QuantityControl
                quantity={item.quantity || 1}
                onDecrease={() => decreaseQuantity(item.id)}
                onIncrease={() => increaseQuantity(item.id)}
              />
            </div>
          </div>

          <p className={styles.basketItemPrice}>
            ${(item.price * (item?.quantity || 1)).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};
