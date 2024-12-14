import * as XLSX from "xlsx";

// Export data to Excel
export const exportToExcel = (data, fileName = "data.xlsx") => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  XLSX.writeFile(workbook, fileName);
};

// Import data from Excel
export const importFromExcel = (file, callback) => {
  const reader = new FileReader();

  reader.onload = (event) => {
    const binaryData = event.target.result;
    const workbook = XLSX.read(binaryData, { type: "binary" });
    const worksheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[worksheetName];
    const importedData = XLSX.utils.sheet_to_json(worksheet);
    callback(importedData); // Pass data back to the caller
  };

  reader.readAsBinaryString(file);
};
