import React, { createContext, useContext } from 'react';

interface WebSettings {
  id: number;
  venueId: number;
  bannerImage: string;
  backgroundColour: string;
  primaryColour: string;
  primaryColourHover: string;
  navBackgroundColour: string;
}

export interface RestaurantData {
  id: number;
  name: string;
  internalName: string;
  locale: string;
  webSettings: WebSettings;
  ccy: string;
  ccySymbol: string;
  currency: string;
}

interface RestaurantContextType {
  restaurantData: RestaurantData;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

export const RestaurantProvider: React.FC<{ children: React.ReactNode; data: RestaurantData }> = ({ 
  children, 
  data 
}) => {
  return (
    <RestaurantContext.Provider value={{ restaurantData: data }}>
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurant = () => {
  const context = useContext(RestaurantContext);
  if (context === undefined) {
    throw new Error('useRestaurant must be used within a RestaurantProvider');
  }
  return context;
};
