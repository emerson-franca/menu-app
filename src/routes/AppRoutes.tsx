import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface AppRoutesProps {
  getUserLocale: () => string;
}

const LanguageRoute = ({ lang }: { lang: string }) => {
  const { i18n } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [i18n, lang, location.pathname]);

  return <Home />;
};

export const AppRoutes: React.FC<AppRoutesProps> = ({ getUserLocale }) => {
  return (
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
  );
};
