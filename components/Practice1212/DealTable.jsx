import React from "react";

const DealTable = () => {
  return (
    <div className="pt-4">
      <table className="w-full">
        <tbody>
          <tr>
            <th className="border border-gray-300 px-4 py-2 w-1/4">
              Final deal Amount in number
            </th>
            <td className="border border-gray-300 px-4 py-2">
              ₹1,499.00
            </td>
          </tr>
          <tr>
            <th className="border border-gray-300 px-4 py-2 w-1/4">
              Net deal Amount in words
            </th>
            <td className="border border-gray-300 px-4 py-2">
              ₹1,499.00
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DealTable;
