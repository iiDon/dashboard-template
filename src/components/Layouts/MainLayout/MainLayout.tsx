import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header/Header";
import { cn } from "@/lib/shadcn";
import { useTranslation } from "react-i18next";
import React, { useEffect } from "react";
import { useSideBarRoutes } from "./Routes";
import ProtectedRoutes from "@/components/ProtectedRoutes";
import useSidebarStore from "@/store/sidebar";

const MainLayout = () => {
  const { t } = useTranslation();
  const { isSidebarOpen } = useSidebarStore((state) => state);
  const location = useLocation().pathname;
  const { ROUTES } = useSideBarRoutes();
  const [currentPath, setCurrentPath] = React.useState(
    ROUTES.find((route) => route.path === location)?.name
  );

  useEffect(() => {
    setCurrentPath(ROUTES.find((route) => route.path === location)?.name);
  }, [location, ROUTES]);

  return (
    <ProtectedRoutes>
      <div
        dir={t("common.dir") || "rtl"}
        className="flex bg-slate-50 h-screen  justify-center"
      >
        <div className="w-full flex">
          <div
            className={cn(
              "transition-all duration-300 ",
              isSidebarOpen
                ? "w-80   hidden sm:block "
                : "w-20 hidden sm:block justify-center items-center"
            )}
          >
            <Sidebar />
          </div>
          <div
            className={cn(
              "flex flex-col h-screen w-full",
              isSidebarOpen ? "col-span-8 md:col-span-6" : "col-span-8"
            )}
          >
            <Header />
            <section
              dir={t("common.dir") || "rtl"}
              className="px-6 pt-6  overflow-y-auto"
            >
              <h1 className="md:text-2xl text-xl font-bold mb-4">
                {currentPath}
              </h1>
              <Outlet />
            </section>
          </div>
        </div>
      </div>
    </ProtectedRoutes>
  );
};

export default MainLayout;
