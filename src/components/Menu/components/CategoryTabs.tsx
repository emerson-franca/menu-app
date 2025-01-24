import React from "react";
import { CategoryTabsProps } from "../types";

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  sections,
  activeTab,
  handleTabClick,
}) => {
  return (
    <div className="flex justify-between items-center px-4 py-5">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => handleTabClick(section.name)}
          className="flex flex-col items-center space-y-2 relative min-w-[80px]"
        >
          <div
            className={`p-[1px] w-[74px] h-[74px] rounded-full overflow-hidden border-2 ${
              activeTab === section.name ? "border-primary" : "border-transparent"
            }`}
          >
            <img
              src={
                section.images?.[0]?.image ||
                `https://via.placeholder.com/160?text=${section.name}`
              }
              alt={section.name}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <span
            className={`pb-[8px] text-sm text-[#121212] ${
              activeTab === section.name ? "font-semibold" : "font-normal"
            }`}
          >
            {section.name}
          </span>
          {activeTab === section.name && (
            <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-primary" />
          )}
        </button>
      ))}
    </div>
  );
};