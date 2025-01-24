import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import { RestaurantProvider } from "./contexts/RestaurantContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { fetchRestaurantData } from "./features/restaurant/restaurantSlice";
import { AppRoutes } from "./routes/AppRoutes";

function App() {
  const dispatch = useAppDispatch();
  const { restaurantData, status } = useAppSelector((state) => state.restaurant);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchRestaurantData());
    }
  }, [dispatch, status]);

  const getUserLocale = () => {
    const defaultLocale = restaurantData?.locale?.split("-")[0].toLowerCase() || "en";
    const browserLang = navigator.language.split("-")[0];
    return ["en", "pt"].includes(browserLang) ? browserLang : defaultLocale;
  };

  if (status === 'loading' || !restaurantData) {
    return <div>Loading...</div>;
  }

  return (
    <RestaurantProvider data={restaurantData}>
      <ThemeProvider>
        <BrowserRouter>
          <div className="flex bg-theme-background">
            <AppRoutes getUserLocale={getUserLocale} />
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </RestaurantProvider>
  );
}

export default App;
