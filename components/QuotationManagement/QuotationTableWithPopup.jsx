import React, { useState } from "react";

const QuotationTableWithPopup = ({ submittedData }) => {
  const [selectedRow, setSelectedRow] = useState(null); // To track selected row for popup details

  const tableHeaders = [
    { key: "modelnames", label: "Model" },
    { key: "fuel", label: "Fuel" },
    { key: "colorname", label: "Color" },
    { key: "variantname", label: "Variant" },
    { key: "Ex_Showroom_Price", label: "Ex Showroom" },
    { key: "actions", label: "Actions" },
  ];

  const toggleDetails = (index) => {
    setSelectedRow(selectedRow === index ? null : index); // Toggle the selected row
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-blue-500">
            {tableHeaders.map((header, index) => (
              <th key={index} className="border border-gray-300 px-4 py-2 text-white">
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {submittedData.map((data, index) => (
            <React.Fragment key={index}>
              {/* Main row */}
              <tr>
                <td className="border border-gray-300 px-4 py-2">{data.modelnames || "N/A"}</td>
                <td className="border border-gray-300 px-4 py-2">{data.fuel || "N/A"}</td>
                <td className="border border-gray-300 px-4 py-2">{data.colorname || "N/A"}</td>
                <td className="border border-gray-300 px-4 py-2">{data.variantname || "N/A"}</td>
                <td className="border border-gray-300 px-4 py-2">{data.Ex_Showroom_Price || "N/A"}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded"
                    onClick={() => toggleDetails(index)}
                  >
                    {selectedRow === index ? "Hide Details" : "View Details"}
                  </button>
                </td>
              </tr>

              {/* Expanded row for details */}
              {selectedRow === index && (
                <tr>
                  <td colSpan={tableHeaders.length} className="border border-gray-300 bg-gray-100 px-4 py-2">
                    <div>
                      <h3 className="text-lg font-bold mb-2">Details</h3>
                      <table className="min-w-full border-collapse border border-gray-200">
                        <thead>
                          <tr className="bg-gray-300">
                            <th className="border border-gray-400 px-2 py-1">Type</th>
                            <th className="border border-gray-400 px-2 py-1">Details</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-gray-400 px-2 py-1">Accessories</td>
                            <td className="border border-gray-400 px-2 py-1">
                              {JSON.stringify(data.accessories, null, 2) || "N/A"}
                            </td>
                          </tr>
                          <tr>
                            <td className="border border-gray-400 px-2 py-1">VAS</td>
                            <td className="border border-gray-400 px-2 py-1">
                              {JSON.stringify(data.vas, null, 2) || "N/A"}
                            </td>
                          </tr>
                          <tr>
                            <td className="border border-gray-400 px-2 py-1">Insurances</td>
                            <td className="border border-gray-400 px-2 py-1">
                              {JSON.stringify(data.insurances, null, 2) || "N/A"}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuotationTableWithPopup;
