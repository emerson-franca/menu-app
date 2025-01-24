import { useState } from "react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Header */}
      <header className="bg-primary h-14 flex items-center justify-between py-[18px] px-4 md:hidden relative">
        <div className="w-8"></div>
        <h1 className="text-strong">Menu</h1>
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
          <div className="absolute top-14 left-0 right-0 bg-primary z-50">
            <nav className="flex flex-col">
              <a
                href="/menu"
                className="text-white px-4 py-3 hover:bg-primary-dark"
                onClick={() => setIsMenuOpen(false)}
              >
                MENU
              </a>
              <a
                href="/login"
                className="text-white px-4 py-3 hover:bg-primary-dark"
                onClick={() => setIsMenuOpen(false)}
              >
                ENTRAR
              </a>
              <a
                href="/contact"
                className="text-white px-4 py-3 hover:bg-primary-dark"
                onClick={() => setIsMenuOpen(false)}
              >
                CONTATO
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Desktop Header */}
      <header className="hidden md:flex bg-primary h-16 items-center justify-center">
        <nav className="flex gap-16">
          <a
            href="/menu"
            className="text-white hover:text-gray-200 font-medium"
          >
            MENU
          </a>
          <a
            href="/login"
            className="text-white hover:text-gray-200 font-medium"
          >
            ENTRAR
          </a>
          <a
            href="/contact"
            className="text-white hover:text-gray-200 font-medium"
          >
            CONTATO
          </a>
        </nav>
      </header>
    </>
  );
};
