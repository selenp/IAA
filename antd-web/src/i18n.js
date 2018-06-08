import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(LanguageDetector).init({
  // we init with resources
  resources: {
    en: {
      translations: {
        "zh": "中文",
        "en": "英文",
        "任务": "Tasks",
        "系统管理": "System Setting",
        "领取设备": "领取设备",
        "归还设备": "归还设备",
      },
    },
    zh: {
      translations: {
        "zh": "Chinese",
        "en": "English",
        "任务": "任务",
        "系统管理": "系统管理",
        "领取设备": "领取设备",
        "归还设备": "归还设备",
      },
    },
  },
  fallbackLng: "en",
  debug: true,

  // have a common namespace used around the full app
  ns: ["translations"],
  defaultNS: "translations",

  keySeparator: false, // we use content as keys

  interpolation: {
    escapeValue: false, // not needed for react!!
    formatSeparator: ",",
  },

  react: {
    wait: true,
  },
});

export default i18n;
