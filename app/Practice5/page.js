'use client'
import React, { useState } from "react";

const DynamicFields = () => {
  const [formFields, setFormFields] = useState({ name1: "", about1: "" });
  const [fieldCount, setFieldCount] = useState(1); // Keeps track of field count

  // Add new dynamic fields
  const handleAddField = () => {
    const newCount = fieldCount + 1;
    setFormFields({
      ...formFields,
      [`name${newCount}`]: "",
      [`about${newCount}`]: "",
    });
    setFieldCount(newCount);
  };

  // Delete specific fields
  const handleDeleteField = (fieldKey) => {
    const updatedFields = { ...formFields };
    delete updatedFields[`name${fieldKey}`];
    delete updatedFields[`about${fieldKey}`];
    setFormFields(updatedFields);
  };

  // Handle input changes
  const handleInputChange = (fieldKey, value) => {
    setFormFields({ ...formFields, [fieldKey]: value });
  };

  return (
    <div className="p-4 space-y-4">
      <button
        onClick={handleAddField}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add Field
      </button>

      {Object.keys(formFields)
        .filter((key) => key.startsWith("name")) // Only process "name" fields
        .map((key, index) => {
          const aboutKey = key.replace("name", "about"); // Get corresponding "about" field
          const fieldNumber = key.replace("name", ""); // Extract number (e.g., 1, 2)

          return (
            <div key={index} className="flex space-x-4 items-center">
              <input
                type="text"
                placeholder={`Name ${fieldNumber}`}
                value={formFields[key]}
                onChange={(e) =>
                  handleInputChange(key, e.target.value)
                }
                className="border px-2 py-1 rounded"
              />
              <input
                type="text"
                placeholder={`About ${fieldNumber}`}
                value={formFields[aboutKey]}
                onChange={(e) =>
                  handleInputChange(aboutKey, e.target.value)
                }
                className="border px-2 py-1 rounded"
              />
              <button
                onClick={() => handleDeleteField(fieldNumber)}
                className="px-2 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          );
        })}
    </div>
  );
};

export default DynamicFields;
