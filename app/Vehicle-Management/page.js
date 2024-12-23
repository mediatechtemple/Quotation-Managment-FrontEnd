"use client";
import ExcelHeaderEditor from "@/components/VehicleManagement/ExcelHeaderEditor";
import ExcelHeaderEditor1 from "@/components/VehicleManagement/ExcelHeaderEditor1";
import Popup from "@/components/VehicleManagement/Popup";
import VehicalForm from "@/components/VehicleManagement/VehicalForm";
import VehicleTable from "@/components/VehicleManagement/VehicleTable";
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
// const vehicleData = [
//   {
//     sr_no: 1,
//     Manufacturing_Year: "2023",
//     VC_Code: "VC123",
//     ppl: "8-12",
//     fuel_type: "Petrol",
//     variant: "XLE",
//     Ex_Showroom_Price: 1000,
//     Corporate_Offer_Top: 3,
//     additional: 3,
//     RTO_Normal: 20,
//     Corporate_Offer: 50,
//     other1: 1000,
//     RTO_Normal_scrap: 90,
//     RT_BH: 30,
//     RT_TRC: 30,
//     // insurance: '50,000',
//     quantity: 1,
//     color: "Red",
//     insurance1: 3,
//     price1: 10,
//     insurance2: 30,
//     price2: 33,
//     insurance3: 4,
//     price3: 4,
//     insurance4: "8,000",
//     price4: 98,
//   },
//   // Add more rows as needed
// ];

const data1 = [
  { id: 1, name: "John Doe", amount: 250 },
  { id: 2, name: "Jane Smith", amount: 300 },
  { id: 3, name: "Alice Johnson", amount: 150 },
  { id: 4, name: "Bob Brown", amount: 400 },
  { id: 5, name: "Charlie Davis", amount: 200 },
];

const data = [
  { id: 1, name: "John Doe", amount: 250 },
  { id: 2, name: "Jane Smith", amount: 300 },
  { id: 3, name: "Alice Johnson", amount: 150 },
  { id: 4, name: "Bob Brown", amount: 400 },
  { id: 5, name: "Charlie Davis", amount: 200 },
];

const PopupForm = () => {
  const [vehicleData, setVehicleData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [fields, setFields] = useState([{ name: "", amount: "" }]);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [fieldCount, setFieldCount] = useState(1);

  const [formData, setFormData] = useState({
    Manufacturing_Year: "1100",
    VC_Code: "11",
    ppl: "11",
    fuel_type: "11",
    variant: "11",
    colour: "11",
    Ex_Showroom_Price: "11",
    Corporate_Offer_Top: "11",
    additional: "11",
    RTO_Normal: "11",
    Corporate_Offer: "11",
    other1: "11",
    RTO_Normal_scrap: "11",
    RT_BH: "11",
    RT_TRC: "11",
    insurance: "11",
    quantity: "11",
    color: "11",
    insurance_details: { insurance1: "11", price1: 11 }, // Initial insurance_details
  });

  const handleAddField = () => {
    const newCount = fieldCount + 1;
    setFormData({
      ...formData,
      insurance_details: {
        ...formData.insurance_details,
        [`insurance${newCount}`]: "",
        [`price${newCount}`]: "",
      },
    });
    setFieldCount(newCount);
    console.log(formData);
  };

  // Delete specific fields
  const handleDeleteField = (fieldKey) => {
    const updatedFields = { ...formData.insurance_details };
    delete updatedFields[`insurance${fieldKey}`];
    delete updatedFields[`price${fieldKey}`];
    setFormData({ ...formData, insurance_details: updatedFields });
  };

  // Handle input changes
  const handleInputChange = (fieldKey, value) => {
    setFormData({
      ...formData,
      insurance_details: {
        ...formData.insurance_details,
        [fieldKey]: value,
      },
    });
  };

  // Handle changes in static fields
  const handleFieldChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  // Handle form cancellation
  const handleCancel = () => {
    console.log("Form Cancelled");
    setFormData({
      Manufacturing_Year: "",
      VC_Code: "",
      ppl: "",
      fuel_type: "",
      variant: "",
      colour: "",
      Ex_Showroom_Price: "",
      Corporate_Offer_Top: "",
      additional: "",
      RTO_Normal: "",
      Corporate_Offer: "",
      other1: "",
      RTO_Normal_scrap: "",
      RT_BH: "",
      RT_TRC: "",
      insurance: "",
      quantity: "",
      color: "",
      insurance_details: { insurance1: "", price1: "" }, // Reset insurance_details
    });
    setShowPopup(false);
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const exportToExcel = (data) => {
    console.log(data);
    // alert('Hell broher');
    // return;
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Table Data");
    XLSX.writeFile(workbook, "table_data.xlsx");
  };

  const importFromExcel = (e) => {
    const file = e.target.files[0];
    alert("From here excel file get uploaded!");
  };

  const handleTogglePopup = () => {
    setShowPopup(!showPopup);
  };

  const getData = async () => {
    try {
      const response = await fetch(
        "https://quotationlocal.onrender.com/api/model"
      );
      const data = await response.json();
      console.log(data.data);
      setVehicleData(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Button at Top Right */}
      <h1 className="text-white bg-yellow-500 text-center  p-2 my-2">
        Vehicle Management
      </h1>

      <div className="flex justify-between mb-4">
        <div>
          <button
            onClick={() => exportToExcel(vehicleData)}
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Export to Excel
          </button>
        </div>

        <div className="flex justify-start items-center gap-4">
          <ExcelHeaderEditor1 />
          {/* <ExcelHeaderEditor/> */}

          <button
            onClick={handleTogglePopup}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex-shrink-0"
          >
            Open Form
          </button>
        </div>
      </div>

      <VehicleTable vehicleData={vehicleData} togglePopup={togglePopup} />
      {/* Table */}

      {/* Popup Form */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <VehicalForm
            formData={formData}
            onFieldChange={handleFieldChange}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            handleAddField={handleAddField}
            handleDeleteField={handleDeleteField}
            handleInputChange={handleInputChange}
          />
        </div>
      )}

      {isPopupOpen && <Popup data={data} onClose={togglePopup} />}
    </div>
  );
};

export default PopupForm;
