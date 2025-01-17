import React from "react";

const InsuranceAccessoriesTable = () => {
  return (
    <div className="bg-gray-100 pt-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-md">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              {/* Accessories Header Merged */}
              <th
                colSpan="2"
                className="border border-gray-300 px-4 py-2 text-left"
              >
                Accessories
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Insurance
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                ₹56,000
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Accessories and Insurance Rows */}
            <tr>
              <th className="border border-gray-300 px-4 py-2">Mudflap</th>
              <td className="border border-gray-300 px-4 py-2">₹999.00</td>
              <th className="border border-gray-300 px-4 py-2">
                Basic Insurance
              </th>
              <td className="border border-gray-300 px-4 py-2">₹56,000.00</td>
            </tr>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Seat Cover</th>
              <td className="border border-gray-300 px-4 py-2">₹1,499.00</td>
              <th className="border border-gray-300 px-4 py-2">
                Extended Warranty
              </th>
              <td className="border border-gray-300 px-4 py-2">₹5,000.00</td>
            </tr>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Seat Cover</th>
              <td className="border border-gray-300 px-4 py-2">₹1,499.00</td>
              <th className="border border-gray-300 px-4 py-2">
                Total Insurance
              </th>
              <td className="border border-gray-300 px-4 py-2">₹5,000.00</td>
            </tr>
            {/* Accessories Amount Rows */}
            <tr>
              <th className="border border-gray-300 px-4 py-2">
                Accessories Amount
              </th>
              <td className="border border-gray-300 px-4 py-2" colSpan="3">
                ₹1,499.00
              </td>
            </tr>
            <tr>
              <th className="border border-gray-300 px-4 py-2">
                FOC Accessories Amount
              </th>
              <td className="border border-gray-300 px-4 py-2" colSpan="3">
                ₹1,499.00
              </td>
            </tr>
            <tr>
              <th className="border border-gray-300 px-4 py-2">
                Net Accessories Amount
              </th>
              <td className="border border-gray-300 px-4 py-2" colSpan="3">
                ₹1,499.00
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InsuranceAccessoriesTable;
