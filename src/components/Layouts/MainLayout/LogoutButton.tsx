import { cn } from "@/lib/shadcn";
import { useTranslation } from "react-i18next";
import React from "react";
import { Button } from "@/components/ui/button";
import useSidebarStore from "@/store/sidebar";
import Icon from "@/components/ui/icon";
import { Separator } from "@/components/ui/separator";

const LogoutButton = () => {
  const [isLoading] = React.useState<boolean>(false);
  const { t } = useTranslation();
  const { isSidebarOpen } = useSidebarStore((state) => state);

  const handleLogout = async () => {};
  return (
    <div>
      <Separator className="my-4" />
      <Button
        onClick={handleLogout}
        variant={"ghost"}
        size={"lg"}
        className={cn(
          "flex px-4 gap-x-2 w-full",
          isSidebarOpen ? "justify-start" : "justify-center"
        )}
      >
        <ul>{<Icon name="log-out" />}</ul>
        {isSidebarOpen && <span>{t("sidebar.logout")}</span>}
      </Button>
    </div>
  );
};

export default LogoutButton;
