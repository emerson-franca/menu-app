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
  const filteredItems = section.items.filter(
    (item) =>
      !searchQuery ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (searchQuery && filteredItems.length === 0) {
    return null;
  }

  return (
    <div className="py-8" data-testid={`menu-section-${section.name}`}>
      <button
        onClick={() => toggleSection(section.name)}
        className="w-full flex justify-between items-center mb-3"
        aria-label={`Toggle ${section.name} section`}
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
          {filteredItems.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};
