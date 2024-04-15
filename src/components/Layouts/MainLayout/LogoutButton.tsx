import { cn } from "@/lib/shadcn";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import useSidebarStore from "@/store/sidebar";
import Icon from "@/components/ui/icon";
import { Separator } from "@/components/ui/separator";

const LogoutButton = () => {
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
          " transition-all w-full px-3 justify-start h-12 duration-300",
          isSidebarOpen ? "" : " "
        )}
      >
        <ul>{<Icon name="log-out" />}</ul>
        <span className={cn("font-bold", isSidebarOpen ? "ms-2" : "hidden")}>
          {t("sidebar.logout")}
        </span>
      </Button>
    </div>
  );
};

export default LogoutButton;
