import React from "react";

const Input = ({ label, name, type = "text", formData, setFormData,symbol,percentage }) => {

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="mb-4">
      <div className='flex justify-start'>
      <label htmlFor={name} className="block text-sm font-medium mb-1">
        {`${label}`}
      </label>
      </div>
      <input
        type={type}
        name={name}
        id={name}
        value={`${symbol ? symbol:''}${formData[name] ? formData[name] : ""}${percentage ? percentage :""} `|| ""}
        onChange={handleChange}
        className="block w-full p-2 border border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
};

export default Input;
