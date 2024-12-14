import React from "react";

const VehicalForm = ({
  formData,
  onFieldChange,
  onDynamicFieldChange,
  onAddDynamicField,
  onSubmit,
  onCancel,
}) => {
  return (
    <div className="bg-white rounded shadow-lg w-full max-w-lg p-6 overflow-auto max-h-[80vh]">
      <h2 className="text-xl font-semibold mb-4">Vehicle Details Form</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        {/* Static Fields */}
        <input
          type="number"
          placeholder="Manufacturing Year"
          value={formData.manufacturingYear}
          onChange={(e) => onFieldChange("manufacturingYear", e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="VC Code"
          value={formData.vcCode}
          onChange={(e) => onFieldChange("vcCode", e.target.value)}
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
          value={formData.Fuel}
          onChange={(e) => onFieldChange("Fuel", e.target.value)}
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
          value={formData.colour}
          onChange={(e) => onFieldChange("colour", e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          placeholder="Ex Showroom Price"
          value={formData.exShowroomPrice}
          onChange={(e) =>
            onFieldChange("exShowroomPrice", e.target.value)
          }
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          placeholder="Exchange / Scrappage Discount"
          value={formData.exchangeDiscount}
          onChange={(e) =>
            onFieldChange("exchangeDiscount", e.target.value)
          }
          className="border p-2 rounded w-full"
        />  
        <input
          type="number"
          placeholder="Corporate Offer Top @20"
          value={formData.corporateOfferTop}
          onChange={(e) =>
            onFieldChange("corporateOfferTop", e.target.value)
          }
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          placeholder="Corporate Offer @TOI"
          value={formData.corporateOfferToi}
          onChange={(e) =>
            onFieldChange("corporateOfferToi", e.target.value)
          }
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Additional Offer"
          value={formData.additionalOffer}
          onChange={(e) => onFieldChange("additionalOffer", e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          placeholder="RTO Normal"
          value={formData.rtoNormal}
          onChange={(e) => onFieldChange("rtoNormal", e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          placeholder="RTO Normal Scrap"
          value={formData.rtoNormalScrap}
          onChange={(e) =>
            onFieldChange("rtoNormalScrap", e.target.value)
          }
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          placeholder="RTO BH"
          value={formData.rtoBh}
          onChange={(e) => onFieldChange("rtoBh", e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          placeholder="RTO TRC"
          value={formData.rtoTrc}
          onChange={(e) => onFieldChange("rtoTrc", e.target.value)}
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

        {/* Dynamic Fields */}
        <h3 className="text-lg font-semibold">Ins 11 ads on</h3>
        {formData.dynamicFields.map((field, index) => (
          <div key={index} className="space-y-2">
            <input
              type="text"
              placeholder="Name"
              value={field.name}
              onChange={(e) =>
                onDynamicFieldChange(index, "name", e.target.value)
              }
              className="border p-2 rounded w-full"
            />
            <input
              type="number"
              placeholder="Amount"
              value={field.amount}
              onChange={(e) =>
                onDynamicFieldChange(index, "amount", e.target.value)
              }
              className="border p-2 rounded w-full"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={onAddDynamicField}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add More Fields
        </button>

        {/* Buttons */}
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














