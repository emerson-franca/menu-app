import React from "react";

interface QuantityControlProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  className?: string;
  size?: "small" | "large";
}

export const QuantityControl: React.FC<QuantityControlProps> = ({
  quantity,
  onIncrease,
  onDecrease,
  className = "",
  size = "large",
}) => {
  const buttonSize = size === "small" ? "w-5 h-5" : "w-8 h-8";
  const iconSize = size === "small" ? "w-3 h-3" : "w-5 h-5";

  return (
    <div
      role="group"
      aria-label="Quantity control"
      className={`flex items-center ${
        size === "small" ? "gap-2" : "gap-4"
      } ${className}`}
    >
      <button
        data-testid="decrease-quantity"
        onClick={onDecrease}
        aria-label="Decrease quantity"
        className={`${buttonSize} flex items-center justify-center rounded-full bg-primary text-white font-bold`}
      >
        <svg
          className={iconSize}
          viewBox="0 0 19 4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <rect
            x="0.5"
            y="0.455078"
            width="18"
            height="3"
            rx="1.5"
            fill="currentColor"
          />
        </svg>
      </button>
      <span
        className={`text-lg font-medium w-4 text-center ${
          size === "small" ? "text-sm" : ""
        }`}
      >
        {quantity}
      </span>
      <button
        data-testid="increase-quantity"
        onClick={onIncrease}
        aria-label="Increase quantity"
        className={`${buttonSize} flex items-center justify-center rounded-full bg-primary text-white font-bold`}
      >
        <svg
          className={iconSize}
          viewBox="0 0 19 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8 16.5C8 17.3284 8.67157 18 9.5 18C10.3284 18 11 17.3284 11 16.5V10.5H17C17.8284 10.5 18.5 9.82843 18.5 9C18.5 8.17157 17.8284 7.5 17 7.5H11V1.5C11 0.671573 10.3284 0 9.5 0C8.67157 0 8 0.671573 8 1.5V7.5H2C1.17157 7.5 0.5 8.17157 0.5 9C0.5 9.82843 1.17157 10.5 2 10.5H8V16.5Z"
            fill="currentColor"
          />
        </svg>
      </button>
    </div>
  );
};
