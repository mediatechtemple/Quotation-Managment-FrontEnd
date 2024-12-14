'use client';
import React from 'react';

const QuotationPopupForm = ({
  formData,
  handleChange,
  handleSubmit,
  closeModal,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-3/4 max-w-2xl ">
        <h2 className="text-2xl font-bold bg-yellow-500 text-white  text-center mb-4">New Quotation</h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 overflow-y-auto max-h-[70vh] pr-4" // Add scrollable behavior
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Model</label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Vehicle Model"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Fuel</label>
              <input
                type="text"
                name="fuel"
                value={formData.fuel}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Fuel Type"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Color</label>
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Vehicle Color"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Variant</label>
              <input
                type="text"
                name="variant"
                value={formData.variant}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Variant"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Ex-Showroom Price</label>
              <input
                type="number"
                name="exShowroom"
                value={formData.exShowroom}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex-Showroom Price"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Exchange Value</label>
              <input
                type="number"
                name="exchange"
                value={formData.exchange}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Exchange Value"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium">Other Discount</label>
            <input
              type="number"
              name="otherDiscount"
              value={formData.otherDiscount}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Other Discount"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Additional Discount</label>
            <input
              type="number"
              name="additionalDiscount"
              value={formData.additionalDiscount}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Additional Discount"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Billing Price</label>
            <input
              type="number"
              name="billingPrice"
              value={formData.billingPrice}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Billing Price"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">TCS</label>
            <input
              type="number"
              name="tcs"
              value={formData.tcs}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="TCS"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Scrap Certificate</label>
            <input
              type="checkbox"
              name="scrapCertificate"
              checked={formData.scrapCertificate}
              onChange={handleChange}
              className="mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">RTO</label>
            <input
              type="number"
              name="rto"
              value={formData.rto}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="RTO"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Insurance</label>
            <input
              type="number"
              name="insurance"
              value={formData.insurance}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Insurance"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Fastag</label>
            <input
              type="number"
              name="fastag"
              value={formData.fastag}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Fastag"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Accessories</label>
            <input
              type="text"
              name="accessories"
              value={formData.accessories}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Accessories"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Accessories Discount</label>
            <input
              type="number"
              name="accessoriesDiscount"
              value={formData.accessoriesDiscount}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Accessories Discount"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">VAS</label>
            <input
              type="text"
              name="vas"
              value={formData.vas}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="VAS"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Final Deal Amount</label>
            <input
              type="number"
              name="finalDealAmount"
              value={formData.finalDealAmount}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Final Deal Amount"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Customer Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Customer Address"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Hypothecation Number</label>
            <input
              type="text"
              name="hpn"
              value={formData.hpn}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Hypothecation Number"
            />
          </div>
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
