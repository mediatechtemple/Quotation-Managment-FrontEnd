'use client';

import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import Select from 'react-select';

const ExcelHeaderEditor = () => {
  const [fileData, setFileData] = useState(null);
  const [headers, setHeaders] = useState([]);
  const [firstRow, setFirstRow] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [updatedHeaders, setUpdatedHeaders] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return; // अगर फाइल सिलेक्ट नहीं है तो कुछ मत करो
    const reader = new FileReader();

    reader.onload = (event) => {
      const arrayBuffer = event.target.result;
      const workbook = XLSX.read(new Uint8Array(arrayBuffer), { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
        header: 1,
      });

      const headers = sheetData[0];
      const firstRow = sheetData[1];

      setHeaders(headers);
      setFirstRow(firstRow);
      setUpdatedHeaders([...headers]);
      setFileData(sheetData);
      setIsPopupOpen(true);

      // Reset file input value to allow re-selection of the same file
      e.target.value = null;
    };

    reader.readAsArrayBuffer(file);
  };

  const handleHeaderChange = (index, newHeader) => {
    const updated = [...updatedHeaders];
    updated[index] = newHeader;
    setUpdatedHeaders(updated);
  };

  const generateOptions = () => {
    return [
      { value: 'SrNo', label: 'Sr No' },
      { value: 'ManufacturingYear', label: 'Manufacturing Year' },
      { value: 'VCCode', label: 'VC Code (8-12)' },
      { value: 'PPL', label: 'PPL' },
      { value: 'Fuel', label: 'Fuel' },
      { value: 'Variant', label: 'Variant' },
      { value: 'Colour', label: 'Colour' },
      { value: 'ExShowroomPrice', label: 'Ex Showroom Price' },
      { value: 'ExchangeScrappageDiscount', label: 'Exchange / Scrappage Discount' },
      { value: 'CorporateOfferTop20', label: 'Corporate Offer Top @20' },
      { value: 'CorporateOfferTOI', label: 'Corporate Offer @TOI' },
      { value: 'AdditionalOffer', label: 'Additional Offer' },
      { value: 'RTONormal', label: 'RTO Normal' },
      { value: 'RTONormalScrap', label: 'RTO Normal Scrap' },
      { value: 'RTOBH', label: 'RTO BH' },
      { value: 'RTOTRC', label: 'RTO TRC' },
      { value: 'Insurance', label: 'Insurance' },
      { value: 'Qty', label: 'Qty' },
    ];
  };

  const handleDownload = async () => {
    if (!fileData) return;

    const updatedData = [updatedHeaders, ...fileData.slice(1)];
    const worksheet = XLSX.utils.aoa_to_sheet(updatedData);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Updated Sheet');

    const excelBlob = new Blob(
      [XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })],
      { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }
    );

    const formData = new FormData();
    formData.append('excelFile', excelBlob, 'UpdatedExcel.xlsx');

    try {
      const response = await fetch('https://quotationlocal.onrender.com/api/model/excel', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('File uploaded successfully');
      } else {
        console.error('File upload failed:', await response.text());
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }

    setIsPopupOpen(false);
  };

  return (
    <div className="p-4 border-2 border-red-500">
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => document.getElementById('fileInput').click()}
      >
        Upload Excel File
      </button>

      <input
        type="file"
        id="fileInput"
        accept=".xlsx, .xls"
        style={{ display: 'none' }}
        onChange={handleFileUpload}
      />

      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[50]">
          <div className="bg-white p-6 rounded shadow-lg w-3/4 max-w-2xl">
            <h2 className="text-lg font-bold mb-4">Edit Headers</h2>
            <div className="h-80 overflow-y-auto">
              <table className="table-auto w-full border">
                <thead>
                  <tr>
                    <th className="border px-2 py-1">Excel File Header</th>
                    <th className="border px-2 py-1">First row value</th>
                    <th className="border px-2 py-1">Actual Header</th>
                  </tr>
                </thead>
                <tbody>
                  {headers.map((header, index) => (
                    <tr key={index}>
                      <td className="border px-2 py-1">{header}</td>
                      <td className="border px-2 py-1">{firstRow[index] || 'N/A'}</td>
                      <td className="border px-2 py-1">
                        <Select
                          options={generateOptions()}
                          value={{
                            value: updatedHeaders[index],
                            label: updatedHeaders[index],
                          }}
                          onChange={(option) => handleHeaderChange(index, option.value)}
                          className="w-full"
                          menuPlacement="auto"
                          menuPosition="fixed"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
