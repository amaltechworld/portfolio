/**
 * Navigation utility for handling cross-page navigation
 * Ensures smooth scrolling and proper routing between pages
 */

export const navigateToSection = (sectionId: string, fallbackUrl: string = "/") => {
  const hash = sectionId.startsWith("#") ? sectionId : `#${sectionId}`;
  
  // Check if we're on the home page and target exists
  if (window.location.pathname === "/" || window.location.pathname === "") {
    const target = document.querySelector(hash);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      return true;
    }
  }
  
  // Navigate to home page with hash if target doesn't exist or we're on a different page
  window.location.href = fallbackUrl + hash;
  return false;
};

export const navigateHome = () => {
  if (window.location.pathname === "/" || window.location.pathname === "") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    window.location.href = "/";
  }
};

export const isHomePage = () => {
  return window.location.pathname === "/" || window.location.pathname === "";
};
