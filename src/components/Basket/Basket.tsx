import React from "react";
import { useBasket } from "../../hooks/useBasket";
import { BasketItem } from "./BasketItem";

interface BasketProps {
  isOpen: boolean;
  onClose: () => void;
}

const Basket: React.FC<BasketProps> = ({ isOpen, onClose }) => {
  const { items, total } = useBasket();

  if (items.length === 0) {
    return (
      <div className="md:bg-white md:rounded-lg md:shadow-sm md:p-6 text-gray-500">
        Your basket is empty
      </div>
    );
  }

  return (
    <div className="md:static fixed inset-0 z-50 md:z-auto">
      <div
        className="md:hidden fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      <div
        className={`
        md:bg-white md:rounded-lg md:shadow-sm md:p-6 md:static md:transform-none
        fixed bottom-0 left-0 right-0 bg-white transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-y-0" : "translate-y-full"}
      `}
      >
        <div className="p-4 md:p-0">
          <div className="md:hidden flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Your Basket</h2>
            <button onClick={onClose} className="text-gray-500">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="space-y-4 mb-4">
            {items.map((item) => (
              <BasketItem
                key={`${item.id}-${item.selectedModifiers?.id || "default"}`}
                item={item}
              />
            ))}
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold">Total</span>
              <span className="font-semibold">R$ {total.toFixed(2)}</span>
            </div>
            <button className="btn-primary w-full">
              Checkout now • R$ {total.toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Basket;
