import { createContext } from "react";
import React from "react";
import { PropTypes } from "prop-types";

const ClipboardContext = createContext();

export const ClipboardContextProvider = ({ children }) => {
  const writeTextInClipboard = (text) => {
    navigator.clipboard.writeText(text).catch(
      /* istanbul ignore next */
      (err) => {
        console.error("Failed to copy text: ", err);
      }
    );
  };

  const writeInClipboard = ({ title, date, source, url2 }) => {
    const content = `<a href="${url2}" target="_blank" rel="noopener noreferrer">${title} (${source}, ${date
      .slice(6, 8)
      .padStart(2, "0")}-${date.slice(4, 6).padStart(2, "0")}-${date.slice(
      0,
      4
    )})</a>`;

    try {
      // const blobInputText = new Blob([content], { type: "text/plain" });
      const blobInput = new Blob([content], { type: "text/html" });
      const clipboardItemInput = new window.ClipboardItem({
        // "text/plain": blobInputText,
        "text/html": blobInput,
      });
      navigator.clipboard.write([clipboardItemInput]);
    } catch (e) {
      /* istanbul ignore next */
      console.log(e);
    }
  };

  // const readFromClipboard = async () => {
  //   try {
  //     const clipboardItems = await navigator.clipboard.read();

  //     for (const clipboardItem of clipboardItems) {
  //       console.log(clipboardItem);
  //       for (const type of clipboardItem.types) {
  //         const blob = await clipboardItem.getType(type);
  //         console.log(blob);
  //         console.log(type, await blob.text());
  //       }
  //     }
  //   } catch (err) {
  //     console.error(err.name, err.message);
  //   }
  // };

  return (
    <ClipboardContext.Provider
      value={{ writeTextInClipboard, writeInClipboard }}
    >
      {children}
    </ClipboardContext.Provider>
  );
};

ClipboardContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ClipboardContext;
