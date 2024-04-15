import { cn } from "@/lib/shadcn";
import { Link, useLocation } from "react-router-dom";
import { Logo } from "./Drawer";
import LogoutButton from "./LogoutButton";
import { useSideBarRoutes } from "./Routes";
import { Button } from "@/components/ui/button";
import useSidebarStore from "@/store/sidebar";

const Sidebar = () => {
  const location = useLocation();
  const { ROUTES } = useSideBarRoutes();
  const { isSidebarOpen } = useSidebarStore((state) => state);

  return (
    <div className="bg-primary overflow-x-hidden  text-primary-foreground justify-between flex flex-col  p-4 overflow-y-auto h-screen ">
      <div className=" h-[78dvh]">
        <Logo />
        <div className="flex overflow-x-hidden overflow-auto h-[78dvh] flex-col gap-y-2">
          {ROUTES.map((route) => {
            return (
              <Button
                variant={
                  location.pathname === route.path ? "secondary" : "ghost"
                }
                className={cn(
                  " transition-all w-full px-3 justify-start h-12 duration-300",
                  isSidebarOpen ? "" : " "
                )}
                key={route.path}
                asChild
              >
                <Link to={route.path}>
                  <span>{route.icon}</span>
                  <span
                    className={cn(
                      "font-bold",
                      isSidebarOpen ? "ms-2" : "hidden"
                    )}
                  >
                    {route.name}
                  </span>
                </Link>
              </Button>
            );
          })}
        </div>
      </div>
      <LogoutButton />
    </div>
  );
};

export default Sidebar;
