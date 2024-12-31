'use client';

import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import Select from 'react-select';

const ExcelHeaderEditor1 = () => {
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
      { value: 'sr_no', label: 'Sr. No' },
      { value: 'Manufacturing_Year', label: 'Manufacturing Year' },
      { value: 'VC_Code', label: 'VC Code' },
      { value: 'ppl', label: 'PPL' },
      { value: 'fuel_type', label: 'Fuel Type' },
      { value: 'variant', label: 'Variant' },
      { value: 'Ex_Showroom_Price', label: 'Ex Showroom Price' },
      { value: 'Corporate_Offer_Top', label: 'Corporate Offer Top' },
      { value: 'additional', label: 'Additional' },
      { value: 'RTO_Normal', label: 'RTO Normal' },
      { value: 'Corporate_Offer', label: 'Corporate Offer' },
      { value: 'other1', label: 'Other1' },
      { value: 'RTO_Normal_scrap', label: 'RTO Normal Scrap' },
      { value: 'RT_BH', label: 'RT BH' },
      { value: 'RT_TRC', label: 'RT TRC' },
      { value: 'insurance', label: 'Insurance' },
      { value: 'quantity', label: 'Quantity' },
      { value: 'color', label: 'Color' },
      { value: 'insurance1', label: 'Insurance 1' },
      { value: 'price1', label: 'Price 1' },
      { value: 'insurance2', label: 'Insurance 2' },
      { value: 'price2', label: 'Price 2' },
      { value: 'insurance3', label: 'Insurance 3' },
      { value: 'price3', label: 'Price 3' },
      { value: 'insurance4', label: 'Insurance 4' },
      { value: 'price4', label: 'Price 4' },
    ];
  };







  const handleDownload = async () => {
    const vc_code='vc_code'
    if (!fileData) return;

    const updatedData = [updatedHeaders, ...fileData.slice(1)];
    console.log(updatedData[0]);


    const exists = updatedData[0].some((item) => new RegExp(`^${vc_code}$`, 'i').test(item));
    if(!exists){
      alert('bro you can\'t upload this file');
      return;
    }
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
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExcelHeaderEditor1;
