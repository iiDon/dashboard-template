import { useTranslation } from "react-i18next";

function App() {
  const { t } = useTranslation();
  return <>{t("common.dir")}</>;
}

export default App;
