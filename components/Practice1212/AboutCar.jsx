import React from "react";

const AboutCar = ({formData}) => {
  return (
    <table className="border-collapse border border-gray-500 w-full text-left mt-4">
      <tbody>
        <tr>
            <th>About Car</th>
        </tr>
        <tr>
          <th className="border border-gray-500 px-2 py-1">Model</th>
          <td className="border border-gray-500 px-2 py-1">{formData.modelnames}</td>
          <th className="border border-gray-500 px-2 py-1">Fuel</th>
          <td className="border border-gray-500 px-2 py-1">{formData.fuel_type}</td>
        </tr>
        <tr>
          <th className="border border-gray-500 px-2 py-1">Varient</th>
          <td className="border border-gray-500 px-2 py-1">{formData.variantname}</td>
          <th className="border border-gray-500 px-2 py-1">Color</th>
          <td className="border border-gray-500 px-2 py-1">{formData.colorname}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default AboutCar;
