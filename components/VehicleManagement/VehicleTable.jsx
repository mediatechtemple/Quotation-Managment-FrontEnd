import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const VehicleTable = ({ vehicleData, togglePopup,handleDelete,handleTogglePopup }) => {
  return (
    <div className="overflow-auto max-h-[80vh]">
      <table className="table-auto w-full border-collapse border border-gray-200 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2">Sr No</th>
            <th className="border border-gray-300 px-4 py-2">Manufacturing Year</th>
            <th className="border border-gray-300 px-4 py-2">VC Code</th>
            <th className="border border-gray-300 px-4 py-2">PPL</th>
            <th className="border border-gray-300 px-4 py-2">Fuel</th>
            <th className="border border-gray-300 px-4 py-2">Variant</th>
            <th className="border border-gray-300 px-4 py-2">Colour</th>
            <th className="border border-gray-300 px-4 py-2">Ex Showroom Price</th>
            {/* <th className="border border-gray-300 px-4 py-2">Exchange / Scrappage Discount</th> */}
            <th className="border border-gray-300 px-4 py-2">Corporate Offer Top @20</th>
            <th className="border border-gray-300 px-4 py-2">Corporate Offer @TOI</th>
            <th className="border border-gray-300 px-4 py-2">Additional Offer</th>
            <th className="border border-gray-300 px-4 py-2">RTO Normal</th>
            <th className="border border-gray-300 px-4 py-2">RTO Normal Scrap</th>
            <th className="border border-gray-300 px-4 py-2">RTO BH</th>
            <th className="border border-gray-300 px-4 py-2">RTO TRC</th>
            {/* <th className="border border-gray-300 px-4 py-2">Insurance</th> */}
            <th className="border border-gray-300 px-4 py-2">Ins 11 Ads On</th>
            <th className="border border-gray-300 px-4 py-2">Accessries</th>
            <th className="border border-gray-300 px-4 py-2">Vas</th>
            {/* <th className="border border-gray-300 px-4 py-2">Qty</th> */}
            <th className="border border-gray-300 px-4 py-2">Edit / Delete</th>
          </tr>
        </thead>
        <tbody>
          {vehicleData.map((vehicle, index) => (
            <tr key={index} className="odd:bg-white even:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{vehicle.id}</td>
              <td className="border border-gray-300 px-4 py-2">{vehicle.Manufacturing_Year}</td>
              <td className="border border-gray-300 px-4 py-2">{vehicle.VC_Code}</td>
              <td className="border border-gray-300 px-4 py-2">{vehicle.ppl}</td>
              <td className="border border-gray-300 px-4 py-2">{vehicle.fuel_type}</td>
              <td className="border border-gray-300 px-4 py-2">{vehicle.variant}</td>
              <td className="border border-gray-300 px-4 py-2">{vehicle.color}</td>
              <td className="border border-gray-300 px-4 py-2">{vehicle.Ex_Showroom_Price}</td>
              {/* <td className="border border-gray-300 px-4 py-2">{vehicle.exchangeDiscount}</td> */}
              <td className="border border-gray-300 px-4 py-2">{vehicle.Corporate_Offer_Top}</td>
              <td className="border border-gray-300 px-4 py-2">{vehicle.Corporate_Offer}</td>
              <td className="border border-gray-300 px-4 py-2">{vehicle.additional}</td>
              <td className="border border-gray-300 px-4 py-2">{vehicle.RTO_Normal}</td>
              <td className="border border-gray-300 px-4 py-2">{vehicle.RTO_Normal_scrap}</td>
              <td className="border border-gray-300 px-4 py-2">{vehicle.RT_BH}</td>
              <td className="border border-gray-300 px-4 py-2">{vehicle.RT_TRC}</td>
              {/* <td className="border border-gray-300 px-4 py-2">{vehicle.insurance}</td> */}
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={()=>togglePopup(vehicle.insurances,'insurance')}
                  className="px-4 w-32 py-2 bg-blue-600 mr-2 text-white rounded hover:bg-blue-700"
                >
                  Insurance
                </button>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={()=>togglePopup(vehicle.accessories,'accessories')}
                  className="px-4 w-32 py-2 bg-blue-600 mr-2 text-white rounded hover:bg-blue-700"
                >
                  Accessories
                </button>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={()=>togglePopup(vehicle.vas,'vas')}
                  className="px-4 w-32 py-2 bg-blue-600 mr-2 text-white rounded hover:bg-blue-700"
                >
                  Vas
                </button>
              </td>
              {/* <td className="border border-gray-300 px-4 py-2">{vehicle.qty}</td> */}
              {/* <td className="border border-gray-300 px-4 py-2">{vehicle.qty}</td> */}
              {/* <td className="border border-gray-300 px-4 py-2"> */}
              <td className="border border-gray-300 px-4 py-2 space-x-4">
       
              <div className='flex'>
              <button
                  onClick={() => handleTogglePopup(vehicle)}
                  className="text-green-500 hover:text-green-700 px-2"
                  title="Edit"
                >
                  <FaEdit size={20} />
                </button>
                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(vehicle.id)}
                  className="text-red-500 hover:text-red-700 px-2"
                  title="Delete"
                >
                  <FaTrash size={20} />
                </button>
              </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VehicleTable;
