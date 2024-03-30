import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { GlobeIcon } from "@radix-ui/react-icons";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

type LanguageType = "ar" | "en";

const Language = () => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = React.useState<LanguageType>(
    (i18n.language as LanguageType) || "ar"
  );

  useEffect(() => {
    // change language
    language && i18n.changeLanguage(language);

    localStorage.setItem("language", language);
  }, [language]);

  return (
    <DropdownMenu dir={(t("common.dir") as "rtl" | "ltr") || "rtl"}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size={"icon"}>
          <GlobeIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{t("common.Language")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={language}
          onValueChange={(val) => {
            setLanguage(val as LanguageType);
            localStorage.setItem("language", language);
          }}
        >
          <DropdownMenuRadioItem value="ar">العربية</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="en">English</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Language;
