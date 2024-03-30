import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AvatarComponent = () => {
  const { t } = useTranslation();

  const ROWS = [
    {
      label: t("avatar.myAccount"),
      onClick: () => console.log(t("avatar.myAccount")),
    },
    {
      label: t("avatar.settings"),
      onClick: () => console.log(t("avatar.settings")),
    },
    {
      label: t("avatar.logout"),
      onClick: async () => {
        console.log("Logout");
      },
    },
  ];

  return (
    <DropdownMenu dir={t("common.dir") === "rtl" ? "rtl" : "ltr"}>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuLabel>{t("avatar.myAccount")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {ROWS.map((row, index) => (
            <div key={row.label}>
              <DropdownMenuItem
                onClick={row.onClick}
                className="cursor-pointer"
              >
                {row.label}
              </DropdownMenuItem>
              {index !== ROWS.length - 1 && <DropdownMenuSeparator />}
            </div>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatarComponent;
