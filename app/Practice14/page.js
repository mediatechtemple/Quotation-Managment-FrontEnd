"use client";
import React, { useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import CustomerDetailsTable from "@/components/Practice1212/CustomerDetailsTable";
import BankDetailsTable from "@/components/Practice1212/BankDetailsTable";
import AboutCar from "@/components/Practice1212/AboutCar";
import PriceDetail from "@/components/Practice1212/PriceDetail";
import TaxDetail from "@/components/Practice1212/TaxDetail";
import InsuranceAccessoriesTable from "@/components/Practice1212/InsuranceAcc";
import DealTable from "@/components/Practice1212/DealTable";
import Header from "@/components/Practice1212/Header";

const Pdfdownload = () => {
  const invoiceRef = useRef();
  const [isProcessing, setIsProcessing] = useState(false); // State to prevent multiple downloads

  // Function to handle the PDF download
  const handleDownloadPDF = async () => {
    setIsProcessing(true); // Start processing

    const element = invoiceRef.current;

    try {
      // Temporarily make the content visible for the capture
      element.style.visibility = "visible";
      element.style.position = "absolute"; // Ensure it's not taking up space

      // Capture the content of the invoiceRef in a canvas
      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      const ratio = pdfWidth / canvasWidth;
      const pageHeightInCanvasUnits = pdfHeight / ratio; // Height of one PDF page in canvas units

      let position = 0;

      // Loop to create a PDF that fits the content in multiple pages
      while (position < canvasHeight) {
        const canvasPage = document.createElement("canvas");
        canvasPage.width = canvasWidth;
        canvasPage.height = Math.min(
          pageHeightInCanvasUnits,
          canvasHeight - position
        );

        const ctx = canvasPage.getContext("2d");
        ctx.drawImage(
          canvas,
          0,
          position,
          canvasWidth,
          canvasPage.height,
          0,
          0,
          canvasWidth,
          canvasPage.height
        );

        const pageData = canvasPage.toDataURL("image/png");

        pdf.addImage(pageData, "PNG", 0, 0, pdfWidth, pdfHeight);

        position += pageHeightInCanvasUnits;

        if (position < canvasHeight) {
          pdf.addPage();
        }
      }

      pdf.save("invoice.pdf");

      // Reset visibility and position after PDF is generated
      element.style.visibility = "hidden";
      element.style.position = "static";
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsProcessing(false); // End processing
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen flex flex-col items-center">
      {/* Only the Download Button is visible */}
      <button
        onClick={handleDownloadPDF}
        className="mt-6 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring"
        aria-label="Download Invoice as PDF"
        disabled={isProcessing} // Disable the button during processing
      >
        {isProcessing ? "Generating PDF..." : "Download PDF"}
      </button>
      <h2>Gulshan</h2>

      {/* Hidden content that will still be included in the PDF */}
      <div
        ref={invoiceRef}
        className="p-6 bg-white border rounded shadow-md w-full max-w-3xl"
        style={{ visibility: "hidden", position: "absolute", top: "-9999px" }} // Hide content off-screen
      >
        {/* Hidden content to be captured in the PDF */}
        <Header />
        <h2 className="font-bold mt-4 text-center">
          QUOTATION / PROFORMA INVOICE
        </h2>
        <CustomerDetailsTable />
        <AboutCar />
        <PriceDetail />
        <TaxDetail />
        <InsuranceAccessoriesTable />
        <DealTable />
        <BankDetailsTable />
      </div>
      <h3>Ashoka</h3>
    </div>
  );
};

export default Pdfdownload;
