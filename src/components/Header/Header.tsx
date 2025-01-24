import { useState } from "react";
import { useRestaurant } from "../../contexts/RestaurantContext";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { restaurantData } = useRestaurant();

  return (
    <>
      {/* Mobile Header */}
      <header className="bg-nav-bg h-14 flex items-center justify-between py-[18px] px-4 md:hidden relative">
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

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-14 left-0 right-0 bg-nav-bg z-50">
            <nav className="flex flex-col">
              <a
                href="/menu"
                className="text-white px-4 py-3 hover:bg-primary-hover"
                onClick={() => setIsMenuOpen(false)}
              >
                MENU
              </a>
              <a
                href="/about"
                className="text-white px-4 py-3 hover:bg-primary-hover"
                onClick={() => setIsMenuOpen(false)}
              >
                ABOUT
              </a>
              <a
                href="/contact"
                className="text-white px-4 py-3 hover:bg-primary-hover"
                onClick={() => setIsMenuOpen(false)}
              >
                CONTACT
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Desktop Header */}
      <header className="hidden md:flex bg-nav-bg h-16 items-center justify-between px-8">
        <h1 className="text-white font-medium">{restaurantData.name}</h1>
        <nav className="flex gap-8">
          <a
            href="/menu"
            className="text-white hover:text-gray-200 transition-colors"
          >
            MENU
          </a>
          <a
            href="/about"
            className="text-white hover:text-gray-200 transition-colors"
          >
            ABOUT
          </a>
          <a
            href="/contact"
            className="text-white hover:text-gray-200 transition-colors"
          >
            CONTACT
          </a>
        </nav>
      </header>
    </>
  );
};
