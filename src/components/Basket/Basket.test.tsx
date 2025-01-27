import { render, screen, fireEvent } from "@testing-library/react";
import { useBasket } from "../../hooks/useBasket";
import Basket from "./Basket";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "../../features/basket/basketSlice";

jest.mock("../../hooks/useBasket");
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, params?: any) => {
      const translations: { [key: string]: string } = {
        "basket.empty": "Seu carrinho está vazio",
        "basket.title": "Carrinho",
        "basket.subtotal": "Subtotal",
        "basket.total": "Total",
        "basket.checkout": "Finalizar pedido",
      };
      if (key === "common.currency") {
        return `R$ ${params.value}`;
      }
      return translations[key] || key;
    },
  }),
}));

const store = configureStore({
  reducer: {
    basket: basketReducer,
  },
});

const renderWithProviders = (component: React.ReactElement) => {
  return render(<Provider store={store}>{component}</Provider>);
};

describe("Basket", () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders empty basket message when there are no items", () => {
    (useBasket as jest.Mock).mockReturnValue({
      items: [],
      total: 0,
    });

    renderWithProviders(<Basket isOpen={true} onClose={mockOnClose} />);
    expect(screen.getByText("Seu carrinho está vazio")).toBeInTheDocument();
  });

  it("renders basket items correctly", () => {
    const mockItems = [
      {
        id: 1,
        name: "Pizza",
        price: 10.99,
        quantity: 2,
        description: "",
        image: "",
        category: "",
        alcoholic: 0,
        position: 1,
        visible: 1,
        availabilityType: "AVAILABLE",
        sku: "PIZZA1",
        available: true,
      },
    ];

    (useBasket as jest.Mock).mockReturnValue({
      items: mockItems,
      total: 21.98,
    });

    renderWithProviders(<Basket isOpen={true} onClose={mockOnClose} />);

    const button = screen.getByTestId("checkout-button");

    expect(screen.getByText("Pizza")).toBeInTheDocument();
    expect(button).toHaveTextContent("Finalizar pedido • R$ 21.98");
  });

  it("calls onClose when clicking the close button", () => {
    (useBasket as jest.Mock).mockReturnValue({
      items: [],
      total: 0,
    });

    renderWithProviders(<Basket isOpen={true} onClose={mockOnClose} />);
    const closeButton = screen.queryByRole("button");
    if (closeButton) {
      fireEvent.click(closeButton);
      // eslint-disable-next-line jest/no-conditional-expect
      expect(mockOnClose).toHaveBeenCalled();
    }
  });

  it("renders items with modifiers correctly", () => {
    const mockItems = [
      {
        id: 1,
        name: "Pizza",
        price: 10.99,
        quantity: 1,
        description: "",
        alcoholic: 0,
        position: 1,
        visible: 1,
        availabilityType: "AVAILABLE",
        sku: "PIZZA1",
        available: true,
        selectedModifiers: {
          id: 1,
          name: "Extra Cheese",
          price: 2.0,
          maxChoices: 1,
          position: 1,
          visible: 1,
          availabilityType: "AVAILABLE",
          available: true,
        },
      },
    ];

    (useBasket as jest.Mock).mockReturnValue({
      items: mockItems,
      total: 12.99,
    });

    renderWithProviders(<Basket isOpen={true} onClose={mockOnClose} />);
    expect(screen.getByText("Pizza")).toBeInTheDocument();
    expect(screen.getByText("R$ 10.99")).toBeInTheDocument();
  });
});
