import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchMenuData } from "../features/restaurant/restaurantSlice";

export const useMenu = () => {
  const dispatch = useAppDispatch();
  const { menuData, menuStatus: status, menuError: error } = useAppSelector(
    (state) => state.restaurant
  );
  const [activeTab, setActiveTab] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchMenuData());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (menuData?.sections[0]) {
      const initialExpandedState = menuData.sections.reduce(
        (acc, section) => ({
          ...acc,
          [section.name]: true,
        }),
        {}
      );
      setExpandedSections(initialExpandedState);
    }
  }, [menuData]);

  const toggleSection = (sectionName: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionName]: !prev[sectionName],
    }));
  };

  const handleTabClick = (sectionName: string) => {
    if (activeTab === sectionName) {
      setActiveTab("");
    } else {
      setActiveTab(sectionName);
      setExpandedSections((prev) => ({
        ...prev,
        [sectionName]: true,
      }));
    }
  };

  const filteredSections = menuData?.sections
    .filter((section) => !activeTab || section.name === activeTab)
    .filter((section) => {
      if (!searchQuery) return true;
      return section.items.some(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

  return {
    menuData,
    status,
    error,
    activeTab,
    searchQuery,
    setSearchQuery,
    expandedSections,
    toggleSection,
    handleTabClick,
    filteredSections,
  };
};
