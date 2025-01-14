import React, { useState } from "react";

const VariantDropdown = ({ options, label, onSelect, }) => {
  const [selectedOption, setSelectedOption] = useState("");

  console.log(options);

  const handleChange = (e) => {

    const value = e.target.value;
    const variantObj=options.find((item)=>item.id==value);
    console.log(variantObj);
    setSelectedOption(value);
    onSelect(variantObj.variant,variantObj.color); // Notify parent of the selected value
  };

  return (
    <div className="mb-4">
      <label className="block font-medium mb-2">{label}</label>
      <select
        value={selectedOption}
        onChange={handleChange}
        className="border rounded p-2 w-full"
      >
        <option value="" disabled>
          Select an option
        </option>
        {/* here option is object which contain variant and  color i want that when i clcik handler chante 
        method get both baleu variant and color is it possible,
        */}
        <option  value="none">None</option> {/* New "None" Option */}
        {options.map((option, index) => (
          <option key={index} value={option.id} >
            {option.variant}
          </option>
        ))}
      </select>
    </div>
  );
};

export default VariantDropdown;
