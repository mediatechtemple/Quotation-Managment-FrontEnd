import React from "react";

const NormalInput = ({ label, name, type = "text", formData, setFormData }) => {
  // Handle input value change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value, // Removes unnecessary spaces
    }));
  };

  return (
    <div className="mb-4">
      {/* Label */}
      <div className="flex justify-start">
        <label htmlFor={name} className="block text-sm font-medium mb-1">
          {label}
        </label>
      </div>

      {/* Input */}
      <input
        type={type}
        name={name}
        id={name}
        value={formData[name] || ""} // Default value when undefined
        onChange={handleChange}
        className="block w-full p-2 border border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500"
        placeholder={`Enter ${label.toLowerCase()}`} // Dynamic placeholder
      />
    </div>
  );
};

export default NormalInput;
