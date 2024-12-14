'use client'
import React, { useState } from "react";
import * as XLSX from "xlsx";

const ExcelHeaderEditor = () => {
  const [fileData, setFileData] = useState(null);
  const [headers, setHeaders] = useState([]);
  const [firstRow, setFirstRow] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [updatedHeaders, setUpdatedHeaders] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const arrayBuffer = event.target.result; // Ab yeh arrayBuffer hoga
      const workbook = XLSX.read(new Uint8Array(arrayBuffer), { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
        header: 1,
      });
      const headers = sheetData[0]; // First row (headers)
      const firstRow = sheetData[1]; // Second row (first row of data)
      setHeaders(headers);
      setFirstRow(firstRow);
      setUpdatedHeaders([...headers]); // Initialize with original headers
      setFileData(sheetData);
      setIsPopupOpen(true);
    };
    reader.readAsArrayBuffer(file); // Yaha ab `readAsArrayBuffer` use ho raha hai
  };
  

  const handleHeaderChange = (index, newHeader) => {
    const updated = [...updatedHeaders];
    updated[index] = newHeader;
    setUpdatedHeaders(updated);
  };

  const handleDownload = () => {
    if (!fileData) return;
    const updatedData = [updatedHeaders, ...fileData.slice(1)];
    const worksheet = XLSX.utils.aoa_to_sheet(updatedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Updated Sheet");
    XLSX.writeFile(workbook, "UpdatedExcel.xlsx");
    setIsPopupOpen(false); // Close popup after download
  };

  return (
    <div className="p-4">
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => document.getElementById("fileInput").click()}
      >
        Upload Excel File
      </button>
      <input
        type="file"
        id="fileInput"
        accept=".xlsx, .xls"
        style={{ display: "none" }}
        onChange={handleFileUpload}
      />

      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-3/4 max-w-2xl">
            <h2 className="text-lg font-bold mb-4">Edit Headers</h2>
            <table className="table-auto w-full border">
              <thead>
                <tr>
                  <th className="border px-2 py-1">Current Header</th>
                  <th className="border px-2 py-1">First Row Value</th>
                  <th className="border px-2 py-1">Update Header</th>
                </tr>
              </thead>
              <tbody>
                {headers.map((header, index) => (
                  <tr key={index}>
                    <td className="border px-2 py-1">{header}</td>
                    <td className="border px-2 py-1">
                      {firstRow[index] || "N/A"}
                    </td> 
                    <td className="border px-2 py-1">
                      <select
                        className="border px-2 py-1 w-full"
                        value={updatedHeaders[index]}
                        onChange={(e) =>
                          handleHeaderChange(index, e.target.value)
                        }
                      >
                        <option value={header}>{header}</option>
                        <option value="Custom1">Custom1</option>
                        <option value="Custom2">Custom2</option>
                        <option value="Custom3">Custom3</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setIsPopupOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded"
                onClick={handleDownload}
              >
                Download Updated Excel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExcelHeaderEditor;
