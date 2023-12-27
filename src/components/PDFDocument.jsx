import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import PropTypes from "prop-types";

// Previously using a CDN
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
// Good advise found here: https://stackoverflow.com/questions/65740268/create-react-app-how-to-copy-pdf-worker-js-file-from-pdfjs-dist-build-to-your

import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import { ErrorBoundary } from "./ErrorBoundary";

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

/**
 * More info and options found in:
 * https://github.com/wojtekmaj/react-pdf
 * https://pspdfkit.com/blog/2018/open-pdf-in-react/
 */

const PDFDocument = ({ url }) => {
  const [numPages, setNumPages] = useState(null);
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div>
      {url && (
        <Document
          file={url}
          options={{ workerSrc: "/pdf.worker.js" }}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          {numPages &&
            Array.from(new Array(numPages), (el, index) => (
              <ErrorBoundary key={`page_${index + 1}`}>
                <Page
                  width={window.innerWidth >= 1500 ? 1800 : 750}
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              </ErrorBoundary>
            ))}
        </Document>
      )}
      {/* <p>
        Page {pageNumber} of {numPages}
      </p> */}
    </div>
  );
};

PDFDocument.propTypes = {
  url: PropTypes.instanceOf(Blob),
};

export default PDFDocument;
