interface QuantityControlProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  className?: string;
}

export const QuantityControl: React.FC<QuantityControlProps> = ({
  quantity,
  onIncrease,
  onDecrease,
  className = "",
}) => {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <button
        onClick={onDecrease}
        className="w-8 h-8 rounded-full border-2 bg-primary text-white font-bold flex items-center justify-center"
      >
        <svg
          width="19"
          height="4"
          viewBox="0 0 19 4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
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
      <span className="text-lg font-medium w-4 text-center">{quantity}</span>
      <button
        onClick={onIncrease}
        className="w-8 h-8 rounded-full border-2 bg-primary text-white font-bold flex items-center justify-center"
      >
        <svg
          width="19"
          height="18"
          viewBox="0 0 19 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8 16.5C8 17.3284 8.67157 18 9.5 18C10.3284 18 11 17.3284 11 16.5V10.5H17C17.8284 10.5 18.5 9.82843 18.5 9C18.5 8.17157 17.8284 7.5 17 7.5H11V1.5C11 0.671573 10.3284 0 9.5 0C8.67157 0 8 0.671573 8 1.5V7.5H2C1.17157 7.5 0.5 8.17157 0.5 9C0.5 9.82843 1.17157 10.5 2 10.5H8V16.5Z"
            fill="white"
          />
        </svg>
      </button>
    </div>
  );
};
