import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translation from "@/assets/locales/ar.json";
import en from "@/assets/locales/en.json";
// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  ar: {
    translation,
  },
  en: {
    translation: en,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: localStorage.getItem("language") || "ar",

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
