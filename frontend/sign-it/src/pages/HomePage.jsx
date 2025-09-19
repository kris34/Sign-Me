import React, { useState, useEffect } from 'react';
import somefile from '../assets/document/example.pdf';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

function HomePage() {
    const [numPages, setNumPages] = useState(1);
    const [pageNumber, setPageNumber] = useState(1);
    const [pdfUrl, setPdfUrl] = useState(null);

    useEffect(() => {
        loadAndEditPdf();
    }, []);

    const loadAndEditPdf = async () => {
        // Fetch the PDF file as an ArrayBuffer
        const existingPdfBytes = await fetch(somefile).then(res => res.arrayBuffer());

        // Load the PDF document
        const pdfDoc = await PDFDocument.load(existingPdfBytes);

        // Embed a font
        const helveticaFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

        // Get the first page
        const pages = pdfDoc.getPages();
        const firstPage = pages[0];

        // Add some text
        firstPage.drawText('', {
            x: 50,
            y: firstPage.getHeight() - 100,
            size: 24,
            font: helveticaFont,
            color: rgb(0, 0.53, 0.71),
        });

        // Save the edited PDF as a Blob URL
        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);

        // Set number of pages
        setNumPages(pages.length);
        setPageNumber(1);
    };

    return (
        <div className="flex flex-col items-center min-h-screen p-4">

            <div className='p-5 flex border flex-col text-center mb-4'>
                <h2 className='text-white text-2xl font-bold'>
                    Welcome to Sign me!
                </h2>
                <p className='text-white'>
                    Sign me is a free open-source eSignature application.
                </p>
            </div>

            {pdfUrl ? (
                <iframe
                    src={pdfUrl}
                    title="Edited PDF"
                    className="md:w-[50%] h-[100%] flex-1 bg-white p-2 rounded shadow-md"
                />
            ) : (
                <p className="text-white">Loading PDF...</p>
            )}


            <p className="mt-2 text-gray-700">
                Page {pageNumber} of {numPages}
            </p>

            <div className="flex gap-2 mt-2">
                <button
                    onClick={() => setPageNumber(p => Math.max(p - 1, 1))}
                    disabled={pageNumber <= 1}
                    className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
                >
                    ◀ Prev
                </button>
                <button
                    onClick={() => setPageNumber(p => Math.min(p + 1, numPages))}
                    disabled={pageNumber >= numPages}
                    className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
                >
                    Next ▶
                </button>
            </div>
        </div>
    );
}

export default HomePage;
