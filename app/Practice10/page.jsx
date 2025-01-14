'use client'
import React, { useState } from "react";

const MultiSelectForm = ({ options, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    selectedOptions: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (e) => {
    const value = e.target.value;

    if (value && !formData.selectedOptions.includes(value)) {
      setFormData({
        ...formData,
        selectedOptions: [...formData.selectedOptions, value],
      });
    }
  };

  const removeOption = (option) => {
    setFormData({
      ...formData,
      selectedOptions: formData.selectedOptions.filter((opt) => opt !== option),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border rounded shadow-lg max-w-md mx-auto"
    >




      <div className="mb-4">
        <label htmlFor="name" className="block font-medium mb-2">
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          className="border rounded p-2 w-full"
          required
        />
      </div>




      <div className="mb-4">
        <label htmlFor="age" className="block font-medium mb-2">
          Age:
        </label>
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Enter your age"
          className="border rounded p-2 w-full"
          required
        />
      </div>




      <div className="mb-4">
        <label className="block font-medium mb-2">Select Options:</label>



        <div className="flex flex-wrap gap-2 mb-2">
          {formData.selectedOptions.map((option, index) => (
            <span
              key={index}
              className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm flex items-center"
            >
              {option}
              <button
                type="button"
                onClick={() => removeOption(option)}
                className="ml-2 text-white hover:text-red-400"
              >
                &times;
              </button>
            </span>
          ))}
        </div>





        <select
          value=""
          onChange={handleSelectChange}
          className="border rounded p-2 w-full"
        >
          <option value="" disabled>
            Select an option
          </option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>









      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

// Example Usage
const App = () => {
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
    { value: "option4", label: "Option 4" },
  ];

  const handleFormSubmit = (formData) => {
    alert(
      `Name: ${formData.name}\nAge: ${formData.age}\nSelected Options: ${formData.selectedOptions.join(
        ", "
      )}`
    );
  };

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-6">Multi-Select Dropdown with Tags</h1>
      <MultiSelectForm options={options} onSubmit={handleFormSubmit} />
    </div>
  );
};

export default App;
