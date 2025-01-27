import { useState } from "react";
import { useRestaurant } from "../../contexts/RestaurantContext";
import { useTranslation } from "react-i18next";

export const Header: React.FC = () => {
  const { restaurantData } = useRestaurant();
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-nav-bg">
      <div className="h-14 flex items-center justify-between py-[18px] px-4 md:hidden">
        <div className="w-8"></div>
        <h1 className="text-white font-medium">{restaurantData.name}</h1>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 5h16M4 12h16M4 19h16"
              />
            )}
          </svg>
        </button>
      </div>

      <nav
        className={`
        ${isMenuOpen ? "block" : "hidden"} md:flex md:h-[52px]
        bg-nav-bg w-full md:items-center md:justify-center
      `}
      >
        <div className="md:h-full md:flex md:items-center">
          <div className="md:h-full md:flex md:justify-center md:items-center md:w-[232px] md:border-b-2 md:border-b-[5px]">
            <a
              href="#menu"
              className="text-white block px-4 py-3 md:py-0 hover:bg-primary-hover md:hover:bg-transparent md:hover:text-gray-200 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("header.menu")}
            </a>
          </div>
          <div className="md:h-full md:flex md:justify-center md:items-center md:w-[232px]">
            <a
              href="#about"
              className="text-white block px-4 py-3 md:py-0 hover:bg-primary-hover md:hover:bg-transparent md:hover:text-gray-200 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("header.about")}
            </a>
          </div>
          <div className="md:h-full md:flex md:justify-center md:items-center md:w-[232px]">
            <a
              href="#contact"
              className="text-white block px-4 py-3 md:py-0 hover:bg-primary-hover md:hover:bg-transparent md:hover:text-gray-200 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("header.contact")}
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};
