import { MenuSection } from "../../types";

export interface CategoryTabsProps {
  sections: MenuSection[];
  activeTab: string;
  handleTabClick: (sectionName: string) => void;
}

export interface MenuSectionProps {
  section: MenuSection;
  searchQuery: string;
  expandedSections: { [key: string]: boolean };
  toggleSection: (sectionName: string) => void;
}

export interface MenuProps {
  isBasketVisible: boolean;
  setIsBasketVisible: (visible: boolean) => void;
}
