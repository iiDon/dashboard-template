import { cn } from "@/lib/shadcn";
import { Link, useLocation } from "react-router-dom";
import { Logo } from "./Drawer";
import LogoutButton from "./LogoutButton";
import { useSideBarRoutes } from "./Routes";
import { Button } from "@/components/ui/button";

const Sidebar = () => {
  const location = useLocation();
  const { ROUTES } = useSideBarRoutes();

  return (
    <div className="bg-primary text-primary-foreground justify-between flex flex-col  p-4 overflow-y-auto h-screen ">
      <div>
        <Logo />
        <div className="flex flex-col gap-y-2">
          {ROUTES.map((route) => {
            return (
              <Link key={route.path} to={route.path}>
                <Button
                  variant={
                    location.pathname === route.path ? "secondary" : "ghost"
                  }
                  size={"lg"}
                  className={cn(
                    "flex  items-center justify-start gap-x-2 w-full"
                  )}
                >
                  <ul>{route.icon}</ul>
                  {route.name}
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
