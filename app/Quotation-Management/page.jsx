"use client";
import QuotationPopupForm from "@/components/QuotationManagement/QuotationPopupForm";
import QuotationTable from "@/components/QuotationManagement/QuotationTable";
import React, { useEffect, useState } from "react";

const QuotationForm = () => {
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [variageDropDown, setVarientDropDown] = useState([]);
  const [variageColorDropDown, setVarientColorDropDown] = useState([]);
  const [allFiledCodeData, setAllFiledCodeData] = useState({});
  const [hpnInputData, setHpnInputData] = useState([]);

  const [formData, setFormData] = useState({
    modelnames: "",
    variantname: "",
    colorname: "",
    fuel: "",
    exShowroom: "",
    exchange: "",
    otherDiscount: "",
    // additionalDiscount: "",
    billingPrice: "",
    rto: "",
    insurances: {},
    accessories: {},
    vas: {},
    Scrap_Certificate: "",
    Scrap_Certificate_price: "",
    fastag: "",
    fastag_price: "",
    TCS: "",
    TCS_price: "",
    HPN: "",
    RTO_Normal: "",
    RT_TRC: "",
    RT_BH: "",
    RTO_Normal_scrap: "",
    accessoriesDiscount: "",
    finalDealAmount: 0,
    customerName: "",
    customerMobile: "",
    address: "",
    customer_name:"",
    customer_mobile_no:""
  });

  const [showModal, setShowModal] = useState(false);

  const [submittedData, setSubmittedData] = useState([]); // To store fetched data
  const [loading, setLoading] = useState(true); // To show loading state
  const [error, setError] = useState(null); // To handle errors

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://quotationlocal.onrender.com/api/quotation"
      );

      if (response.ok) {
        const data = await response.json(); // Assuming the response is JSON
        setSubmittedData(data.data); // Set the fetched data to the state
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      setError(error.message); // Handle any error during fetching
    } finally {
      setLoading(false); // Set loading to false once data is fetched
    }
  };
  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array means this runs only once when the component mounts

  const deleteQuotation = async (id) => {
    try {
      const response = await fetch(
        `https://quotationlocal.onrender.com/api/quotation/${id}`,
        {
          method: "DELETE",
        }
      );
  
      if (response.ok) {
        // Option 1: Refresh the data by calling fetchData()
        fetchData();
        alert("Quotation deleted successfully!");
      } else {
        const errorData = await response.json();
        alert(`Failed to delete quotation: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      // console.error("Error deleting quotation:", error);
      alert("An error occurred while deleting the quotation. Please try again.");
    }
  };
  

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://quotationlocal.onrender.com/api/quotation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Set header for JSON data
          },
          body: JSON.stringify(formData), // Convert formData to JSON string
        }
      );

      if (response.ok) {
        alert("Quotation Submitted Successfully!");
        // setSubmittedData((prevData) => [...prevData, formData]); // Update submitted data
        setFormData({
          modelnames: "",
          variantname: "",
          colorname: "",
          fuel: "",
          exShowroom: "",
          exchange: "",
          otherDiscount: "",
          additionalDiscount: "",
          billingPrice: "",
          rto: "",
          insurances: {},
          accessories: {},
          vas: {},
          Scrap_Certificate: "",
          Scrap_Certificate_price: "",
          fastag: "",
          fastag_price: "",
          TCS: "",
          TCS_price: "",
          HPN: "",
          RTO_Normal: "",
          RT_TRC: "",
          RT_BH: "",
          RTO_Normal_scrap: "",
          accessoriesDiscount: "",
          finalDealAmount: 0,
          customerName: "",
          customerMobile: "",
          address: "",
        });
        setShowModal(false); // Close the modal
        fetchData();
      } else {
        const errorData = await response.json();
        alert(
          `Failed to submit. Error: ${errorData.message || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again later.");
    }
  };

 
  const handleDropdownSelect = (value) => {
    getVariantCodeData(value);
    console.log("Selected option:", value === "none" ? "No selection" : value);
    setFormData((prevState) => ({
      ...prevState,
      modelnames: value,
    }));
  };

  const handleHpnDropdownSelect = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      HPN: value,
    }));
  };

  const handleDropdownVarientSelect = (value, color) => {
    alert("sharry man");
    getVariantColorCodeData(value, color);
    console.log("Selected option:", value === "none" ? "No selection" : value);
    setFormData((prevState) => ({
      ...prevState,
      variantname: value,
    }));
  };

  const handlerDropdownAllData = (value, color) => {
    getAllFieldCodeData(value, color);
    console.log("Selected option:", value === "none" ? "No selection" : value);
    setFormData((prevState) => ({
      ...prevState,
      colorname: value,
    }));
  };

  const getVsCodeData = async () => {
    try {
      const response = await fetch(
        "https://quotationlocal.onrender.com/api/model/getnames"
      );
      if (!response.ok) {
        return "not get Vs code data";
      }
      const data = await response.json();
      console.log(data);
      setDropdownOptions(data);
    } catch (error) {
      console.log(error);
    }
  };

  const InputCodeData = async () => {
    try {
      const response = await fetch(
        "https://quotationlocal.onrender.com/api/input"
      );
      if (!response.ok) {
        return "not get Vs code data";
      }
      const data = await response.json();
      console.log(data[0]);
      formData.Scrap_Certificate = data[0].Scrap_Certificate;
      formData.Scrap_Certificate_price = data[0].Scrap_Certificate_price;
      formData.TCS = data[0].TCS;
      formData.TCS_price = data[0].TCS_price;
      formData.fastag = data[0].fastag_price;
      formData.fastag_price = data[0].fastag;
    } catch (error) {
      console.log(error);
    }
  };

  const HPNInputCodeData = async () => {
    try {
      const response = await fetch(
        "https://quotationlocal.onrender.com/api/input/hpns"
      );
      if (!response.ok) {
        return "not get Vs code data";
      }
      const data = await response.json();
      console.log(data);
      setHpnInputData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getVariantCodeData = async (ppl) => {
    try {
      const response = await fetch(
        `https://quotationlocal.onrender.com/api/model/search/ppl/${ppl}`
      );
      if (!response.ok) {
        return "not get Vs code data";
      }
      const data = await response.json();
      console.log(data);
      setVarientDropDown(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getVariantColorCodeData = async (variant, color) => {
    console.log(variant, color);
    try {
      const response = await fetch(
        `https://quotationlocal.onrender.com/api/model/search/variant/${variant}`
      );
      if (!response.ok) {
        return "not get Vs code data";
      }
      const data = await response.json();
      console.log(data);
      setVarientColorDropDown(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllFieldCodeData = async (variant, color) => {
    console.log("Variant:", variant, "Color:", color);

    try {
      const response = await fetch(
        `https://quotationlocal.onrender.com/api/model/search/varientcolor/${variant}/${color}`
      );

      if (!response.ok) {
        console.log("Failed to fetch VAS code data");
        return "Not able to fetch VAS code data";
      }

      const data = await response.json();

      if (data && data.length > 0) {
        const fetchedData = data[0]; // Get the first entry from the fetched data

        // Calculate billing price safely
        const exShowroomPrice = +fetchedData?.Ex_Showroom_Price || 0;
        const corporateOffer = +fetchedData?.Corporate_Offer || 0;
        const corporateOfferTop = +fetchedData?.Corporate_Offer_Top || 0;
        const additional = +fetchedData?.additional || 0;

        console.log(exShowroomPrice);
        console.log(corporateOffer);
        console.log(corporateOfferTop);
        console.log(additional);

        const billingPrice =
          exShowroomPrice - corporateOffer - corporateOfferTop - additional;

        setFormData((prevData) => ({
          ...prevData,
          Ex_Showroom_Price:
            data[0]?.Ex_Showroom_Price || prevData.Ex_Showroom_Price,
          fuel_type: data[0]?.fuel_type || prevData.fuel_type,
          RTO_Normal: data[0]?.RTO_Normal || prevData.RTO_Normal,
          RT_TRC: data[0]?.RT_TRC || prevData.RT_TRC,
          RT_BH: data[0]?.RT_BH || prevData.RT_BH,
          RTO_Normal_scrap:
            data[0]?.RTO_Normal_scrap || prevData.RTO_Normal_scrap,
          additional: +data[0]?.additional || +prevData.additional,
          scrap_benifit: data[0]?.scrap_benifit || prevData.scrap_benifit,
          billing_price: billingPrice,
        }));

        console.log("Fetched Data:", data[0]);

        setAllFiledCodeData(data[0]); // Assuming this is another state update
      } else {
        console.log("No data available for the given variant and color");
      }
    } catch (error) {
      console.error("Error fetching VAS code data:", error);
    }
  };

  useEffect(() => {
    getVsCodeData();
    InputCodeData();
    HPNInputCodeData();
  }, []);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <>
      <div className="text-right ">
        <h3 className=" font-semibold mb-4 p-2 text-center bg-yellow-500 text-black">
          Quotations Management
        </h3>
        <button
          onClick={() => setShowModal(true)}
          className="bg-yellow-500 text-white px-4 py-2 rounded-md"
        >
          Create New Quotation
        </button>

        {showModal && (
          <QuotationPopupForm
            formData={formData}
            setFormData={setFormData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            closeModal={() => setShowModal(false)}
            dropdownOptions={dropdownOptions}
            handleDropdownSelect={handleDropdownSelect}
            variageDropDown={variageDropDown}
            handleDropdownVarientSelect={handleDropdownVarientSelect}
            variageColorDropDown={variageColorDropDown}
            handlerDropdownAllData={handlerDropdownAllData}
            allFiledCodeData={allFiledCodeData}
            hpnInputData={hpnInputData}
            handleHpnDropdownSelect={handleHpnDropdownSelect}
          />
        )}

        <QuotationTable
          submittedData={submittedData}
          loading={loading}
          error={error}
          deleteQuotation={deleteQuotation}
        />
      </div>
    </>
  );
};

export default QuotationForm;
