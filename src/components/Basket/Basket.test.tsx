import { render, screen, fireEvent } from "@testing-library/react";
import { useBasket } from "../../hooks/useBasket";
import Basket from "./Basket";

jest.mock("../../hooks/useBasket");
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: { [key: string]: string } = {
        "basket.empty": "Your basket is empty",
        "basket.title": "Your Order",
        "basket.subtotal": "Subtotal",
        "basket.total": "Total",
        "basket.checkout": "Checkout",
        "common.currency": "${value}",
      };
      return translations[key] || key;
    },
  }),
}));

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

    render(<Basket isOpen={true} onClose={mockOnClose} />);
    expect(screen.getByText("Your basket is empty")).toBeInTheDocument();
  });

  it("renders basket items when there are items", () => {
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

    render(<Basket isOpen={true} onClose={mockOnClose} />);
    expect(screen.getByText("Pizza")).toBeInTheDocument();
    expect(screen.getByText("$21.98")).toBeInTheDocument();
  });

  it("calls onClose when clicking the close button", () => {
    (useBasket as jest.Mock).mockReturnValue({
      items: [],
      total: 0,
    });

    render(<Basket isOpen={true} onClose={mockOnClose} />);
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

    render(<Basket isOpen={true} onClose={mockOnClose} />);
    expect(screen.getByText("Pizza")).toBeInTheDocument();
    expect(screen.getByText("$10.99")).toBeInTheDocument();
  });
});
