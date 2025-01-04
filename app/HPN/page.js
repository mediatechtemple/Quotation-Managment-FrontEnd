"use client";

import React, { useState, useEffect } from "react";

// EditableTable Component
const EditableTable = () => {
  const [data, setData] = useState([]); // Holds the fetched data
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For error state
  const [popupInfo, setPopupInfo] = useState({
    show: false,
    type: "", // 'edit' or 'add'
    field: "",
    id: null,
    value: "",
  }); // Popup state

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://quotationlocal.onrender.com/api/input/hpns"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Open popup
  const handleOpenPopup = (type, field = "", id = null, value = "") => {
    setPopupInfo({ show: true, type, field, id, value });
  };

  // Handle popup submit
  const handlePopupSubmit = async (newValue) => {
    if (popupInfo.type === "edit") {
      const updatedItemIndex = data.findIndex((item) => item.id === popupInfo.id);
      if (updatedItemIndex === -1) return;

      const updatedData = [...data];
      updatedData[updatedItemIndex][popupInfo.field] = newValue;

      try {
        const response = await fetch(
          `https://quotationlocal.onrender.com/api/input/hpns/${popupInfo.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData[updatedItemIndex]),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update data");
        }

        setData(updatedData); // Update state with the updated data
        alert("Data updated successfully!");
      } catch (err) {
        alert(`Error: ${err.message}`);
      }
    } else if (popupInfo.type === "add") {
      const newItem = { hpn: newValue };

      try {
        const response = await fetch(
          "https://quotationlocal.onrender.com/api/input/hpns",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newItem),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to add data");
        }

        const addedItem = await response.json();
        setData((prevData) => [...prevData, addedItem]); // Add new item to state
        alert("Data added successfully!");
      } catch (err) {
        alert(`Error: ${err.message}`);
      }
    }

    setPopupInfo({ show: false, type: "", field: "", id: null, value: "" }); // Close popup
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="overflow-x-auto">
      <button
        onClick={() => handleOpenPopup("add")}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
      >
        Add New Entry
      </button>

      <table className="table-auto border-collapse border border-gray-300 w-full text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2">Sr. No</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{item.id}</td>
              <td className="border border-gray-300 px-4 py-2">{item.hpn}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleOpenPopup("edit", "hpn", item.id, item.hpn)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {popupInfo.show && (
        <Popup
          type={popupInfo.type}
          field={popupInfo.field}
          value={popupInfo.value}
          onClose={() =>
            setPopupInfo({ show: false, type: "", field: "", id: null, value: "" })
          }
          onSubmit={handlePopupSubmit}
        />
      )}
    </div>
  );
};

// Popup Component
const Popup = ({ type, field, value, onClose, onSubmit }) => {
  const [inputValue, setInputValue] = useState(value);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(inputValue); // Pass the updated or new value back to the parent
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">
          {type === "edit" ? `Edit ${field}` : "Add New Entry"}
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded mb-4"
            placeholder={type === "edit" ? `Enter new ${field}` : "Enter name"}
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-3 py-1 rounded mr-2 hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditableTable;
