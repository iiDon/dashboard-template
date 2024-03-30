import { create } from "zustand";

interface SidebarState {
  isSidebarOpen: Boolean;
  setIsSidebarOpen: (isSidebarOpen: Boolean) => void;
}

const useSidebarStore = create<SidebarState>((set) => ({
  isSidebarOpen: true,
  setIsSidebarOpen: (isSidebarOpen) => set({ isSidebarOpen }),
}));

export default useSidebarStore;
