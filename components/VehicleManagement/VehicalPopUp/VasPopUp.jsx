'use client';
import React from "react";

const VasPopUp = ({ data, onClose }) => {
  console.log(data);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">Vas and Amount</h2>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">VAS Name</th>
              <th className="border border-gray-300 px-4 py-2">VAS Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td className="border border-gray-300 px-4 py-2">{item.VAS_Name}</td>
                <td className="border border-gray-300 px-4 py-2">₹{item.VAS_price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={onClose}
          className="mt-4 px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default VasPopUp;
