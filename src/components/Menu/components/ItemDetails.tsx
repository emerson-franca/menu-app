import React, { useState } from "react";
import { MenuItem as MenuItemType } from "../../../types";
import { useBasket } from "../../../hooks/useBasket";
import { ReactComponent as CloseIcon } from "../../../assets/close.svg";
import { QuantityControl } from "../../QuantityControl";
import { usePreventScroll } from "../../../hooks/usePreventScroll";

interface ItemDetailsProps {
  item: MenuItemType;
  onClose: () => void;
  isOpen: boolean;
}

export const ItemDetails: React.FC<ItemDetailsProps> = ({
  item,
  onClose,
  isOpen,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(
    item.modifiers?.[0]?.items?.[0]
  );
  const { addToBasket } = useBasket();
  usePreventScroll(isOpen, false);

  const getPrice = () => {
    const basePrice = selectedSize ? selectedSize.price : item.price;
    return (basePrice * quantity).toFixed(2);
  };

  const handleAddToBasket = () => {
    addToBasket(item, selectedSize);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full h-full md:h-auto md:w-full md:max-w-lg md:mx-4 md:rounded-lg overflow-hidden flex flex-col">
        <div className="relative flex-shrink-0">
          <img
            src={item.images?.[0]?.image || "/placeholder-image.jpg"}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute bg-white top-11 right-4 text-white bg-black rounded-full p-2"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4 border-b border-gray-100">
            <h2 className="text-item-name mb-2">{item.name}</h2>
            <p className="text-item-description">{item.description}</p>
          </div>

          {item?.modifiers && (
            <div className="mb-6 bg-white rounded-lg">
              <div className="bg-gray-50 px-6 py-4">
                <h3 className="text-section-title mb-1">Choose your size</h3>
                <p className="text-section-subtitle">Select 1 option</p>
              </div>
              <div className="flex flex-col gap-4 px-6 py-4">
                {item.modifiers[0].items.map((option) => (
                  <label
                    key={option.id}
                    className="flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex flex-col">
                      <span className="text-base">{option.name}</span>
                      <span className="text-gray-600">
                        R${option.price.toFixed(2)}
                      </span>
                    </div>
                    <input
                      type="radio"
                      name="size"
                      checked={selectedSize?.id === option.id}
                      onChange={() => setSelectedSize(option)}
                      className="w-5 h-5 accent-primary"
                    />
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col items-center justify-between bg-white p-4 border-t">
            <QuantityControl
              quantity={quantity}
              onIncrease={() => setQuantity((q) => q + 1)}
              onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
            />
            <button
              onClick={handleAddToBasket}
              className="btn-primary w-full mt-[10px]"
            >
              Add to Order • R$ {getPrice()}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
