import { createContext, useState } from "react";


const LanguageContext = createContext();

export const LanguageContextProvider = ({ children }) => {


  const texts = {
    es: {
      main: { title: "Lector", results: "resultados" },
      search: {
        title: "Buscar",
        session: "Sesión",
        range: "Rango",
        start: "Inicio",
        end: "Final",
        zone: "Zona",
        sector: "Sector",
        tags: "Etiquetas",
        text: "Texto",
        order: "Orden",
        clear: "Limpiar",
        submit: "Buscar",
      },
      share: {
        msg: "Aplicación para la revisión de la prensa burguesa."
      }
    },
    en: {
      main: { title: "Reader", results: "results" },
      search: {
        title: "Buscar",
        session: "Sesión",
        range: "Rango",
        start: "Inicio",
        end: "Final",
        sector: "Sector",
        tags: "Etiquetas",
        text: "Texto",
        order: "Orden",
        clear: "Limpiar",
        submit: "Buscar",
      },
    },
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
