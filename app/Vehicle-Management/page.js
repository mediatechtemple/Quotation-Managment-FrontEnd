"use client";
import Filter from "@/components/Filters/filter";
import useFilters from "@/components/Filters/useFilters";
import ExcelHeaderEditor from "@/components/VehicleManagement/ExcelHeaderEditor";
import ExcelHeaderEditor1 from "@/components/VehicleManagement/ExcelHeaderEditor1";
import Popup from "@/components/VehicleManagement/VehicalPopUp/Popup";
import VehicalForm from "@/components/VehicleManagement/VehicalForm";
import VehicleTable from "@/components/VehicleManagement/VehicleTable";
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import apiService from "@/service/apiServices";
import AccPopUp from "@/components/VehicleManagement/VehicalPopUp/AccPopUp";
import VasPopUp from "@/components/VehicleManagement/VehicalPopUp/VasPopUp";
import { transformData } from "@/utils/dataTransformer"


const PopupForm = () => {
  const [vehicleData, setVehicleData] = useState([]);
  const [editVehicaleData,setEditVehicleData]=useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [fields, setFields] = useState([{ name: "", amount: "" }]);
  const [viewData,setViewData]=useState({});

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [fieldCount, setFieldCount] = useState(1);
  const [accCount, setAccCount] = useState(1);
  const [vasCount, setVasCount] = useState(1);

 

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
    Accessories:{accessories_name1:'acc',accessories_price1:99},
    VAS_data:{VAS_Name1:'vas',VAS_price1:88}
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


  const handleAddAccessories = () => {
    const newCount = accCount + 1;
    setFormData({
      ...formData,
      Accessories: {
        ...formData.Accessories,
        [`accessories_name${newCount}`]: "",
        [`accessories_price${newCount}`]: "",
      },
    });
    setAccCount(newCount);
    console.log(formData);
  };


  const handleAddVas = () => {
    const newCount = vasCount + 1;
    setFormData({
      ...formData,
      VAS_data: {
        ...formData.VAS_data,
        [`VAS_Name${newCount}`]: "",
        [`VAS_price${newCount}`]: "",
      },
    });
    setVasCount(newCount);
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
  const handleDeleteAcc = (fieldKey) => {
    const updatedFields = { ...formData.Accessories };
    delete updatedFields[`accessories_name${fieldKey}`];
    delete updatedFields[`accessories_price${fieldKey}`];
    setFormData({ ...formData, Accessories: updatedFields });
  };
  const handleDeleteVas = (fieldKey) => {
    const updatedFields = { ...formData.VAS_data };
    delete updatedFields[`VAS_Name${fieldKey}`];
    delete updatedFields[`VAS_price${fieldKey}`];
    setFormData({ ...formData, VAS_data: updatedFields });
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
  const handleAccChange = (fieldKey, value) => {
    console.log(typeof value);
    setFormData({
      ...formData,
      Accessories: {
        ...formData.Accessories,
        [fieldKey]: value,
      },
    });
  };
  const handleVasChange = (fieldKey, value) => {
    console.log(typeof value);
    setFormData({
      ...formData,
      VAS_data: {
        ...formData.VAS_data,
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
      console.log(response.data);
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






  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete`
    );
    if (!confirmDelete) return;

    try {
      // API Call for DELETE
      const response = await fetch(`https://quotationlocal.onrender.com/api/model/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete the item.");
      }

      // Update the state to remove the deleted item
      setVehicleData((prevData) => prevData.filter((item) => item.id !== id));

      alert(`Item with ID ${id} deleted successfully!`);
    } catch (error) {
      console.error("Error while deleting:", error);
      alert("Failed to delete the item. Please try again.");
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
      insurance_details: { insurance1: "", price1: 0}, // Reset insurance_details
      Accessories:{accessories_name1:'',accessories_price1:0},
      VAS_data:{VAS_Name1:'',VAS_price1:0}
    });
    setShowPopup(false);
  };



  const togglePopup = (data,dataType) => {
    // console.log(data);
    // console.log(dataType);
    setViewData(data);
    setIsPopupOpen(dataType);
    
  };

  const exportToExcel = (data) => {
    console.log(data);
    const mapData=data.map((item,index)=>{

      const result = item.insurances
    .reduce((acc, curr, index) => {
      acc[`insurance${index + 1}`] = curr.insurance;
      acc[`price${index + 1}`] = curr.price;
      return acc;
    }, {});

    const result1 = item.accessories
    .reduce((acc, curr, index) => {
      acc[`accessories_name${index + 1}`] = curr.accessories_name;
      acc[`accessories_price${index + 1}`] = curr.accessories_price;
      return acc;
    }, {});

    const result2 = item.vas
    .reduce((acc, curr, index) => {
      acc[`VAS_Name${index + 1}`] = curr.VAS_Name;
      acc[`VAS_price${index + 1}`] = curr.VAS_price;
      return acc;
    }, {});



    // console.log(item.id);
    delete item.insurances;
    delete item.accessories;
    delete item.vas

    delete item.id;
    delete item.VAS_Id;
    delete item.Insurance_Id;
    
    return {...item,...result,...result1,...result2,sr:index};
    // console.log(item);
      
    });
    // console.log('here man data will come..')
    // console.log(mapData);
    // return;
    
    

    const worksheet = XLSX.utils.json_to_sheet(mapData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Table Data");
    XLSX.writeFile(workbook, "table_data.xlsx");
  };



  
  const handleTogglePopup = (vehicalData) => {
    // alert('hello brohter');
    if(vehicalData){
      setFieldCount(vehicalData.insurances.length);
      setAccCount(vehicalData.accessories.length);
      setVasCount(vehicalData.vas.length);
      console.log(vehicalData);
      const transformDatas=transformData(vehicalData);
      console.log(transformDatas);
      setFormData(transformDatas);
      setEditVehicleData({...transformData});
    }
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
            onClick={()=>handleTogglePopup('')}
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

      <VehicleTable 
      vehicleData={filteredData} 
      togglePopup={togglePopup} 
      handleDelete={handleDelete}
      handleTogglePopup={handleTogglePopup}
       />
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
            handleAddAccessories={handleAddAccessories}
            handleAddVas={handleAddVas}
            handleAccChange={handleAccChange}
            handleVasChange={handleVasChange}
            handleDeleteAcc={handleDeleteAcc} 
            handleDeleteVas={handleDeleteVas}
            handleDelete={handleDelete}
          />
        </div>
      )}

      {isPopupOpen == 'insurance' && <Popup data={viewData} onClose={togglePopup} />}
      {isPopupOpen ==  'accessories' && <AccPopUp data={viewData} onClose={togglePopup} />}
      {isPopupOpen == 'vas'&& <VasPopUp data={viewData} onClose={togglePopup} />}
    </div>
  );
};

export default PopupForm;
