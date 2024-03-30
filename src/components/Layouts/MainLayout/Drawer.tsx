import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/shadcn";
import { Link, useLocation } from "react-router-dom";

import LogoutButton from "./LogoutButton";
import { t } from "i18next";
import { useSideBarRoutes } from "./Routes";
import { Button } from "@/components/ui/button";
import useSidebarStore from "@/store/sidebar";

export const Logo = () => {
  return (
    <div>
      <img className="w-36 m-auto" src={"./Logo"} alt="logo" />
      <div className="my-4">
        <hr />
      </div>
    </div>
  );
};

const Drawer = () => {
  const location = useLocation();
  const { ROUTES } = useSideBarRoutes();
  const { isSidebarOpen, setIsSidebarOpen } = useSidebarStore((state) => state);

  return (
    <Sheet>
      <SheetTrigger>
        <Button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          size={"icon"}
          className="p-2.5"
          asChild
        >
          <HamburgerMenuIcon className="w-full text-primary-foreground" />
        </Button>
      </SheetTrigger>
      <SheetContent
        dir={t("common.dir") || "rtl"}
        side={t("common.dir") === "rtl" ? "right" : "left"}
        className="text-primary-foreground justify-between flex flex-col bg-primary p-4 h-full"
      >
        <div>
          <Logo />

          <SheetDescription className="overflow-y-auto h-screen">
            {ROUTES.map((route) => {
              return (
                <SheetClose asChild key={route.path}>
                  <Button
                    className={cn(
                      "flex mb-4 hover:bg-darkPrimary text-white hover:text-white items-center justify-start gap-x-2 w-full",
                      location.pathname === route.path && "bg-darkPrimary "
                    )}
                    variant="ghost"
                    asChild
                  >
                    <Link to={route.path}>
                      {route.icon}
                      {route.name}
                    </Link>
                  </Button>
                </SheetClose>
              );
            })}
          </SheetDescription>
        </div>
        <LogoutButton />
      </SheetContent>
    </Sheet>
  );
};

export default Drawer;
