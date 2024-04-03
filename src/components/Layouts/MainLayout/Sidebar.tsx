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
      <div>
        <Logo />
        <div className="flex overflow-x-hidden overflow-auto h-[78dvh] flex-col gap-y-2">
          {ROUTES.map((route) => {
            return (
              <Link key={route.path} to={route.path}>
                <Button
                  variant={
                    location.pathname === route.path ? "secondary" : "ghost"
                  }
                  size={"lg"}
                  className={cn(
                    "flex px-4 gap-x-2 w-full transition-all justify-start duration-300",
                    isSidebarOpen ? "" : ""
                  )}
                >
                  <ul className="">{route.icon}</ul>
                  {isSidebarOpen && <span>{route.name}</span>}
                </Button>
              </Link>
            );
          })}
        </div>
      </div>
      <LogoutButton />
    </div>
  );
};

export default Sidebar;
