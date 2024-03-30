import { cn } from "@/lib/shadcn";
import { ExitIcon } from "@radix-ui/react-icons";
import { useTranslation } from "react-i18next";
import React from "react";
import { Button } from "@/components/ui/button";

const LogoutButton = () => {
  const [isLoading] = React.useState<boolean>(false);
  const { t } = useTranslation();

  const handleLogout = async () => {};
  return (
    <div className="flex flex-col gap-y-4">
      <hr />
      <Button
        onClick={handleLogout}
        disabled={isLoading}
        variant="ghost"
        size={"lg"}
        className={cn("flex  items-center justify-start gap-x-2")}
      >
        <ExitIcon />
        {t("sidebar.logout")}
      </Button>
    </div>
  );
};

export default LogoutButton;
