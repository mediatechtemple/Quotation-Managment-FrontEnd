"use client";

import Popup from "@/components/Input/Popup";
import React, { useState, useEffect } from "react";


const EditableTable = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [popupInfo, setPopupInfo] = useState({ show: false, field: "", value: 0 });

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://quotationlocal.onrender.com/api/input/");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result[0]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Open popup for editing
  const handleEdit = (field, value) => {
    setPopupInfo({ show: true, field, value });
  };

  // Handle popup submit
  const handlePopupSubmit = async (newValue) => {
    const updatedData = {
      ...data,
      [popupInfo.field]: newValue,
    };

    try {
      const response = await fetch(
        `https://quotationlocal.onrender.com/api/input/${data.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update data");
      }

      setData(updatedData);
      alert("Data updated successfully!");
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table-auto border-collapse border border-gray-300 w-full text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Value</th>
            <th className="border border-gray-300 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {data && (
            <>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{data.fastag}</td>
                <td className="border border-gray-300 px-4 py-2">₹{data.fastag_price}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleEdit("fastag_price", data.fastag_price)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{data.TCS}</td>
                <td className="border border-gray-300 px-4 py-2">{data.TCS_price}%</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleEdit("TCS_price", data.TCS_price)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{data.Scrap_Certificate}</td>
                <td className="border border-gray-300 px-4 py-2">₹{data.Scrap_Certificate_price}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleEdit("Scrap_Certificate_price", data.Scrap_Certificate_price)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            </>
          )}
        </tbody>
      </table>

      {popupInfo.show && (
        <Popup
          field={popupInfo.field}
          value={popupInfo.value}
          onClose={() => setPopupInfo({ show: false, field: "", value: 0 })}
          onSubmit={handlePopupSubmit}
        />
      )}
    </div>
  );
};

export default EditableTable;
