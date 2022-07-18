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
        main: { title: "Reader", results: "results" },
        search: {
          title: "Search",
          session: "Session",
          range: "Range",
          start: "Start",
          end: "Final",
          zone: "Zone",
          sector: "Sector",
          tags: "Tags",
          text: "Text",
          order: "Order",
          clear: "Clear",
          submit: "Search",
        },
        share: {
          msg: "App for the review of the borgoise press."
        },
        settings:{
          title: "Settings",
          prototype: "Prototype",
          prefetchOnce: "Always prefetch last session (once)",
          prefetchAlways: "Always prefetch last session (once)",
          prefetchOnSubmit: "Prefetch on Search",
          desktop: "Desktop",
          fetchLastSession: "Prefetch last session",
          lastFetched: "Last prefetched"
          
        }
      },
      it: {
        main: { title: "Lettore", results: "risultati" },
        search: {
          title: "Cercare",
          session: "Sesione",
          range: "Rango",
          start: "Inizio",
          end: "Finale",
          zone: "Zona",
          sector: "Settore",
          tags: "Tags",
          text: "Testo",
          order: "Ordine",
          clear: "Clear",
          submit: "Cerca",
        },
        share: {
          msg: "App per la revisione dei giornali borghesi."
        },
        settings:{
          title: "Configurazione",
          prototype: "Prototipo",
          prefetchOnce: "Precarica sempre l'ultima sesione (una volta)",
          prefetchAlways: "Precarica sempre l'ultima sesione ",
          prefetchOnSubmit: "Precarica con Cercare",
          desktop: "Desktop",
          fetchLastSession: "Precarica ultima sesione",
          lastFetched: "Precaricata"
          
        }
      },
  };

  const handleSetLanguage = (ev) => {
    setLanguage(ev.target.id);
    window.localStorage.setItem("PrRe_lang",ev.target.id);
  };

  const [language, setLanguage] = useState(window.localStorage.getItem("PrRe_lang") || "es");
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
