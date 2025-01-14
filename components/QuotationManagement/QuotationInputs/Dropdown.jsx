import React, { useState } from "react";

const Dropdown = ({ options, label, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedOption(value);
    onSelect(value); // Notify parent of the selected value
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
        <option value="none">None</option> {/* New "None" Option */}
        {options?.map((option, index) => (
          <option key={index} value={option.ppl ? option.ppl : option.hpn} >
            {option.ppl ? option.ppl : option.hpn}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
