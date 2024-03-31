import Icon from "@/components/ui/icon";
import { IRoute } from "@/types/types";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

export const useSideBarRoutes = () => {
  const { t } = useTranslation();
  const [ROUTES, setRoutes] = React.useState<IRoute[]>([
    {
      path: "/dashboard/",
      name: t("sidebar.dashboard"),
      icon: <Icon name="home" />,
    },
    {
      path: "/dashboard/users",
      name: t("sidebar.users"),
      icon: <Icon name="person-standing" />,
    },

    {
      path: "/dashboard/example",
      name: t("sidebar.users"),
      icon: <Icon name="calendar" />,
    },
  ]);

  useEffect(() => {
    setRoutes([
      {
        path: "/dashboard/",
        name: t("sidebar.dashboard"),
        icon: <Icon name="home" />,
      },
      {
        path: "/dashboard/users",
        name: t("sidebar.users"),
        icon: <Icon name="person-standing" />,
      },

      {
        path: "/dashboard/example",
        name: t("sidebar.example"),
        icon: <Icon name="calendar" />,
      },
    ]);
  }, [t]);

  return { ROUTES };
};
