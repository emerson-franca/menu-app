import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QuantityControl } from "./QuantityControl";

describe("QuantityControl", () => {
  const mockIncrease = jest.fn();
  const mockDecrease = jest.fn();
  const defaultProps = {
    quantity: 1,
    onIncrease: mockIncrease,
    onDecrease: mockDecrease,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders with default props", () => {
    render(<QuantityControl {...defaultProps} />);

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /decrease/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /increase/i })
    ).toBeInTheDocument();
  });

  it("calls onIncrease when increase button is clicked", async () => {
    render(<QuantityControl {...defaultProps} />);
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: /increase/i }));
    expect(mockIncrease).toHaveBeenCalledTimes(1);
  });

  it("calls onDecrease when decrease button is clicked", async () => {
    render(<QuantityControl {...defaultProps} />);
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: /decrease/i }));
    expect(mockDecrease).toHaveBeenCalledTimes(1);
  });

  it('applies small size class when size prop is "small"', () => {
    render(<QuantityControl {...defaultProps} size="small" />);

    const container = screen.getByRole("group");
    expect(container).toHaveClass("gap-2");

    const buttons = screen.getAllByRole("button");
    buttons.forEach((button) => {
      expect(button).toHaveClass("w-5", "h-5");
    });

    const quantity = screen.getByText("1");
    expect(quantity).toHaveClass("text-sm");
  });

  it('applies large size class when size prop is "large"', () => {
    render(<QuantityControl {...defaultProps} size="large" />);

    const container = screen.getByRole("group");
    expect(container).toHaveClass("gap-4");

    const buttons = screen.getAllByRole("button");
    buttons.forEach((button) => {
      expect(button).toHaveClass("w-8", "h-8");
    });
  });

  it("applies custom className when provided", () => {
    const customClass = "custom-class";
    render(<QuantityControl {...defaultProps} className={customClass} />);

    const container = screen.getByRole("group");
    expect(container).toHaveClass(customClass);
  });

  it("displays the correct quantity", () => {
    const quantity = 5;
    render(<QuantityControl {...defaultProps} quantity={quantity} />);

    expect(screen.getByText(quantity.toString())).toBeInTheDocument();
  });
});
