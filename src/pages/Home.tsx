import React, { useState } from "react";
import { Menu } from "../components/Menu/Menu";
import { Header, Hero } from "../components";
import Basket from "../components/Basket/Basket";

const Home: React.FC = () => {
  const [isBasketVisible, setIsBasketVisible] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <Header />
      <Hero />
      <div className="relative md:container md:mx-auto md:px-4 md:py-8">
        <div className="md:flex md:gap-8">
          <div className="md:flex-1">
            <Menu
              isBasketVisible={isBasketVisible}
              setIsBasketVisible={setIsBasketVisible}
            />
          </div>
          <div className="hidden md:block md:w-[350px]">
            <div className="sticky top-8">
              <Basket
                isOpen={isBasketVisible}
                onClose={() => setIsBasketVisible(false)}
              />
            </div>
          </div>
        </div>

        <div className="md:hidden">
          {isBasketVisible && (
            <Basket
              isOpen={isBasketVisible}
              onClose={() => setIsBasketVisible(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
