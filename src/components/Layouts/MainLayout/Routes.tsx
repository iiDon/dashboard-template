import { IRoute } from "@/types/types";
import { HomeIcon, PersonIcon, CalendarIcon } from "@radix-ui/react-icons";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

export const useSideBarRoutes = () => {
  const { t } = useTranslation();
  const [ROUTES, setRoutes] = React.useState<IRoute[]>([
    {
      path: "/dashboard/",
      name: t("sidebar.dashboard"),
      icon: <HomeIcon />,
    },
    {
      path: "/dashboard/users",
      name: t("sidebar.users"),
      icon: <PersonIcon />,
    },

    {
      path: "/dashboard/events",
      name: t("sidebar.conferences"),
      icon: <CalendarIcon />,
    },
  ]);

  useEffect(() => {
    setRoutes([
      {
        path: "/dashboard/",
        name: t("sidebar.dashboard"),
        icon: <HomeIcon />,
      },
      {
        path: "/dashboard/users",
        name: t("sidebar.users"),
        icon: <PersonIcon />,
      },

      {
        path: "/dashboard/events",
        name: t("sidebar.conferences"),
        icon: <CalendarIcon />,
      },
    ]);
  }, [t]);

  return { ROUTES };
};
