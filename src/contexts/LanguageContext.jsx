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
      },
      settings:{
        title: "Configuración",
        prototype: "Prototipo",
        prefetchOnce: "Precarga siempre la última sesión (una vez)",
        prefetchAlways: "Precarga siempre la última sesión ",
        prefetchOnSubmit: "Precarga con Buscar",
        desktop: "Desktop",
        fetchLastSession: "Precarga última sesión",
        lastFetched: "Precargada"
        
      }
    },
    en: {
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
        },
        settings:{
          title: "Configuración",
          prototype: "Prototipo",
          prefetchOnce: "Precarga siempre la última sesión (una vez)",
          prefetchAlways: "Precarga siempre la última sesión ",
          prefetchOnSubmit: "Precarga con Buscar",
          desktop: "Desktop",
          fetchLastSession: "Precarga última sesión",
          lastFetched: "Precargada"
          
        }
      },
      it: {
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
        },
        settings:{
          title: "Configuración",
          prototype: "Prototipo",
          prefetchOnce: "Precarga siempre la última sesión (una vez)",
          prefetchAlways: "Precarga siempre la última sesión ",
          prefetchOnSubmit: "Precarga con Buscar",
          desktop: "Desktop",
          fetchLastSession: "Precarga última sesión",
          lastFetched: "Precargada"
          
        }
      },
  };

  const handleSetLanguage = (ev) => {
    setLanguage(ev.target.id);
    console.log(ev.target.id)
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
