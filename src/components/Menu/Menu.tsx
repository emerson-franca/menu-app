import React from "react";
import { useMenu } from "../../hooks/useMenu";
import { CategoryTabs, MenuSection } from "./components";
import { useBasket } from "../../hooks/useBasket";
import { useTranslation } from "react-i18next";
import { MenuProps } from "./types";

export const Menu: React.FC<MenuProps> = ({
  isBasketVisible,
  setIsBasketVisible,
  searchQuery,
}) => {
  const {
    menuData,
    status,
    error,
    activeTab,
    expandedSections,
    toggleSection,
    handleTabClick,
    filteredSections,
  } = useMenu();
  const { items } = useBasket();
  const { t } = useTranslation();

  if (status === "loading") {
    return <div className="p-4 text-center">Loading...</div>;
  }

  if (status === "failed") {
    return <div className="p-4 text-red-500 text-center">{error}</div>;
  }

  if (!menuData) {
    return <div className="p-4 text-center">No menu data available</div>;
  }

  return (
    <div className="bg-white  md:shadow-2xl">
      <CategoryTabs
        sections={menuData.sections}
        activeTab={activeTab}
        handleTabClick={handleTabClick}
      />
      <div className="px-4 w-full">
        {filteredSections?.map((section) => (
          <MenuSection
            key={section.id}
            section={section}
            searchQuery={searchQuery}
            expandedSections={expandedSections}
            toggleSection={toggleSection}
          />
        ))}
      </div>
      <section className="bg-gray-50 md:hidden p-6 flex justify-center items-center border-y border-gray-100">
        <div className="bg-white rounded-lg w-full text-center">
          <a className="underline text-primary text-section-title" href="#">
            View allergy information
          </a>
        </div>
      </section>
      <div className="left-0 right-0 pt-2 pb-6 px-6 bg-theme-background border-t md:hidden">
        {items.length > 0 && (
          <button
            onClick={() => setIsBasketVisible(!isBasketVisible)}
            className="btn-primary py-3 px-6"
          >
            <span>
              {t("basket.yourBasket")} • {items.length}{" "}
              {t("basket.item", { count: items.length })}
            </span>
          </button>
        )}
      </div>
    </div>
  );
};
