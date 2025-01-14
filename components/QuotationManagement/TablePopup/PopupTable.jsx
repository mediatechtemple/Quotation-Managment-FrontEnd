import React from "react";

const PopupTable = ({ showPopup, selectedData, handlePopupClose }) => {
  console.log(showPopup);
  console.log(selectedData);
  if (!showPopup) return null;

  // Group data for Accessories and Prices
  const accessories = [selectedData.accessories1, selectedData.accessories2].filter(Boolean);
  const prices = [selectedData.price1, selectedData.price2].filter(Boolean);

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-1/2">
        <h2 className="text-xl font-bold mb-4">Details</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Accessories</th>
              <th className="border border-gray-300 px-4 py-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {accessories.map((accessory, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">{accessory}</td>
                <td className="border border-gray-300 px-4 py-2">{prices[index] || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={handlePopupClose}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PopupTable;
