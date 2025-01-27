export interface WebSettings {
  id: number;
  venueId: number;
  bannerImage: string;
  backgroundColour: string;
  primaryColour: string;
  primaryColourHover: string;
  navBackgroundColour: string;
}

export interface RestaurantData {
  id: number;
  name: string;
  internalName: string;
  description: string | null;
  liveFlag: number;
  demoFlag: number;
  address1: string;
  address2: string;
  address3: string | null;
  city: string;
  county: string;
  postcode: string;
  country: string;
  timezoneOffset: string;
  locale: string;
  timeZone: string;
  webSettings: WebSettings;
  ccy: string;
  ccySymbol: string;
  currency: string;
}

export interface Image {
  id: number;
  image: string;
}

export interface ModifierItem {
  id: number;
  name: string;
  price: number;
  maxChoices: number;
  position: number;
  visible: number;
  availabilityType: string;
  available: boolean;
  qty?: number;
}

export interface Modifier {
  id: number;
  name: string;
  maxChoices: number;
  items: ModifierItem[];
  available: boolean;
  price: number;
}

export interface MenuItem {
  id: number;
  name: string;
  description?: string;
  alcoholic: number;
  price: number;
  position: number;
  visible: number;
  availabilityType: string;
  sku: string;
  modifiers?: Modifier[];
  images?: Image[];
  available: boolean;
}

export interface MenuSection {
  id: number;
  name: string;
  description: string | null;
  position: number;
  visible: number;
  images: Image[];
  items: MenuItem[];
}

export interface MenuData {
  id: number;
  name: string;
  type: string;
  collapse: number;
  sections: MenuSection[];
}

export interface BasketItem extends MenuItem {
  selectedModifiers?: ModifierItem;
  quantity: number;
}

export interface BasketState {
  items: BasketItem[];
  total: number;
}
