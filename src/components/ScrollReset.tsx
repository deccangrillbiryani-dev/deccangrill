import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollReset() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Instantly scroll to the very top left of the page
    window.scrollTo(0, 0);
  }, [pathname]); // This effect runs every time the URL path changes

  return null; // It renders nothing to the screen
}