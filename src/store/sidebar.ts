import { create } from "zustand";

interface SidebarState {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isSidebarOpen: boolean) => void;
}

const useSidebarStore = create<SidebarState>((set) => ({
  isSidebarOpen: true,
  setIsSidebarOpen: (isSidebarOpen) => set({ isSidebarOpen }),
}));

export default useSidebarStore;
