import React from "react";
import { MenuItem, ModifierItem } from "../../types";
import { styles } from "./styles";
import { useBasket } from "../../hooks/useBasket";
import { QuantityControl } from "../QuantityControl/QuantityControl";
import { useTranslation } from "react-i18next";

interface BasketItemProps {
  item: MenuItem & {
    quantity?: number;
    selectedModifiers?: ModifierItem;
  };
}

export const BasketItem: React.FC<BasketItemProps> = ({ item }) => {
  const { increaseQuantity, decreaseQuantity } = useBasket();
  const { t } = useTranslation();

  const handleIncreaseQuantity = () => {
    increaseQuantity(item.id, item.selectedModifiers?.id);
  };

  const handleDecreaseQuantity = () => {
    decreaseQuantity(item.id, item.selectedModifiers?.id);
  };

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
                size="small"
                quantity={item.quantity || 1}
                onDecrease={handleDecreaseQuantity}
                onIncrease={handleIncreaseQuantity}
              />
            </div>
          </div>

          <p className={styles.basketItemPrice}>
            {t("common.currency", {
              value: (item.price * (item?.quantity || 1)).toFixed(2),
            })}
          </p>
        </div>
      </div>
    </div>
  );
};
