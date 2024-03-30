// import the original type declarations
import "i18next";
// import all namespaces (for the default language, only)
import translation from "@/assets/locales/ar.json";
declare module "i18next" {
  // Extend CustomTypeOptions
  interface CustomTypeOptions {
    // custom resources type
    resources: {
      translation: typeof translation;
    };
    // other
  }
}
