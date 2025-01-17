import React, { useEffect, useState } from "react";
import QuotationTableWithPopup from "./QuotationTableWithPopup";
import PopupTable from "./TablePopup/PopupTable";
import { FaEdit, FaTelegramPlane, FaTrash, FaWhatsapp } from "react-icons/fa";
import InsurancePopup from "./TablePopup/insurancePopup";
import VasPopup from "./TablePopup/VasPopup";

const QuotationTable = ({ submittedData, loading, error, deleteQuotation }) => {
  const [selectedData, setSelectedData] = useState(null); // State for selected object
  const [selectedVasData, setSelecteVasdData] = useState(null); // State for selected object
  const [selecteInsdData, setSelectedInsData] = useState(null); // State for selected object
  const [showPopup, setShowPopup] = useState(false); // State to toggle popup
  const [vasshowPopup, setVasShowPopup] = useState(false); // State to toggle popup
  const [insShowPopup, setInsShowPopup] = useState(false); // State to toggle popup
 

  // const [submittedData, setSubmittedData] = useState([]); // To store fetched data
  // const [loading, setLoading] = useState(true); // To show loading state
  // const [error, setError] = useState(null); // To handle errors

  // Fetch data from API when the component mounts

  // const deleteQuotation = async (id) => {
  //   try {
  //     const response = await fetch(`https://quotationlocal.onrender.com/api/quotation/${id}`, {
  //       method: "DELETE",
  //    });

  //    if (response.ok) {
  //      setQuotations((prevQuotations) =>
  //        prevQuotations.filter((quotation) => quotation.id !== id)
  //     );
  //      alert("Quotation deleted successfully!");
  //     } else {
  //      alert("Failed to delete quotation.");
  //     }
  //   } catch (error) {
  //     // console.error("Error deleting quotation:", error);
  //     // alert("An error occurred while deleting the quotation.");
  //     console.log(error);
  //   }
  // };

  // Delete a quotation

  const updateQuotation = async (id) => {
    const updatedData = {
      status: "Approved",
    };

    try {
      const response = await fetch(
        `https://quotationlocal.onrender.com/api/quotation/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (response.ok) {
        alert("Quotation updated successfully!");
      } else {
        const errorData = await response.json(); // Get the error message from response if not OK
        alert(
          `Failed to update quotation: ${errorData.message || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Error updating quotation:", error);
      alert("An error occurred while updating the quotation.");
    }
  };

  // Example usage
  // updateQuotation(1); // Assuming 1 is the quotation ID

  if (loading) {
    return <div>Loading...</div>; // Show loading while fetching
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error if any occurs
  }

  const tableHeaders = [
    { key: "createdAt", label: "Sr no", sortable: true },
    { key: "createdAt", label: "Date", sortable: true },
    { key: "customer_name", label: "Customer Name", sortable: true },
    { key: "customer_mobile_no", label: "Customer Mobile No.", sortable: true },
    { key: "modelnames", label: "Model", sortable: true },
    { key: "variantname", label: "Variant", sortable: true },
    { key: "colorname", label: "Color", sortable: false },
    { key: "colorname", label: "Telegram", sortable: false },
    { key: "colorname", label: "What's app", sortable: false },
    { key: "action", label: "Action", sortable: false },
    { key: "colorname", label: "QuatationType", sortable: false },
    { key: "colorname", label: "Approve", sortable: false },

    // { key: "fuel", label: "Fuel", sortable: true },
    // { key: "Ex_Showroom_Price", label: "Ex Showroom", sortable: true },
    // { key: "accessories", label: "Accessories", sortable: false },
    // { key: "vas", label: "VAS", sortable: false },
    // { key: "insurances", label: "Insurances", sortable: false },
    // { key: "TCS_price", label: "TCS Price", sortable: true },
    // { key: "additional", label: "Additional", sortable: true },
    // { key: "billing_price", label: "Billing Price", sortable: true },
    // { key: "RTO_Normal", label: "RTO Normal", sortable: true },
    // { key: "RTO_Normal_scrap", label: "RTO Scrap", sortable: true },
    // { key: "fastag", label: "Fastag", sortable: true },
    // { key: "status", label: "Status", sortable: true },
    // { key: "HPN", label: "HPN", sortable: false },
    // { key: "address", label: "Address", sortable: false },
    // { key: "updatedAt", label: "Updated At", sortable: true },
  ];

  const handlePopupOpen = (data) => {
    setSelectedData(data);
    setShowPopup(true);
  };
  const handleVasOpen = (data) => {
    setSelecteVasdData(data);
    setVasShowPopup(true);
  };
  const handleInsPopupOpen = (data) => {
    console.log(data);
    setSelectedInsData(data);
    setInsShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setSelectedData(null);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-yellow-500">
            {tableHeaders.map((header, index) => (
              <th
                key={index}
                className="border border-gray-300 px-4 text-white py-2"
              >
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {submittedData.map((data, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(data.createdAt).toLocaleDateString() || "N/A"}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {data.customer_name || "N/A"}
              </td>

              <td className="border border-gray-300 px-4 py-2">
                {data.customer_mobile_no || "N/A"}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {data.modelnames || "N/A"}
              </td>

              <td className="border border-gray-300 px-4 py-2">
                {data.variantname || "N/A"}
              </td>

              <td className="border border-gray-300 px-4 py-2">
                {data.colorname || "N/A"}
              </td>

              <td className="border border-gray-300 px-4 py-2">
                <div className="flex items-center space-x-2">
                  <FaTelegramPlane size={20} color="#0088cc" />
                  <span>Telegram</span>
                </div>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <div className="flex items-center space-x-2">
                  <FaWhatsapp size={20} color="#25d366" />
                  <span>WhatsApp</span>
                </div>
              </td>

              {/* <td className="border border-gray-300 px-4 py-2">
                {data.fuel || "N/A"}
              </td>
             
              <td className="border border-gray-300 px-4 py-2">
                {data.Ex_Showroom_Price || "N/A"}
              </td>
              <td
                className="border border-gray-300 px-4 py-2 text-blue-500 cursor-pointer"
                onClick={() => handlePopupOpen(data.accessories)}
              >
                View Accessories
              </td> */}
              {/* <td
                className="border border-gray-300 px-4 py-2 text-blue-500 cursor-pointer"
                onClick={() => handleVasOpen(data.vas)}
              >
                View VAS
              </td>
              <td
                className="border border-gray-300 px-4 py-2 text-blue-500 cursor-pointer"
                onClick={() => handleInsPopupOpen(data.insurances)}
              >
                View Insurances
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {data.TCS_price || "N/A"}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {data.additional || "N/A"}
              </td> */}
              {/* <td className="border border-gray-300 px-4 py-2">
                {data.billing_price || "N/A"}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {data.RTO_Normal || "N/A"}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {data.RTO_Normal_scrap || "N/A"}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {data.fastag || "N/A"}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {data.status || "N/A"}
              </td>
             
              <td className="border border-gray-300 px-4 py-2">
                {data.HPN || "N/A"}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {data.address || "N/A"}
              </td> */}

              <td className="border border-gray-300 px-4 py-2">
                <div className="flex">
                  <button
                    onClick={() => handleTogglePopup(vehicle)}
                    className="text-green-500 hover:text-green-700 px-2"
                    title="Edit"
                  >
                    <FaEdit size={20} />
                  </button>
                  {/* Delete Button */}
                  <button
                    onClick={() => deleteQuotation(data.id)}
                    className="text-red-500 hover:text-red-700 px-2"
                    title="Delete"
                  >
                    <FaTrash size={20} />
                  </button>
                </div>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {data.QuotationType || "N/A"}
              </td>
              <td className="border border-gray-300 px-4 py-2">
               {data.QuotationType &&  <button
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none"
                  onClick={() => updateQuotation(data.id)}
                >
                 {(data.status != "pending" ) ?"Approved" : "Approve"}
                </button>}
              </td>

              {/* <td className="border border-gray-300 px-4 py-2">{new Date(data.updatedAt).toLocaleString() || "N/A"}</td> */}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Popup for showing selected data */}
      {/* {showPopup && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-1/2">
            <h2 className="text-xl font-bold mb-4">Details</h2>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2">Id</th>
                  <th className="border border-gray-300 px-4 py-2">Name</th>
                </tr>
              </thead>
              <tbody>
                {selectedData.map((item, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2 ">
                      {index + 1}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">{item}</td>
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
      )} */}

      <PopupTable
        showPopup={showPopup}
        selectedData={selectedData}
        handlePopupClose={handlePopupClose}
      />
      <VasPopup
        showPopup={vasshowPopup}
        selectedData={selectedVasData}
        handlePopupClose={handlePopupClose}
      />
      <InsurancePopup
        showPopup={insShowPopup}
        selectedData={selecteInsdData}
        handlePopupClose={handlePopupClose}
      />
    </div>
  );
};

export default QuotationTable;
