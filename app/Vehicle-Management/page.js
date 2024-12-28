"use client";
import Filter from "@/components/Filters/filter";
import useFilters from "@/components/Filters/useFilters";
import ExcelHeaderEditor from "@/components/VehicleManagement/ExcelHeaderEditor";
import ExcelHeaderEditor1 from "@/components/VehicleManagement/ExcelHeaderEditor1";
import Popup from "@/components/VehicleManagement/Popup";
import VehicalForm from "@/components/VehicleManagement/VehicalForm";
import VehicleTable from "@/components/VehicleManagement/VehicleTable";
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import apiService from "@/service/apiServices";


const PopupForm = () => {
  const [vehicleData, setVehicleData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [fields, setFields] = useState([{ name: "", amount: "" }]);
  const [viewData,setViewData]=useState({});

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
  

  const { filteredData, updateFilter } = useFilters(vehicleData, {
    Search: { type: 'text', value: '' },
    name: { type: 'text', value: '' },
    age: { type: 'range', value: [0, 100] },
    city: { type: 'dropdown', value: '', options: ['New York', 'Los Angeles', 'Chicago'] },
    createdAt: { type: 'dateRange', value: [null, null] },
    department: { type: 'dropdown', value: '', options: ['HR', 'IT', 'Finance'] },
    status: { type: 'checkbox', value: null }, 
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


  useEffect(()=>{
    console.log(formData);
  },[formData])

  // Delete specific fields
  const handleDeleteField = (fieldKey) => {
    const updatedFields = { ...formData.insurance_details };
    delete updatedFields[`insurance${fieldKey}`];
    delete updatedFields[`price${fieldKey}`];
    setFormData({ ...formData, insurance_details: updatedFields });
  };

  // Handle input changes
  const handleInputChange = (fieldKey, value) => {
    console.log(typeof value);
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

  const fetchData = async () => {
    // setLoading(true);
    try {
      const response = await apiService.get('api/model');
      setVehicleData(response.data);
    } catch (err) {
      // setError(err.message);
      console.log(err)
    } finally {
      // setLoading(false);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  // const getData = async () => {
  //   try {
  //     const response = await fetch(
  //       "https://quotationlocal.onrender.com/api/model"
  //     );
  //     const data = await response.json();
  //     console.log(data.data);
  //     setVehicleData(data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };


// const handleSubmit=(e)=>{
//   e.preventDefault();
//   console.log(formData);
// }







  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new FormData instance
    const data = new FormData();

    // Append all key-value pairs to FormData
    Object.keys(formData).forEach((key) => {
      // Handle nested objects (like `insurance_details`) if necessary
      if (typeof formData[key] === "object" && !Array.isArray(formData[key])) {
        // Object.keys(formData[key]).forEach((nestedKey) => {
        //   data.append(`${key}[${nestedKey}]`, formData[key][nestedKey]);
        // });
        const jsonString = JSON.stringify(formData[key]);
        data.append(key,jsonString);

      } else {
        data.append(key, formData[key]);
      }
    });

    console.log([...data.entries()]);

    try {
      const response = await fetch("https://quotationlocal.onrender.com/api/model", {
        method: "POST",
        body: data, // Send FormData directly
      });

      if (!response.ok) {
        throw new Error("Failed to post data");
      }

      const result = await response.json();
      console.log("Data submitted successfully:", result);
      getData();
      setShowPopup(false);
    } catch (error) {
      console.log("Error submitting data:", error.message);
    }
  };


// const handleSubmit = async (e) => {
//   e.preventDefault();

//   // Create a new FormData instance
//   const data = new FormData();

//   //  Append all key-value pairs to FormData
//     Object.keys(formData).forEach((key) => {
//       // Handle nested objects (like `insurance_details`) if necessary
//       if (typeof formData[key] === "object" && !Array.isArray(formData[key])) {
//         Object.keys(formData[key]).forEach((nestedKey) => {
//           data.append(`${key}[${nestedKey}]`, formData[key][nestedKey]);
//         });
//       } else {
//         data.append(key, formData[key]);
//       }
//     });

//   try {
//     // Use apiService.post to send the FormData
//     const result = await apiService.post('api/model', data);

//     console.log("Data submitted successfully:", result);
//     getData(); // Refresh the data (assumes this function is defined elsewhere)
//     setShowPopup(false); // Close the popup
//   } catch (error) {
//     console.log("Error submitting data:", error.message);
//   }
// };






























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



  const togglePopup = (data) => {
    setViewData(data);
    setIsPopupOpen(!isPopupOpen);
  };

  const exportToExcel = (data) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Table Data");
    XLSX.writeFile(workbook, "table_data.xlsx");
  };

  
  const handleTogglePopup = () => {
    setShowPopup(!showPopup);
  };

  

  // useEffect(() => {
  //   getData();
  // }, []);

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

      <Filter
        filters={{
          status: { type: 'checkbox',level:'Status' },
          Search: { type: 'text', value: '',level:'Search' }, // Overall search filter
          // name: { type: 'text' },
          // age: { type: 'range' },
          // city: { type: 'dropdown', options: ['New York', 'Los Angeles', 'Chicago'] },
          createdAt: { type: 'dateRange',level:'Date Range' },
          // department: { type: 'dropdown', options: ['HR', 'IT', 'Finance'] },
        }}
        onFilterChange={updateFilter}
      />

      <VehicleTable vehicleData={filteredData} togglePopup={togglePopup} />
      {/* Table */}

      {/* Popup Form */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <VehicalForm
            formData={formData}
            onFieldChange={handleFieldChange}
            handleSubmit={handleSubmit}
            onCancel={handleCancel}
            handleAddField={handleAddField}
            handleDeleteField={handleDeleteField}
            handleInputChange={handleInputChange}
          />
        </div>
      )}

      {isPopupOpen && <Popup data={viewData} onClose={togglePopup} />}
    </div>
  );
};

export default PopupForm;
