import React, { useState } from 'react';
// import { Document, Page } from 'react-pdf';
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

/**
 * More info and options found in:
 * https://github.com/wojtekmaj/react-pdf
 * https://pspdfkit.com/blog/2018/open-pdf-in-react/
 */

const PDFDocument = ({url}) => {

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  }
  return (
    <div>
      <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  )
}

export default PDFDocument