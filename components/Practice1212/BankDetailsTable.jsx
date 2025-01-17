import React from "react";

const BankDetailsTable = () => {
  return (
    <div className="border border-gray-300 shadow-md rounded-md p-4 w-full mt-6">
      <table className="table-auto w-full border-collapse border border-gray-400">
        <tbody>
          <tr className="border border-gray-400">
            <td className="px-2 py-1 font-semibold border border-gray-400">
              Company Name
            </td>
            <td className="px-2 py-1 border border-gray-400">Pan Card No.</td>
          </tr>
          <tr className="border border-gray-400">
            <td className="px-2 py-1 font-semibold border border-gray-400">
              Bank Name
            </td>
            <td className="px-2 py-1 border border-gray-400">GSTIN No.</td>
          </tr>
          <tr className="border border-gray-400">
            <td className="px-2 py-1 font-semibold border border-gray-400">
              Account No. 1
            </td>
            <td className="px-2 py-1 border border-gray-400"></td>
          </tr>
          <tr className="border border-gray-400">
            <td className="px-2 py-1 font-semibold border border-gray-400">
              Account No. 2
            </td>
            <td className="px-2 py-1 border border-gray-400"></td>
          </tr>
          <tr className="border border-gray-400">
            <td className="px-2 py-1 font-semibold border border-gray-400">
              IFSC Code
            </td>
            <td className="px-2 py-1 border border-gray-400"></td>
          </tr>
        </tbody>
      </table>

      <div className="mt-4 text-sm">
        <h2 className="font-semibold underline">Terms & Conditions:</h2>
        <ul className="list-disc list-inside">
          <li>
            Payments to be made in favor of First Mobital Pvt. Ltd. Payable at
            Jaipur
          </li>
          <li>Price includes GST & incidental charges.</li>
          <li>
            Price & Statutory Levies prevailing at the time of delivery will be
            applicable.
          </li>
          <li>Offer is subject to force major clause.</li>
          <li>
            Vehicle Model, Variant & Price are Subject to Change without notice.
          </li>
          <li>
            In case of booking cancellation, the cancellation charges Rs. 3000/-
            will be charged to the customer.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BankDetailsTable;
