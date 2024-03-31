import {
  Sheet,
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
import React from "react";

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
  const [open, setOpen] = React.useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          size={"icon"}
          className="p-2.5"
          asChild
        >
          <HamburgerMenuIcon className="w-full " />
        </Button>
      </SheetTrigger>
      <SheetContent
        dir={t("common.dir") || "rtl"}
        side={t("common.dir") === "rtl" ? "right" : "left"}
        className=" justify-between flex flex-col bg-primary p-4 h-full"
      >
        <div>
          <Logo />

          <SheetDescription className="overflow-y-auto h-screen flex flex-col gap-y-4">
            {ROUTES.map((route) => {
              return (
                <Link key={route.path} to={route.path}>
                  <Button
                    onClick={() => setOpen(false)}
                    size={"lg"}
                    className={cn(
                      "flex px-4 items-center gap-x-4 justify-start shadow-none w-full"
                    )}
                    variant={
                      location.pathname === route.path ? "secondary" : "default"
                    }
                  >
                    <span>{route.icon}</span>
                    <span>{route.name}</span>
                  </Button>
                </Link>
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
