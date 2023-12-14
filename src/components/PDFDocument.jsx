import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import PropTypes from "prop-types";

// Previously using a CDN
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
// Good advise found here: https://stackoverflow.com/questions/65740268/create-react-app-how-to-copy-pdf-worker-js-file-from-pdfjs-dist-build-to-your

import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

/**
 * More info and options found in:
 * https://github.com/wojtekmaj/react-pdf
 * https://pspdfkit.com/blog/2018/open-pdf-in-react/
 */

const PDFDocument = ({ url }) => {
  const [numPages, setNumPages] = useState(null);
  //   const [pageNumber, setPageNumber] = useState(1);
  // const [pageNumber] = useState(1);
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div>
      <Document
        file={url}
        options={{ workerSrc: "/pdf.worker.js" }}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {Array.from(new Array(numPages), (el, index) => (
          <Page
            width={window.innerWidth >= 1500 ? 1800 : 750}
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        ))}
      </Document>
      {/* <p>
        Page {pageNumber} of {numPages}
      </p> */}
    </div>
  );
};

PDFDocument.propTypes = {
  url: PropTypes.string.isRequired,
};

export default PDFDocument;
