import React from "react";

const FinalDeal = () => {
  return (
   
      <table className="border-collapse border border-gray-500 w-full text-left mt-4 max-w-5xl">
        <thead>
          <tr>
            <th className="border border-gray-500 px-4 py-2 text-center" colSpan="2">
              Road Tax Detail
            </th>
            <th className="border border-gray-500 px-4 py-2 text-center" colSpan="2">
              VAS
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th className="border border-gray-500 px-2 py-1">RTO Type</th>
            <td className="border border-gray-500 px-2 py-1">Scrapage RTO</td>
            <th className="border border-gray-500 px-2 py-1">Accidential RSA</th>
            <td className="border border-gray-500 px-2 py-1">0.00</td>
          </tr>
          <tr>
            <th className="border border-gray-500 px-2 py-1">RTO</th>
            <td className="border border-gray-500 px-2 py-1">26000</td>
            <th className="border border-gray-500 px-2 py-1">EW Validity</th>
            <td className="border border-gray-500 px-2 py-1">2 year</td>
          </tr>
          <tr>
            <th className="border border-gray-500 px-2 py-1"></th>
            <td className="border border-gray-500 px-2 py-1"></td>
            <th className="border border-gray-500 px-2 py-1">EW</th>
            <td className="border border-gray-500 px-2 py-1">27000</td>
          </tr>
          <tr>
            <th className="border border-gray-500 px-2 py-1"></th>
            <td className="border border-gray-500 px-2 py-1"></td>
            <th className="border border-gray-500 px-2 py-1">Ceramic Coating</th>
            <td className="border border-gray-500 px-2 py-1">0.0</td>
          </tr>
        </tbody>
      </table>
  );
};

export default FinalDeal;





