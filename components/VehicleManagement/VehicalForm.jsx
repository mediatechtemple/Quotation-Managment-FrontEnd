import React from "react";

const VehicalForm = ({
  formData,
  onFieldChange,
  handleSubmit,
  onCancel,
  handleAddField,
  handleDeleteField,
  handleInputChange
}) => {
  return (
    <div className="bg-white rounded shadow-lg w-full max-w-lg p-6 overflow-auto max-h-[80vh]">
      <h2 className="text-xl font-semibold mb-4">Vehicle Details Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Static Fields */}
        <input
          type="number"
          placeholder="Manufacturing Year"
          value={formData.Manufacturing_Year}
          onChange={(e) => onFieldChange("Manufacturing_Year", e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="VC Code"
          value={formData.VC_Code}
          onChange={(e) => onFieldChange("VC_Code", e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="PPL"
          value={formData.ppl}
          onChange={(e) => onFieldChange("ppl", e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Fuel"
          value={formData.fuel_type}
          onChange={(e) => onFieldChange("fuel_type", e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Variant"
          value={formData.variant}
          onChange={(e) => onFieldChange("variant", e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Colour"
          value={formData.color}
          onChange={(e) => onFieldChange("color", e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          placeholder="Ex Showroom Price"
          value={formData.Ex_Showroom_Price}
          onChange={(e) =>
            onFieldChange("Ex_Showroom_Price", e.target.value)
          }
          className="border p-2 rounded w-full"
        />
        {/* <input
          type="number"
          placeholder="Exchange / Scrappage Discount"
          value={formData.exchangeDiscount}
          onChange={(e) =>
            onFieldChange("exchangeDiscount", e.target.value)
          }
          className="border p-2 rounded w-full"
        />   */}
        <input
          type="number"
          placeholder="Corporate Offer Top @20"
          value={formData.Corporate_Offer_Top}
          onChange={(e) =>
            onFieldChange("Corporate_Offer_Top", e.target.value)
          }
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          placeholder="Corporate Offer @TOI"
          value={formData.Corporate_Offer}
          onChange={(e) =>
            onFieldChange("Corporate_Offer", e.target.value)
          }
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Additional Offer"
          value={formData.additional}
          onChange={(e) => onFieldChange("additional", e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          placeholder="RTO Normal"
          value={formData.RTO_Normal}
          onChange={(e) => onFieldChange("RTO_Normal", e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          placeholder="RTO Normal Scrap"
          value={formData.RTO_Normal_scrap}
          onChange={(e) =>
            onFieldChange("RTO_Normal_scrap", e.target.value)
          }
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          placeholder="RTO BH"
          value={formData.RT_BH}
          onChange={(e) => onFieldChange("RT_BH", e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          placeholder="RTO TRC"
          value={formData.RT_TRC}
          onChange={(e) => onFieldChange("RT_TRC", e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          placeholder="Insurance"
          value={formData.insurance}
          onChange={(e) => onFieldChange("insurance", e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={(e) => onFieldChange("quantity", e.target.value)}
          className="border p-2 rounded w-full"
        />
         <input
          type="text"
          placeholder="others1"
          value={formData.other1}
          onChange={(e) => onFieldChange("other1", e.target.value)}
          className="border p-2 rounded w-full"
        />

        {/* Dynamic Fields */}
        <h3 className="text-lg font-semibold">Ins 11 ads on</h3>


    <button
        type="button"
        onClick={handleAddField}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add Field
      </button>

      {Object.keys(formData.insurance_details)
        .filter((key) => key.startsWith("insurance")) // Only process "name" fields
        .map((key, index) => {
          const aboutKey = key.replace("insurance", "price"); // Get corresponding "about" field
          const fieldNumber = key.replace("insurance", ""); // Extract number (e.g., 1, 2)

          return (
            <div key={index} className="flex space-x-2 items-center w-full">
              <input
                type="text"
                placeholder={`Insurance ${fieldNumber}`}
                value={formData.insurance_details[key]}
                onChange={(e) =>
                  handleInputChange(key, e.target.value)
                }
                className="border py-1 rounded"
              />
              <input
                type="number"
                placeholder={`Price ${fieldNumber}`}
                value={formData.insurance_details[aboutKey]}
                onChange={(e) =>
                  handleInputChange(aboutKey, +e.target.value)
                }
                className="border py-1 rounded"
              />
              <button
                onClick={() => handleDeleteField(fieldNumber)}
                className="py-1 px-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          );
        })}
















        

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default VehicalForm;














