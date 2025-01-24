export const styles = {
  basketContainer: "flex flex-col min-h-full",
  basketContent:
    "bg-white overflow-auto max-h-basket-mobile md:max-h-basket-desktop border-gray-100",
  basketList: "",

  basketHeader:
    "flex bg-white items-center mb-[9px] border-b border-gray-200 p-4",
  basketTitle:
    "flex-1 font-roboto text-lg font-medium leading-[21.09px] tracking-wide text-center",

  basketItem: "p-4 flex justify-between items-center w-full border-b bg-white",
  basketItemName: "font-medium",
  basketItemModifier:
    "font-roboto font-normal text-base leading-[19px] flex-1 text-gray-300",
  basketItemControls: "flex items-center mt-3",
  basketItemQuantity: "px-2 font-roboto font-bold text-base leading-[19px]",
  basketItemPrice: "font-medium",

  subtotalContainer: "flex justify-between items-center my-4 p-4",
  subtotalText: "font-roboto font-normal text-base leading-[19px]",
  subtotalValue:
    "font-roboto font-medium text-base leading-[19px] text-right tracking-base",

  totalContainer: "flex justify-between items-center my-4 border-t p-4",
  totalText: "font-roboto font-light text-xl leading-7 text-gray-900",
  totalValue:
    "font-roboto font-bold text-xl leading-7 text-right text-gray-900",

  checkoutContainer: "mt-auto pt-4 pb-6 px-4 bg-gray-50",
  checkoutButton: "btn-primary w-full",
  checkoutText:
    "font-roboto text-lg font-medium leading-[21.09px] tracking-wide",

  mobileOverlay: "fixed inset-0 bg-black bg-opacity-50 z-50",
  mobileContainer:
    "fixed inset-x-0 bottom-0 w-full bg-gray-50 h-full flex flex-col",

  desktopContainer:
    "hidden md:block md:w-[400px] bg-white p-4 md:border-l md:h-screen",
} as const;
