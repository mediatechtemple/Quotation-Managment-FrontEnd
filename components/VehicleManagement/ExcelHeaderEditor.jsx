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
    };

    reader.readAsArrayBuffer(file);
  };

  const handleHeaderChange = (index, newHeader) => {
    const updated = [...updatedHeaders];
    updated[index] = newHeader;
    setUpdatedHeaders(updated);
  };

  // Static dropdown options
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
      // { value: 'Ins11AdsOn', label: 'Ins 11 Ads On' },
      { value: 'Qty', label: 'Qty' },
      // { value: 'EditDelete', label: 'Edit / Delete' },
    ];
  };
  
  

  // const handleDownload = () => {
  //   if (!fileData) return;

  //   const updatedData = [updatedHeaders, ...fileData.slice(1)];
  //   const worksheet = XLSX.utils.aoa_to_sheet(updatedData);
  //   const workbook = XLSX.utils.book_new();

  //   XLSX.utils.book_append_sheet(workbook, worksheet, 'Updated Sheet');
  //   XLSX.writeFile(workbook, 'UpdatedExcel.xlsx');

  //   setIsPopupOpen(false);
  // };
  const handleDownload = async () => {
    if (!fileData) return;
  
    // 1. Prepare the updated Excel file
    const updatedData = [updatedHeaders, ...fileData.slice(1)];
    const worksheet = XLSX.utils.aoa_to_sheet(updatedData);
    const workbook = XLSX.utils.book_new();
  
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Updated Sheet');
  
    // 2. Convert workbook to Blob
    const excelBlob = new Blob(
      [XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })],
      { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }
    );
  
    // 3. Prepare FormData
    const formData = new FormData();
    formData.append('excelFile', excelBlob, 'UpdatedExcel.xlsx'); // Attach file with name
  
    // 4. Send file to API
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
  
    // 5. Close popup
    setIsPopupOpen(false);
  };
  

  // const handleDownload = async () => {
  //   if (!fileData) return;
  
  //   // Create the updated data with headers and first row
  //   const updatedData = [updatedHeaders, ...fileData.slice(1)];
  
  //   try {
  //     // Prepare the data to send
  //     const payload = {
  //       headers: updatedHeaders,
  //       data: updatedData,
  //     };
  
  //     // Send POST request to API
  //     const response = await fetch('https://quotationlocal.onrender.com/api/model/excel', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({excelFile:payload}),
  //     });
  
  //     // Handle the response from the API
  //     if (response.ok) {
  //       const result = await response.json();
  //       alert('File data has been successfully submitted!');
  //       setIsPopupOpen(false);
  //     } else {
  //       alert('Failed to submit data. Please try again.');
  //     }
  //   } catch (error) {
  //     console.error('Error submitting data:', error);
  //     alert('Error submitting data. Please check the console for details.');
  //   }
  // };
  
  // const handleDownload = async () => {
  //   if (!fileData) return;
  
  //   // Create the updated data with headers and first row
  //   const updatedData = [updatedHeaders, ...fileData.slice(1)];
  
  //   try {
  //     // Prepare the FormData object
  //     const formData = new FormData();
      
  //     // You can append the updated data (in JSON format) to the FormData
  //     // Convert updated data to a JSON string
  //     const payload = JSON.stringify({
  //       headers: updatedHeaders,
  //       data: updatedData,
  //     });
  
  //     // Append the JSON data to FormData
  //     formData.append('excelFile', new Blob([payload], { type: 'application/json' }), 'updatedExcel.json');
  
  //     // Send POST request to the API with FormData
  //     const response = await fetch('https://quotationlocal.onrender.com/api/model/excel', {
  //       method: 'POST',
  //       body: formData, // Send the FormData with the updated data
  //     });
  
  //     // Handle the response from the API
  //     if (response.ok) {
  //       const result = await response.json();
  //       alert('File data has been successfully submitted!');
  //       setIsPopupOpen(false);
  //     } else {
  //       alert('Failed to submit data. Please try again.');
  //     }
  //   } catch (error) {
  //     console.error('Error submitting data:', error);
  //     alert('Error submitting data. Please check the console for details.');
  //   }
  // };
  

  return (
    <div className="p-4">
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
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
                          options={generateOptions()} // Use static options
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