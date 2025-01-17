"use client";
import React, { useEffect, useState } from "react";
import Dropdown from "./QuotationInputs/Dropdown";
import VariantDropdown from "./QuotationInputs/VariantDropdown";
import ColorDropdown from "./QuotationInputs/ColorDropdown";
import MultiSelectDropdown from "./QuotationInputs/MultiSelectDropdown";
import AccMultiSelectDropdown from "./QuotationInputs/AccMultiSelectDropdown";
import VasMultiSelectDropdown from "./QuotationInputs/VasMultiSelectDropdown";
import Input from "./QuotationInputs/GeneralInput";
import ScrafCertificate from "./QuotationInputs/ScrafCertificate";
import NormalInput from "./QuotationInputs/NormalInput";
import DownloadPdf from "./QuotationInputs/DownloadPdf";
import DounloadPdfTable from "./QuotationInputs/DounloadPdfTable";

const QuotationPopupForm = ({
  formData,
  setFormData,
  handleChange,
  handleSubmit,
  closeModal,
  dropdownOptions,
  handleDropdownSelect,
  variageDropDown,
  handleDropdownVarientSelect,
  variageColorDropDown,
  handlerDropdownAllData,
  allFiledCodeData,
  hpnInputData,
  handleHpnDropdownSelect,
}) => {
  const dropdownOptions1 = [
    { value: "life", label: "Life Insurance" },
    { value: "health", label: "Health Insurance" },
    { value: "auto", label: "Auto Insurance" },
    { value: "home", label: "Home Insurance" },
    { value: "travel", label: "Travel Insurance" },
    { value: "pet", label: "Pet Insurance" },
    { value: "business", label: "Business Insurance" },
    { value: "marine", label: "Marine Insurance" },
    { value: "fire", label: "Fire Insurance" },
    { value: "disability", label: "Disability Insurance" },
    { value: "liability", label: "Liability Insurance" },
    { value: "car", label: "Car Insurance" },
    { value: "health2", label: "Health Insurance 2" },
    // Add more options here if needed
  ];
  const [insuranceToggle, setInsuranceToggle] = useState(false);
  const [HPNToggle, setHPNToggle] = useState(false);
  const [exscToggle, setExScToggle] = useState(false);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-3/4 max-w-2xl ">
        <h2 className="text-2xl font-bold bg-yellow-500 text-white  text-center mb-4">
          New Quotation
        </h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 overflow-y-auto max-h-[70vh] pr-4" // Add scrollable behavior
        >
          <Dropdown
            options={dropdownOptions}
            label="Choose an VSModal"
            onSelect={handleDropdownSelect}
          />

          <VariantDropdown
            options={variageDropDown}
            label="Choose an Varient"
            onSelect={handleDropdownVarientSelect}
          />
          <ColorDropdown
            options={variageColorDropDown}
            label="Choose an Color"
            onSelect={handlerDropdownAllData}
          />
          <Input
            label={"Fuel Type"}
            name={"fuel_type"}
            formData={formData}
            setFormData={setFormData}
          />
          <Input
            label={"Ex Showroom Price"}
            name={"Ex_Showroom_Price"}
            formData={formData}
            setFormData={setFormData}
          />

          <div className="flex items-center space-x-4">
            {/* <button
              type="button"
              className={`px-4 py-2 rounded ${
                exscToggle ? "bg-green-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => setExScToggle(true)}
            >
              Exchange
            </button> */}
            <button
              type="button"
              className={`px-4 py-2 rounded ${
                !exscToggle ? "bg-green-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => setExScToggle((item) => !item)}
            >
              Scrap Benifit
            </button>
          </div>

          {!exscToggle && (
            <Input
              label={"scrap Amount"}
              name={"scrap_benifit"}
              formData={formData}
              setFormData={setFormData}
              symbol="₹"
            />
          )}

          <Input
            label={"Additonal discount"}
            name={"additional"}
            formData={formData}
            setFormData={setFormData}
            symbol="₹"
          />
          <Input
            label={"TCS"}
            name={"TCS_price"}
            formData={formData}
            setFormData={setFormData}
            percentage={"%"}
          />

          <Input
            label={"Billing Price"}
            name={"billing_price"}
            formData={formData}
            setFormData={setFormData}
            symbol="₹"
          />
          <ScrafCertificate formData={formData} setFormData={setFormData} />

          {/* <div>
          <span>insurance</span>
          <button
          type="button"
          onClick={()=>setInsuranceToggle(true)}
          >All option</button>

          <button
           onClick={()=>setInsuranceToggle(false)}
          type="button"
          >
            Nothing</button>
        </div>
          {insuranceToggle ? <MultiSelectDropdown
            options={allFiledCodeData.insurances}
            formData={formData}
            setFormData={setFormData}
          />:null} */}

          {/* Insurance Section */}
          <div className="flex items-center space-x-4">
            <span className="font-semibold">Insurance:</span>
            <button
              type="button"
              className={`px-4 py-2 rounded ${
                insuranceToggle ? "bg-green-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => setInsuranceToggle(true)}
            >
              Tata
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded ${
                !insuranceToggle ? "bg-red-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => setInsuranceToggle(false)}
            >
              Costomer
            </button>
          </div>

          {insuranceToggle && (
            <MultiSelectDropdown
              options={allFiledCodeData.insurances}
              formData={formData}
              setFormData={setFormData}
            />
          )}

          <AccMultiSelectDropdown
            options={allFiledCodeData.accessories}
            formData={formData}
            setFormData={setFormData}
          />

          <VasMultiSelectDropdown
            options={allFiledCodeData.vas}
            formData={formData}
            setFormData={setFormData}
          />

          <Input
            label={"Scrap Certificate"}
            name={"Scrap_Certificate_price"}
            formData={formData}
            setFormData={setFormData}
            symbol="₹"
          />
          <Input
            label={"Fastag"}
            name={"fastag_price"}
            formData={formData}
            setFormData={setFormData}
            symbol="₹"
          />

          {/* <Dropdown
            options={hpnInputData}
            label="Choose an HPN"
            onSelect={handleHpnDropdownSelect}
          /> */}

          <NormalInput
            label={"Costumer Name"}
            name={"customer_name"}
            formData={formData}
            setFormData={setFormData}
          />
          <NormalInput
            label={"Customer Mobile No"}
            name={"customer_mobile_no"}
            formData={formData}
            setFormData={setFormData}
          />

          <NormalInput
            label={"Address"}
            name={"address"}
            type={"address"}
            formData={formData}
            setFormData={setFormData}
          />

          <div className="flex items-center space-x-4">
            <span className="font-semibold">Quatation for:</span>
            <button
              type="button"
              className={`px-4 py-2 rounded ${
                HPNToggle ? "bg-green-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => {
                setHPNToggle(false);
                setFormData((prevItem) => ({
                  ...prevItem,
                  QuotationType: "general",
                }));
              }}
            >
              general
            </button>

            <button
              type="button"
              className={`px-4 py-2 rounded ${
                !HPNToggle ? "bg-red-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => {
                setHPNToggle(true);
                setFormData((prevItem) => ({
                  ...prevItem,
                  QuotationType: "financer",
                }));
              }}
            >
              financer
            </button>
          </div>
          {HPNToggle && (
            <Dropdown
              options={hpnInputData}
              label="Choose an HPN"
              onSelect={handleHpnDropdownSelect}
            />
          )}
          {/* <DownloadPdf /> */}

          <DounloadPdfTable formData={formData} />

          <div className="text-right">
            <button
              type="button"
              onClick={closeModal}
              className="mr-2 px-4 py-2 bg-gray-400 text-white rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuotationPopupForm;
