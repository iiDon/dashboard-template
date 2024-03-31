import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Error = () => {
  const { t } = useTranslation();
  return (
    <div className="container flex flex-col items-center justify-center h-[70vh]">
      <img src="/404.svg" alt="" className="w-72" />
      <h1 className="mb-4 text-center text-2xl font-bold text-primary">
        {t("common.404")}
      </h1>

      <Button>
        <Link to="/">{t("common.main_page")}</Link>
      </Button>
    </div>
  );
};

export default Error;
