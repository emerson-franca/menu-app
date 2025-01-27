import React, { useState } from "react";
import { MenuItem as MenuItemType } from "../../../types";
import { useAppSelector } from "../../../app/hooks";
import { ItemDetails } from "./ItemDetails";
import { useTranslation } from "react-i18next";

interface MenuItemProps {
  item: MenuItemType;
}

export const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const basketItems = useAppSelector((state) => state.basket.items);
  const { t } = useTranslation();

  const itemQuantity = basketItems
    .filter((basketItem) => basketItem.id === item.id)
    .reduce((total, item) => total + (item.quantity || 0), 0);

  const getItemPrice = (item: MenuItemType): string => {
    if (item.price > 0) return item.price.toFixed(2);
    return item.modifiers?.[0]?.items?.[0]?.price?.toFixed(2) || "0.00";
  };

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="flex justify-between gap-4 rounded-lg py-4 cursor-pointer hover:shadow-md transition-shadow"
        data-testid="menu-item"
      >
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              {itemQuantity > 0 && (
                <div
                  className="w-5 h-5 bg-[#4F372F] rounded-[4px] flex items-center justify-center"
                  data-testid="quantity-badge"
                >
                  <span className="text-white text-xs">{itemQuantity}</span>
                </div>
              )}
              <h3
                className="font-roboto text-base font-medium"
                data-testid="item-name"
              >
                {item.name}
              </h3>
            </div>
          </div>
          <p
            className="mt-1 font-roboto text-base font-light text-gray-600 line-clamp-2"
            data-testid="item-description"
          >
            {item.description}
          </p>
          <p
            className="mt-1 font-roboto text-base font-medium"
            data-testid="item-price"
          >
            {t("common.currency", { value: getItemPrice(item) })}
          </p>
        </div>
        {item.images?.[0]?.image && (
          <div className="w-[128px] h-[85px] flex-shrink-0">
            <img
              src={item.images[0].image}
              alt={item.name}
              className="w-full h-full object-cover rounded-lg"
              loading="lazy"
              data-testid="item-image"
            />
          </div>
        )}
      </div>
      <ItemDetails
        item={item}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
