import { useEffect, useState } from "react";

const Popup = ({ field, value, onClose, onSubmit }) => {
    const [inputValue, setInputValue] = useState(value);
  
    const handleSubmit = () => {
      if (!isNaN(inputValue)) {
        onSubmit(parseFloat(inputValue));
        onClose();
      } else {
        alert("Please enter a valid number");
      }
    };

    useEffect(()=>{
      console.log(inputValue);
    },[inputValue]);
  
    return (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded shadow-lg w-96">
          <h2 className="text-xl font-semibold mb-4">Edit {field}</h2>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="border border-gray-300 w-full p-2 rounded mb-4"
          />
          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  };

  export default Popup;