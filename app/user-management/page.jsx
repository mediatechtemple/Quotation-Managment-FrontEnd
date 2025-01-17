"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

const UserTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API से डेटा फेच करना
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://quotationlocal.onrender.com/api/member");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p className="text-center mt-4">Loading...</p>;
  }

  if (error) {
    return <p className="text-center mt-4 text-red-500">Error: {error}</p>;
  }

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-4">User Data</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Mobile No</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Role</th>
              <th className="px-4 py-2 border">Profile</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
              <tr key={user.id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border">{user.id}</td>
                <td className="px-4 py-2 border">{user.name || "N/A"}</td>
                <td className="px-4 py-2 border">{user.email || "N/A"}</td>
                <td className="px-4 py-2 border">{user.mobile_no}</td>
                <td className="px-4 py-2 border">{user.status ? "true" : "false" || "N/A"}</td>
                <td className="px-4 py-2 border">{user.role || "N/A"}</td>
                <td className="px-4 py-2 border">
                  {user.profile ? (
                    <Image
                      src={`https://quotationlocal.onrender.com${user.profile}`}
                      alt="Profile"
                      height={50}
                      width={50}
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    "N/A"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
