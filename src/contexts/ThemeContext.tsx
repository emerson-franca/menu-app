import React, { createContext, useEffect } from "react";
import { useRestaurant } from "./RestaurantContext";

interface ThemeContextType {
  updateTheme: (colors: {
    background: string;
    primary: string;
    primaryHover: string;
    navBackground: string;
  }) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { restaurantData } = useRestaurant();

  const updateTheme = (colors: {
    background: string;
    primary: string;
    primaryHover: string;
    navBackground: string;
  }) => {
    const root = document.documentElement;
    root.style.setProperty("--color-background", colors.background);
    root.style.setProperty("--color-primary", colors.primary);
    root.style.setProperty("--color-primary-hover", colors.primaryHover);
    root.style.setProperty("--color-nav-background", colors.navBackground);
  };

  useEffect(() => {
    if (restaurantData?.webSettings) {
      updateTheme({
        background: restaurantData.webSettings.backgroundColour,
        primary: restaurantData.webSettings.primaryColour,
        primaryHover: restaurantData.webSettings.primaryColourHover,
        navBackground: restaurantData.webSettings.navBackgroundColour,
      });
    }
  }, [restaurantData?.webSettings]);

  return (
    <ThemeContext.Provider value={{ updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
