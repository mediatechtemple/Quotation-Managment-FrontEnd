import React from "react";

const CustomerDetailsTable = ({formData}) => {
  return (
    <table className="border-collapse border border-gray-500 w-full text-left mt-4">
      <tbody>
        <tr>
          <th className="border border-gray-500 px-2 py-1">Customer Name</th>
          <td className="border border-gray-500 px-2 py-1">{formData.customer_name}</td>
        </tr>
        <tr>
          <th className="border border-gray-500 px-2 py-1">Mobile</th>
          <td className="border border-gray-500 px-2 py-1">{formData.customer_mobile_no}</td>
        </tr>
        <tr>
          <th className="border border-gray-500 px-2 py-1">Address</th>
          <td className="border border-gray-500 px-2 py-1">{formData.address}</td>
        </tr>
        <tr>
          <th className="border border-gray-500 px-2 py-1">Model</th>
          <td className="border border-gray-500 px-2 py-1">{formData.modelnames}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default CustomerDetailsTable;
