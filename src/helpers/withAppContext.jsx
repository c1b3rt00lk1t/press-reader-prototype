import { pipe } from "./pipe";
import { withClipboardContext } from "./withClipboardContext";
import { withLanguageContext } from "./withLanguageContext";
import { withPressReaderContext } from "./withPressReaderContext";
import "../index.css";

export const withAppContext = (component) => {
  return pipe(
    withClipboardContext,
    withPressReaderContext,
    withLanguageContext
  )(component);
};
