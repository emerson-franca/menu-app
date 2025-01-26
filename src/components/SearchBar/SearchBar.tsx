import React from "react";
import { ReactComponent as SearchIcon } from "../../assets/search.svg";
import { SearchBarProps } from "./types";

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <div
      className="p-4 md:p-0  md:py-1.5 md:bg-gray-100"
      data-testid="search-container"
    >
      <div
        className="relative md:container   md:mx-auto"
        data-testid="search-wrapper"
      >
        <SearchIcon
          data-testid="search-icon"
          className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
        />
        <input
          type="text"
          placeholder="Search menu items"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-[#8A94A4] rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
    </div>
  );
};
