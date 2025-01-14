import React, { useEffect, useState } from "react";

const MultiSelectDropdown = ({ options = [],formData,setFormData }) => {

  const [openModal, setOpenModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleModal = () => setOpenModal(!openModal);


  const handleSelectInsurance = (insurance) => {
    const { insurance_Name, price } = insurance;

    console.log(insurance);

    setFormData((prevState) => {
      const insurances = prevState.insurances;


      const existingInsuranceIndex = Object.keys(insurances).findIndex(
        (key) => insurances[key] === insurance_Name
      );

      if (existingInsuranceIndex !== -1) {
        // If insurance already exists, remove it
        const newState = { ...insurances };
        const index = Math.ceil((existingInsuranceIndex + 1) / 2); // Find index
        delete newState[`insurance${index}`];
        delete newState[`price${index}`];
        return {
          ...prevState,
          insurances: reorderKeys(newState),
        };
      } else {
        // Add new insurance at the next available index
        const nextIndex = Object.keys(insurances).length / 2 + 1;
        return {
          ...prevState,
          insurances: {
            ...insurances,
            [`insurance${nextIndex}`]: insurance_Name,
            [`price${nextIndex}`]: price,
          },
        };
      }
    });
  };




















  const handleSelectAll = () => {
    setFormData((prevState) => {
      if (Object.keys(prevState.insurances).length === options.length * 2) {
        return {
          ...prevState,
          insurances: {},
        };
      } else {
        const allInsurances = options.reduce((acc, option, index) => {
          acc[`insurance${index + 1}`] = option.insurance_Name;
          acc[`price${index + 1}`] = option.price;
          return acc;
        }, {});
        return {
          ...prevState,
          insurances: allInsurances,
        };
      }
    });
  };











  const reorderKeys = (obj) => {
    const reordered = {};
    let count = 1;
    for (let [key, value] of Object.entries(obj)) {
      if (key.startsWith("insurance")) {
        reordered[`insurance${count}`] = value;
      } else if (key.startsWith("price")) {
        reordered[`price${count}`] = value;
        count++;
      }
    }
    return reordered;
  };






  const filteredOptions = options.filter((option) =>
    option.insurance_Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    console.log(formData.insurances);
  }, [formData]);

  return (
    <div className="relative">












      <label>Adds on Insurance</label>
      <div className="border p-4 flex justify-between items-center">
        <div className="flex items-center">
          {Object.keys(formData.insurances).length > 0 && (
            <div className="flex gap-2 flex-wrap max-w-full">
              {Object.entries(formData.insurances).map(([key, value]) => {
                if (key.startsWith("insurance")) {
                  const index = key.replace("insurance", "");
                  return (
                    <span
                      key={index}
                      className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm flex items-center"
                    >
                      {value}
                      <button
                        type="button"
                        className="ml-2 text-white hover:text-red-400"
                        onClick={() =>
                          handleSelectInsurance(
                            options.find(
                              (option) => option.insurance_Name === value
                            )
                          )
                        }
                      >
                        &times;
                      </button>
                    </span>
                  );
                }
                return null;
              })}
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={toggleModal}
          className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition ml-auto"
        >
          +
        </button>
      </div>


















      <div className="mt-4">
        {Object.keys(formData.insurances).length > 0 && (
          <div>
            {Object.entries(formData.insurances).map(([key, value]) => {
              if (key.startsWith("insurance")) {
                const index = key.replace("insurance", "");
                return (
                  <div key={index} className="mb-4">
                    <label className="font-medium block mb-2">{value}</label>
                    <input
                      type="text"
                      value={`₹${formData.insurances[`price${index}`]}`}
                      readOnly
                      className="p-2 w-full border border-gray-300 rounded"
                    />
                  </div>
                );
              }
              return null;
            })}
          </div>
        )}
      </div>






























      {openModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-96 max-w-full">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Insurance"
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <div className="max-h-64 overflow-y-auto mb-4">
              {filteredOptions.map((option) => (
                <div key={option.id} className="flex items-center p-2">
                  <input
                    type="checkbox"
                    checked={Object.values(formData.insurances).includes(
                      option.insurance_Name
                    )}
                    onChange={() => handleSelectInsurance(option)}
                    className="mr-2"
                  />
                  <span>{option.insurance_Name}</span>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={handleSelectAll}
              className="w-full py-2 bg-gray-200 text-gray-700 rounded mb-4 hover:bg-gray-300 transition"
            >
              {Object.keys(formData.insurances).length === options.length * 2
                ? "Deselect All"
                : "Select All"}
            </button>
            <button
              type="button"
              onClick={toggleModal}
              className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Done
            </button>
          </div>
        </div>
      )}













    </div>
  );
};

export default MultiSelectDropdown;
