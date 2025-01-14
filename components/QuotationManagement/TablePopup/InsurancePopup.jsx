import React from "react";

const InsurancePopup = ({ showPopup, selectedData, handlePopupClose }) => {
  if (!showPopup) return null;

  // Extract insurance and price keys dynamically
  const insuranceKeys = Object.keys(selectedData).filter((key) =>
    key.startsWith("insurance")
  );
  const priceKeys = Object.keys(selectedData).filter((key) =>
    key.startsWith("price")
  );

  // Pair the insurance and price values
  const dataPairs = insuranceKeys.map((insuranceKey, index) => ({
    insurance: selectedData[insuranceKey] || "N/A",
    price: selectedData[priceKeys[index]] || "N/A",
  }));

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-1/2">
        <h2 className="text-xl font-bold mb-4">Insurance Details</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Insurance</th>
              <th className="border border-gray-300 px-4 py-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {dataPairs?.map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">
                  {item.insurance}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={handlePopupClose}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default InsurancePopup;
