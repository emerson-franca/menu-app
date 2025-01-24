import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { RestaurantProvider } from "./contexts/RestaurantContext";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { fetchRestaurantData } from "./features/restaurant/restaurantSlice";

const LanguageRoute = ({ lang }: { lang: string }) => {
  const { i18n } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [i18n, lang, location.pathname]);

  return <Home />;
};

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
      <BrowserRouter>
        <div className="flex">
          <Routes>
            <Route
              path="/"
              element={<Navigate to={`/${getUserLocale()}`} replace />}
            />
            <Route path="/en" element={<LanguageRoute lang="en" />} />
            <Route path="/pt" element={<LanguageRoute lang="pt" />} />
            <Route
              path="*"
              element={<Navigate to={`/${getUserLocale()}`} replace />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </RestaurantProvider>
  );
}

export default App;
