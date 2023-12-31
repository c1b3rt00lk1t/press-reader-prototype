import React from "react";
import { createContext, useState } from "react";
import PropsTypes from "prop-types";

const LanguageContext = createContext();

export const LanguageContextProvider = ({ children }) => {
  const texts = {
    es: {
      language: "Castellano",
      main: {
        title: "Lector",
        results: "resultados",
        warningDesktop:
          "modo desktop activado, clica para seleccionar una carpeta",
      },
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
        msg: "Aplicación para la revisión de la prensa.",
      },
      settings: {
        title: "Configuración",
        prototype: "Prototipo",
        prefetchOnce: "Precarga siempre la última sesión (una vez)",
        prefetchAlways: "Precarga siempre la última sesión ",
        prefetchOnSubmit: "Precarga con Buscar",
        desktop: "Desktop",
        selectFolder: "(selecciona una carpeta)",
        fetchLastSession: "Precarga última sesión",
        lastFetched: "Precargada",
        driveDownload: "Descarga desde drive",
        session: "Sesión",
      },
    },
    en: {
      language: "English",
      main: {
        title: "Reader",
        results: "results",
        warningDesktop: "desktop mode activated, click to select a folder",
      },
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
        msg: "App for the review of the press.",
      },
      settings: {
        title: "Settings",
        prototype: "Prototype",
        prefetchOnce: "Always prefetch last session (once)",
        prefetchAlways: "Always prefetch last session",
        prefetchOnSubmit: "Prefetch on Search",
        desktop: "Desktop",
        selectFolder: "(select a folder)",
        fetchLastSession: "Prefetch last session",
        lastFetched: "Last prefetched",
        driveDownload: "Download from drive",
        session: "Session",
      },
    },
    it: {
      language: "Italiano",
      main: {
        title: "Lettore",
        results: "risultati",
        warningDesktop:
          "modo desktop attivato, clica per selezionare una cartella",
      },
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
        msg: "App per la revisione dei giornali.",
      },
      settings: {
        title: "Configurazione",
        prototype: "Prototipo",
        prefetchOnce: "Precarica sempre l'ultima sesione (una volta)",
        prefetchAlways: "Precarica sempre l'ultima sesione ",
        prefetchOnSubmit: "Precarica con Cercare",
        desktop: "Desktop",
        selectFolder: "(selezionare una cartella)",
        fetchLastSession: "Precarica ultima sesione",
        lastFetched: "Precaricata",
        driveDownload: "Scarica dal drive",
        session: "Sessione",
      },
    },
  };

  const handleSetLanguage = (ev) => {
    setLanguage(ev.target.id);
    window.localStorage.setItem("PrRe_lang", ev.target.id);
  };

  const [language, setLanguage] = useState(
    window.localStorage.getItem("PrRe_lang") || "es"
  );
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

LanguageContextProvider.propTypes = {
  children: PropsTypes.node.isRequired,
};

export default LanguageContext;
