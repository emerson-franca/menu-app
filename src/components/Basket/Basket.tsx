import React from "react";
import { useTranslation } from "react-i18next";
import { useBasket } from "../../hooks/useBasket";
import { BasketItem } from "./BasketItem";
import { styles } from "./styles";
import { usePreventScroll } from "../../hooks/usePreventScroll";

interface BasketProps {
  isOpen: boolean;
  onClose: () => void;
}

const Basket: React.FC<BasketProps> = ({ isOpen, onClose }) => {
  const { items, total } = useBasket();
  const { t } = useTranslation();
  usePreventScroll(isOpen);

  if (items.length === 0) {
    return (
      <div className="bg-white shadow-2xl text-gray-500">
        <header className="px-6 py-[22px] bg-gray-50">
          <h1 className="text-xl font-medium">{t("basket.title")}</h1>
        </header>
        <div className="px-6 py-[22px]">
          <p className="text-base">{t("basket.empty")}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      data-testid="basket-container"
      className="md:static fixed inset-0 z-50 md:z-auto"
    >
      <div
        className="md:hidden fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      <div
        className={`
        h-full md:bg-white md:rounded-lg md:shadow-sm md:static md:transform-none
        fixed bottom-0 left-0 right-0 bg-white transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-y-0" : "translate-y-full"}
      `}
      >
        <div className="flex flex-col h-full">
          <div className={styles.basketHeader}>
            <h2 className={styles.basketTitle}>{t("basket.title")}</h2>
            <button onClick={onClose} className="text-gray-500 md:hidden">
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

          <div className="flex-1 overflow-auto bg-gray-50">
            <div className="mb-4">
              {items.map((item) => (
                <BasketItem
                  key={`${item.id}-${item.selectedModifiers?.id || "default"}`}
                  item={item}
                />
              ))}
            </div>
            <div className={styles.subtotalContainer}>
              <span className={styles.subtotalText}>
                {t("basket.subtotal")}
              </span>
              <span className={styles.subtotalValue}>
                {t("common.currency", { value: total.toFixed(2) })}
              </span>
            </div>
            <div className={styles.totalContainer}>
              <span className={styles.totalText}>{t("basket.total")}</span>
              <span className={styles.totalValue}>
                {t("common.currency", { value: total.toFixed(2) })}
              </span>
            </div>
          </div>
          <div className={styles.checkoutContainer}>
            <button className={styles.checkoutButton}>
              {t("basket.checkout")} •{" "}
              {t("common.currency", { value: total.toFixed(2) })}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Basket;
