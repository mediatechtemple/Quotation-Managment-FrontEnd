'use client';
import ExcelHeaderEditor from '@/components/VehicleManagement/ExcelHeaderEditor';
import Popup from '@/components/VehicleManagement/Popup';
import VehicalForm from '@/components/VehicleManagement/VehicalForm';
import VehicleTable from '@/components/VehicleManagement/VehicleTable';
import React, { useState } from 'react';
import * as XLSX from "xlsx";
const vehicleData = [
  {
    srNo: 1,
    manufacturingYear: '2023',
    vcCode: 'VC123',
    ppl: '8-12',
    fuel: 'Petrol',
    variant: 'XLE',
    colour: 'Red',
    exShowroomPrice: '₹10,00,000',
    exchangeDiscount: '₹50,000',
    corporateOfferTop: '₹20,000',
    corporateOfferToi: '₹15,000',
    additionalOffer: '₹5,000',
    rtoNormal: '₹1,20,000',
    rtoNormalScrap: '₹1,00,000',
    rtoBh: '₹1,30,000',
    rtoTrc: '₹1,10,000',
    insurance: '₹50,000',
    ins11AdsOn: '₹5,000',
    qty: 1,
    name:'khauf',
    amount:'Ashoka'
  },
  // Add more data rows as needed
];

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
  const [showPopup, setShowPopup] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [fields, setFields] = useState([{ name: '', amount: '' }]);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    manufacturingYear: "",
    vcCode: "",
    ppl: "",
    Fuel:"",
    variant: "",
    colour: "",
    exShowroomPrice: "",
    exchangeDiscount: "",
    corporateOfferTop: "",
    corporateOfferToi: "",
    additionalOffer: "",
    rtoNormal: "",
    rtoNormalScrap: "",
    rtoBh: "",
    rtoTrc: "",
    insurance: "",
    quantity: "",
    dynamicFields: [{ name: "", amount: "" }], // Initial dynamicFields
  });

  // Handle changes in static fields
  const handleFieldChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  // Handle changes in dynamic fields
  const handleDynamicFieldChange = (index, key, value) => {
    const updatedFields = [...formData.dynamicFields];
    updatedFields[index][key] = value;
    setFormData((prevData) => ({
      ...prevData,
      dynamicFields: updatedFields,
    }));
  };

  // Add new dynamic field
  const handleAddDynamicField = () => {
    setFormData((prevData) => ({
      ...prevData,
      dynamicFields: [...prevData.dynamicFields, { name: "", amount: "" }],
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
      manufacturingYear: "",
      vcCode: "",
      pplFuel: "",
      variant: "",
      colour: "",
      exShowroomPrice: "",
      exchangeDiscount: "",
      corporateOfferTop: "",
      corporateOfferToi: "",
      additionalOffer: "",
      rtoNormal: "",
      rtoNormalScrap: "",
      rtoBh: "",
      rtoTrc: "",
      insurance: "",
      quantity: "",
      dynamicFields: [{ name: "", amount: "" }], // Reset dynamicFields
    });
    setShowPopup(false);
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleAddField = () => {
    setFields([...fields, { name: '', amount: '' }]);
  };

  

  const exportToExcel = (data) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Table Data");
    XLSX.writeFile(workbook, "table_data.xlsx");
  };

  const importFromExcel = (e) => {
    const file = e.target.files[0];
    alert('From here excel file get uploaded!')
  };
























  const handleTogglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert('Form Submitted!');
    setShowPopup(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Button at Top Right */}
      <h1 className='text-white bg-yellow-500 text-center  p-2 my-2'>Vehicle Management</h1>



      <div className="flex justify-between mb-4">



        <div>
        <button
          onClick={()=>exportToExcel(vehicleData)}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Export to Excel
        </button>

        </div>













        <div className="flex justify-start items-center gap-4">
  <ExcelHeaderEditor />

  <button
    onClick={handleTogglePopup}
    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex-shrink-0"
  >
    Open Form
  </button>
</div>














      </div>






      <VehicleTable
      vehicleData={vehicleData}
      togglePopup={togglePopup}
      />
      {/* Table */}
    

      {/* Popup Form */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <VehicalForm
                  formData={formData}
                  onFieldChange={handleFieldChange}
                  onDynamicFieldChange={handleDynamicFieldChange}
                  onAddDynamicField={handleAddDynamicField}
                  onSubmit={handleSubmit}
                  onCancel={handleCancel}
                />

        </div>
      )}






{isPopupOpen && (
        <Popup data={data} onClose={togglePopup} />
      )}
    </div>
  );
};

export default PopupForm;
