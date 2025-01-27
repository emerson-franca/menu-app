import { renderHook } from "@testing-library/react";
import { usePreventScroll } from "./usePreventScroll";

describe("usePreventScroll", () => {
  const originalInnerWidth = window.innerWidth;
  const originalStyle = document.body.style.overflow;

  beforeEach(() => {
    document.body.style.overflow = originalStyle;
  });

  afterEach(() => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    });
    document.body.style.overflow = originalStyle;
  });

  it("prevents scroll on mobile when open", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 375,
    });

    renderHook(() => usePreventScroll(true));
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("allows scroll on mobile when closed", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 375,
    });

    renderHook(() => usePreventScroll(false));
    expect(document.body.style.overflow).toBe("unset");
  });

  it("prevents scroll on desktop when checkMobile is false", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1024,
    });

    renderHook(() => usePreventScroll(true, false));
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("allows scroll on desktop by default", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1024,
    });

    renderHook(() => usePreventScroll(true));
    expect(document.body.style.overflow).toBe("unset");
  });

  it("handles window resize", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 375,
    });

    renderHook(() => usePreventScroll(true));
    expect(document.body.style.overflow).toBe("hidden");

    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1024,
    });

    window.dispatchEvent(new Event("resize"));
    expect(document.body.style.overflow).toBe("unset");
  });

  it("cleans up on unmount", () => {
    const { unmount } = renderHook(() => usePreventScroll(true));
    unmount();
    expect(document.body.style.overflow).toBe("unset");
  });
});
