import React, { useState, useMemo } from "react";
import { MenuItem as MenuItemType } from "../../../types";
import { useAppSelector } from "../../../app/hooks";
import { ItemDetails } from "./ItemDetails";

interface MenuItemProps {
  item: MenuItemType;
}

export const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const basketItems = useAppSelector((state) => state.basket.items);
  const itemInBasket = useMemo(() => {
    return basketItems.find((basketItem) => {
      if (item.modifiers && basketItem.modifiers) {
        return (
          JSON.stringify(basketItem.modifiers) ===
          JSON.stringify(item.modifiers)
        );
      }
      return basketItem.id === item.id;
    });
  }, [basketItems, item.id, item.modifiers]);

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="flex justify-between gap-4 rounded-lg py-4 cursor-pointer hover:shadow-md transition-shadow"
      >
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              {itemInBasket && (
                <div className="w-[18px] h-[18px] bg-[#4F372F] rounded-[4px] flex items-center justify-center">
                  <span className="text-white text-xs">
                    {itemInBasket.quantity}
                  </span>
                </div>
              )}
              <h3 className="font-roboto text-base font-medium leading-[18.75px]">
                {item.name}
              </h3>
            </div>
          </div>
          <p className="mt-1 font-roboto text-base font-light leading-[18.75px] text-gray-600 line-clamp-2">
            {item.description}
          </p>
          <p className="mt-1 font-roboto text-base font-medium leading-[18.75px] tracking-[0.5px]">
            R$
            {item.price > 0
              ? item.price.toFixed(2)
              : item.modifiers?.[0].items[0].price.toFixed(2)}
          </p>
        </div>
        {item.images?.[0]?.image && (
          <div className="w-[128px] h-[85px] flex-shrink-0">
            <img
              src={item.images[0].image}
              alt={item.name}
              className="w-full h-full object-cover rounded-lg"
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
