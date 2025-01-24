import { useEffect } from "react";

export const usePreventScroll = (isOpen: boolean, checkMobile: boolean = true) => {
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const shouldPreventScroll = checkMobile ? isOpen && isMobile : isOpen;

    if (shouldPreventScroll) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      const shouldPreventScroll = checkMobile ? isOpen && isMobile : isOpen;
      
      if (!shouldPreventScroll) {
        document.body.style.overflow = "unset";
      } else {
        document.body.style.overflow = "hidden";
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen, checkMobile]);
};
