'use client'
import React, { useState } from "react";

const DynamicForm = () => {
  const [formData, setFormData] = useState({
    dynamicFields: [{ name: "", amount: "" }],
  });

  // Function to add dynamic fields
  const handleAddDynamicField = () => {
    setFormData((prevData) => ({
      ...prevData,
      dynamicFields: [...prevData.dynamicFields, { name: "", amount: "" }],
    }));
  };



  // Function to handle field changes
  const handleFieldChange = (index, field, value) => {


    const updatedFields = formData.dynamicFields.map((item, idx) =>
      idx === index ? { ...item, [field]: value } : item
    );
    
    setFormData({ ...formData, dynamicFields: updatedFields });


  };




  // Function to remove a field
  const handleRemoveField = (index) => {
    const updatedFields = formData.dynamicFields.filter((_, idx) => idx !== index);
    setFormData({ ...formData, dynamicFields: updatedFields });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Dynamic Fields Form</h1>
      <form onSubmit={handleSubmit}>
        {formData.dynamicFields.map((field, index) => (
          <div key={index} className="mb-4 flex gap-4 items-center">
            <input
              type="text"
              placeholder="Name"
              value={field.name}
              onChange={(e) =>
                handleFieldChange(index, "name", e.target.value)
              }
              className="border p-2 rounded w-1/2"
            />
            <input
              type="number"
              placeholder="Amount"
              value={field.amount}
              onChange={(e) =>
                handleFieldChange(index, "amount", e.target.value)
              }
              className="border p-2 rounded w-1/4"
            />
            <button
              type="button"
              onClick={() => handleRemoveField(index)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddDynamicField}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Field
        </button>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded ml-4"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default DynamicForm;
