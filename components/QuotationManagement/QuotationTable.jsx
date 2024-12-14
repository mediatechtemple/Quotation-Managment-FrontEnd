import React from 'react';

const QuotationTable = ({ submittedData }) => {
  const tableHeaders = [
    { key: "model", label: "Model", sortable: true },
    { key: "fuel", label: "Fuel", sortable: true },
    { key: "color", label: "Color", sortable: false },
    { key: "variant", label: "Variant", sortable: true },
    { key: "exShowroom", label: "Ex Showroom", sortable: true },
    { key: "exchange", label: "Exchange", sortable: false },
    { key: "otherDiscount", label: "Other Discount", sortable: true },
    { key: "additionalDiscount", label: "Additional Discount", sortable: true },
    { key: "billingPrice", label: "Billing Price", sortable: true },
    { key: "tcs", label: "TCS", sortable: false },
    { key: "scrapCertificate", label: "Scrap Certificate", sortable: false },
    { key: "rto", label: "RTO", sortable: true },
    { key: "insurance", label: "Insurance", sortable: true },
    { key: "fastag", label: "Fastag", sortable: false },
    { key: "accessories", label: "Accessories", sortable: true },
    { key: "accessoriesDiscount", label: "Accessories Discount", sortable: false },
    { key: "vas", label: "VAS", sortable: false },
    { key: "finalDealAmount", label: "Final Deal Amount", sortable: true },
    { key: "customerName", label: "Customer Name", sortable: true },
    { key: "customerMobile", label: "Customer Mobile", sortable: false },
    { key: "address", label: "Address", sortable: false },
    { key: "hpn", label: "HPN", sortable: true },
  ];
  

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-yellow-500">
          {tableHeaders.map((header, index) => (
            <th key={index} className="border border-gray-300 px-4 text-white py-2">
              {header.label}
            </th>
          ))}
        </tr>
      </thead>

        <tbody>
          {submittedData.map((data, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2">{data.model}</td>
              <td className="border border-gray-300 px-4 py-2">{data.fuel}</td>
              <td className="border border-gray-300 px-4 py-2">{data.color}</td>
              <td className="border border-gray-300 px-4 py-2">{data.variant}</td>
              <td className="border border-gray-300 px-4 py-2">{data.exShowroom}</td>
              <td className="border border-gray-300 px-4 py-2">{data.exchange}</td>
              <td className="border border-gray-300 px-4 py-2">{data.otherDiscount}</td>
              <td className="border border-gray-300 px-4 py-2">{data.additionalDiscount}</td>
              <td className="border border-gray-300 px-4 py-2">{data.billingPrice}</td>
              <td className="border border-gray-300 px-4 py-2">{data.tcs}</td>
              <td className="border border-gray-300 px-4 py-2">
                {data.scrapCertificate ? "Yes" : "No"}
              </td>
              <td className="border border-gray-300 px-4 py-2">{data.rto}</td>
              <td className="border border-gray-300 px-4 py-2">{data.insurance}</td>
              <td className="border border-gray-300 px-4 py-2">{data.fastag}</td>
              <td className="border border-gray-300 px-4 py-2">{data.accessories}</td>
              <td className="border border-gray-300 px-4 py-2">{data.accessoriesDiscount}</td>
              <td className="border border-gray-300 px-4 py-2">{data.vas}</td>
              <td className="border border-gray-300 px-4 py-2">{data.finalDealAmount}</td>
              <td className="border border-gray-300 px-4 py-2">{data.customerName}</td>
              <td className="border border-gray-300 px-4 py-2">{data.customerMobile}</td>
              <td className="border border-gray-300 px-4 py-2">{data.address}</td>
              <td className="border border-gray-300 px-4 py-2">{data.hpn}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuotationTable;
