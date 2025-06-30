import { create } from "zustand";
//creating global state for theme management using zustand
// zustand is a small, fast and scalable bearbones state-management solution.
// It has a minimal API and is very easy to use.
export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("streamSync-theme") || "forest",
  //because if refresh the page then the theme will be lost if we don't set it in localStorage.
  setTheme: (theme) => {
    localStorage.setItem("streamSync-theme", theme);
    set({ theme });
  },
}));
