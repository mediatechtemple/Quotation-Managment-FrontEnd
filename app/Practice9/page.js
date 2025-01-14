'use client'
import Dropdown from "@/components/QuotationManagement/QuotationInputs/Dropdown";
import MultiSelectDropdown from "@/components/QuotationManagement/QuotationInputs/MultiSelectDropdown";
import React from "react";

const App = () => {
  const dropdownOptions = ["Option 1", "Option 2", "Option 3", "Option 4"];

  const handleDropdownSelect = (value) => {
    console.log("Selected option:", value === "none" ? "No selection" : value);
  };
  const handleMultiSelect = (selectedOptions) => {
    console.log("Selected options:", selectedOptions);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dropdown with None Option</h1>
      <Dropdown
        options={dropdownOptions}
        label="Choose an Option"
        onSelect={handleDropdownSelect}
      />

<h1 className="text-2xl font-bold mb-4">Multi-Select Dropdown Example</h1>
      <MultiSelectDropdown
        options={dropdownOptions}
        label="Choose Multiple Options"
        onSelect={handleMultiSelect}
      />
    </div>
  );
};

export default App;
