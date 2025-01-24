import React from "react";
import { MenuItem } from "./MenuItem";
import { MenuSectionProps } from "../types";
import { ReactComponent as ChevronUpIcon } from "../../../assets/chevron-up.svg";
import { ReactComponent as ChevronDownIcon } from "../../../assets/chevron-down.svg";

export const MenuSection: React.FC<MenuSectionProps> = ({
  section,
  searchQuery,
  expandedSections,
  toggleSection,
}) => {
  return (
    <div className="py-8">
      <button
        onClick={() => toggleSection(section.name)}
        className="w-full flex justify-between items-center mb-3"
      >
        <h1 className="font-roboto text-2xl font-medium leading-[28.13px] tracking-[0.5px] text-left">
          {section.name}
        </h1>
        {expandedSections[section.name] ? (
          <ChevronUpIcon className="h-6 w-6 text-primary" />
        ) : (
          <ChevronDownIcon className="h-6 w-6 text-primary" />
        )}
      </button>

      {expandedSections[section.name] && (
        <div>
          {section.items
            .filter(
              (item) =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description
                  ?.toLowerCase()
                  .includes(searchQuery.toLowerCase())
            )
            .map((item) => (
              <MenuItem key={item.id} item={item} />
            ))}
        </div>
      )}
    </div>
  );
};
