import React, { useState } from "react";
import { Menu } from "../components/Menu/Menu";
import { Header, Hero, SearchBar } from "../components";
import Basket from "../components/Basket/Basket";
import { useMenu } from "../hooks/useMenu";

const Home: React.FC = () => {
  const [isBasketVisible, setIsBasketVisible] = useState(false);
  const { searchQuery, setSearchQuery } = useMenu();

  return (
    <div className="min-h-screen bg-gray-100 w-full">
      <Header />
      <main>
        <section aria-labelledby="hero-section">
          <Hero />
        </section>

        <section aria-labelledby="search-section" className="bg-white">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </section>

        <section
          aria-labelledby="menu-and-basket-section"
          className="relative md:container md:mx-auto md:px-8 md:py-8 bg-gray-50 "
        >
          <div className="md:flex md:gap-8 bg-red">
            <div className="md:flex-1">
              <Menu
                searchQuery={searchQuery}
                isBasketVisible={isBasketVisible}
                setIsBasketVisible={setIsBasketVisible}
              />
            </div>

            <section className="md:hidden p-6 flex justify-center items-center border-y border-gray-100">
              <div className="bg-white rounded-lg w-full text-center">
                <a
                  className="underline text-primary text-section-title"
                  href="#"
                >
                  View allergy information
                </a>
              </div>
            </section>

            <aside className="hidden md:block md:w-[350px]">
              <div className="sticky top-8">
                <Basket
                  isOpen={isBasketVisible}
                  onClose={() => setIsBasketVisible(false)}
                />
              </div>
            </aside>
          </div>

          <div className="md:hidden">
            {isBasketVisible && (
              <Basket
                isOpen={isBasketVisible}
                onClose={() => setIsBasketVisible(false)}
              />
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
