import React, { useEffect, useState } from "react";

const VasMultiSelectDropdown = ({ options = [], formData, setFormData }) => {
  const [openModal, setOpenModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleModal = () => setOpenModal(!openModal);

  const handleSelectVas = (vas) => {
    const { VAS_Name, VAS_price } = vas;

    setFormData((prevState) => {
      const vasData = prevState.vas || {};

      const existingVasIndex = Object.keys(vasData).findIndex(
        (key) => vasData[key] === VAS_Name
      );

      if (existingVasIndex !== -1) {
        // Remove existing VAS
        const newState = { ...vasData };
        const index = Math.ceil((existingVasIndex + 1) / 2); // Find index
        delete newState[`vas${index}`];
        delete newState[`price${index}`];
        return {
          ...prevState,
          vas: reorderKeys(newState),
        };
      } else {
        // Add new VAS
        const nextIndex = Object.keys(vasData).length / 2 + 1;
        return {
          ...prevState,
          vas: {
            ...vasData,
            [`vas${nextIndex}`]: VAS_Name,
            [`price${nextIndex}`]: VAS_price,
          },
        };
      }
    });
  };

  const handleSelectAll = () => {
    setFormData((prevState) => {
      if (Object.keys(prevState.vas || {}).length === options.length * 2) {
        return {
          ...prevState,
          vas: {},
        };
      } else {
        const allVas = options.reduce((acc, option, index) => {
          acc[`vas${index + 1}`] = option.VAS_Name;
          acc[`price${index + 1}`] = option.VAS_price;
          return acc;
        }, {});
        return {
          ...prevState,
          vas: allVas,
        };
      }
    });
  };

  const reorderKeys = (obj) => {
    const reordered = {};
    let count = 1;
    for (let [key, value] of Object.entries(obj)) {
      if (key.startsWith("vas")) {
        reordered[`vas${count}`] = value;
      } else if (key.startsWith("price")) {
        reordered[`price${count}`] = value;
        count++;
      }
    }
    return reordered;
  };

  const filteredOptions = options.filter((option) =>
    option.VAS_Name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    console.log(formData.vas);
  }, [formData]);

  return (
    <div className="relative">
      <label>Add-ons VAS</label>
      <div className="border p-4 flex justify-between items-center">
        <div className="flex items-center">
          {Object.keys(formData.vas || {}).length > 0 && (
            <div className="flex gap-2 flex-wrap max-w-full">
              {Object.entries(formData.vas).map(([key, value]) => {
                if (key.startsWith("vas")) {
                  const index = key.replace("vas", "");
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
                          handleSelectVas(
                            options.find((option) => option.VAS_Name === value)
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
        {Object.keys(formData.vas || {}).length > 0 && (
          <div>
            {Object.entries(formData.vas).map(([key, value]) => {
              if (key.startsWith("vas")) {
                const index = key.replace("vas", "");
                return (
                  <div key={index} className="mb-4">
                    <label className="font-medium block mb-2">{value}</label>
                    <input
                      type="text"
                      value={`₹${formData.vas[`price${index}`]}`}
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
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96 max-w-full">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search VAS"
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <div className="max-h-64 overflow-y-auto mb-4">
              {filteredOptions.map((option) => (
                <div key={option.id} className="flex items-center p-2">
                  <input
                    type="checkbox"
                    checked={Object.values(formData.vas || {}).includes(
                      option.VAS_Name
                    )}
                    onChange={() => handleSelectVas(option)}
                    className="mr-2"
                  />
                  <span>{option.VAS_Name}</span>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={handleSelectAll}
              className="w-full py-2 bg-gray-200 text-gray-700 rounded mb-4 hover:bg-gray-300 transition"
            >
              {Object.keys(formData.vas || {}).length === options.length * 2
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

export default VasMultiSelectDropdown;
