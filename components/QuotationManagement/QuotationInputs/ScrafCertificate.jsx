import React, { useState } from "react";
import Input from "./GeneralInput";

const ScrafCertificate = ({ formData, setFormData }) => {
  const [toggle, setToggle] = useState(null); // Initially set to null
  const [dealerToggle, setDealerToggl] = useState(false);

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <div className="mb-4">
        <span className="font-bold text-lg">Scrap Certificate</span>
        <div className="mt-2">
          <button
            type="button"
            className="bg-green-500 text-white py-2 px-4 rounded mr-2 hover:bg-green-600"
            onClick={() => setToggle(true)}
          >
            Yes
          </button>
          <button
            type="button"
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            onClick={() => setToggle(false)}
          >
            No
          </button>
        </div>
      </div>

      {/* Render based on toggle state */}
      {toggle === true && (
        <div className="mb-4">
          <div className="mb-4">
            <button
              type="button"
              className="bg-blue-500 text-white py-2 px-4 rounded mr-2 hover:bg-blue-600"
              onClick={() => setDealerToggl(false)}
            >
              By Customer
            </button>
            <button
              type="button"
              className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600"
              onClick={() => setDealerToggl((item) => !dealerToggle)}
            >
              By Dealer
            </button>
          </div>
          {dealerToggle && (
            <Input
              label={"RTO_Normal_scrap"}
              name={"RTO_Normal_scrap"}
              formData={formData}
              setFormData={setFormData}
              symbol="₹"
            />
          )}
        </div>
      )}

      {toggle === false && (
        <div className="space-y-4">
          <Input
            label={"Normal"}
            name={"RTO_Normal"}
            formData={formData}
            setFormData={setFormData}
            symbol="₹"
          />
          <Input
            label={"TRC"}
            name={"RT_TRC"}
            formData={formData}
            setFormData={setFormData}
            symbol="₹"
          />
          <Input
            label={"BH"}
            name={"RT_BH"}
            formData={formData}
            setFormData={setFormData}
            symbol="₹"
          />
        </div>
      )}
    </div>
  );
};

export default ScrafCertificate;
