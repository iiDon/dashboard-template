import { useTranslation } from "react-i18next";

function Main() {
  const { t } = useTranslation();
  return <>{t("common.dir")}</>;
}

export default Main;
