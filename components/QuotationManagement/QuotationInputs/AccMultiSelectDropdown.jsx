import React, { useEffect, useState } from "react";

const AccMultiSelectDropdown = ({ options = [], formData, setFormData }) => {
  const [openModal, setOpenModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleModal = () => setOpenModal(!openModal);

  const handleSelectAccessory = (accessory) => {
    const { accessories_name, accessories_price } = accessory;

    setFormData((prevState) => {
      const accessories = prevState.accessories || {};

      // Check if the accessory already exists
      const existingAccessoryIndex = Object.keys(accessories).findIndex(
        (key) => accessories[key] === accessories_name
      );

      if (existingAccessoryIndex !== -1) {
        // If accessory exists, remove it
        const newState = { ...accessories };
        const index = Math.ceil((existingAccessoryIndex + 1) / 2);
        delete newState[`accessories${index}`];
        delete newState[`price${index}`];
        return {
          ...prevState,
          accessories: reorderKeys(newState),
        };
      } else {
        // Add new accessory at the next available index
        const nextIndex = Object.keys(accessories).length / 2 + 1;
        return {
          ...prevState,
          accessories: {
            ...accessories,
            [`accessories${nextIndex}`]: accessories_name,
            [`price${nextIndex}`]: accessories_price,
          },
        };
      }
    });
  };

  const handleSelectAll = () => {
    setFormData((prevState) => {
      if (Object.keys(prevState.accessories || {}).length === options.length * 2) {
        return {
          ...prevState,
          accessories: {},
        };
      } else {
        const allAccessories = options.reduce((acc, option, index) => {
          acc[`accessories${index + 1}`] = option.accessories_name;
          acc[`price${index + 1}`] = option.accessories_price;
          return acc;
        }, {});
        return {
          ...prevState,
          accessories: allAccessories,
        };
      }
    });
  };

  const reorderKeys = (obj) => {
    const reordered = {};
    let count = 1;
    for (let [key, value] of Object.entries(obj)) {
      if (key.startsWith("accessories")) {
        reordered[`accessories${count}`] = value;
      } else if (key.startsWith("name")) {
        reordered[`price${count}`] = value;
        count++;
      }
    }
    return reordered;
  };

  const filteredOptions = options.filter((option) =>
    option.accessories_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    console.log(formData.accessories);
  }, [formData]);

  return (
    <div className="relative">
      <label>Adds on Accessories</label>
      <div className="border p-4 flex justify-between items-center">
        <div className="flex items-center">
          {Object.keys(formData.accessories || {}).length > 0 && (
            <div className="flex gap-2 flex-wrap max-w-full">
              {Object.entries(formData.accessories).map(([key, value]) => {
                if (key.startsWith("accessories")) {
                  const index = key.replace("accessories", "");
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
                          handleSelectAccessory(
                            options.find(
                              (option) => option.accessories_name === value
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
        {Object.keys(formData.accessories || {}).length > 0 && (
          <div>
            {Object.entries(formData.accessories).map(([key, value]) => {
              if (key.startsWith("accessories")) {
                const index = key.replace("accessories", "");
                return (
                  <div key={index} className="mb-4">
                    <label className="font-medium block mb-2">{value}</label>
                    <input
                      type="text"
                      value={`₹${formData.accessories[`price${index}`]}`}
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
              placeholder="Search Accessories"
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <div className="max-h-64 overflow-y-auto mb-4">
              {filteredOptions.map((option) => (
                <div key={option.id} className="flex items-center p-2">
                  <input
                    type="checkbox"
                    checked={Object.values(formData.accessories || {}).includes(
                      option.accessories_name
                    )}
                    onChange={() => handleSelectAccessory(option)}
                    className="mr-2"
                  />
                  <span>{option.accessories_name}</span>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={handleSelectAll}
              className="w-full py-2 bg-gray-200 text-gray-700 rounded mb-4 hover:bg-gray-300 transition"
            >
              {Object.keys(formData.accessories || {}).length ===
              options.length * 2
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

export default AccMultiSelectDropdown;
