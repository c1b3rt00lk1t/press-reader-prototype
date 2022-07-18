import { createContext, useState } from "react";

const LanguageContext = createContext();

export const LanguageContextProvider = ({ children }) => {
  const texts = {
    es: { main: { title: "Lector", results: "resultados" } },
    en: { main: { title: "Reader", results: "results" } },
  };

  const handleSetLanguage = (lang) => {
    setLanguage(lang);
  };

  const [language, setLanguage] = useState("es");
  return (
    <LanguageContext.Provider
      value={{
        language,
        handleSetLanguage,
        texts,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
