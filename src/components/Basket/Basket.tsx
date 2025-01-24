import React from "react";
import { useBasket } from "../../hooks/useBasket";
import { BasketItem } from "./BasketItem";
import { styles } from "./styles";

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
        h-full md:bg-white md:rounded-lg md:shadow-sm md:p-6 md:static md:transform-none
        fixed bottom-0 left-0 right-0 bg-white transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-y-0" : "translate-y-full"}
      `}
      >
        <div className="">
          <div className={styles.basketHeader}>
            <h2 className={styles.basketTitle}>Basket</h2>
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

          <div className="pt-4">
            <div className={styles.subtotalContainer}>
              <span className={styles.subtotalText}>Subtotal</span>
              <span className={styles.subtotalValue}>
                R$ {total.toFixed(2)}
              </span>
            </div>
            <div className={styles.totalContainer}>
              <span className={styles.totalText}>Total</span>
              <span className={styles.totalValue}>R$ {total.toFixed(2)}</span>
            </div>
            <div className={styles.checkoutContainer}>
              <button className={styles.checkoutButton}>
                Checkout now • R$ {total.toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Basket;
