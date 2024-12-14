'use client';
import QuotationPopupForm from '@/components/QuotationManagement/QuotationPopupForm';
import QuotationTable from '@/components/QuotationManagement/QuotationTable';
import React, { useState } from 'react';

const QuotationForm = () => {
  const [formData, setFormData] = useState({
    model: '',
    fuel: '',
    color: '',
    variant: '',
    exShowroom: '',
    exchange: '',
    otherDiscount: '',
    additionalDiscount: '',
    billingPrice: '',
    tcs: '',
    scrapCertificate: false,
    rto: '',
    insurance: '',
    fastag: '',
    accessories: '',
    accessoriesDiscount: '',
    vas: '',
    finalDealAmount: '',
    customerName: '',
    customerMobile: '',
    address: '',
    hpn: '',
  });

  const [showModal, setShowModal] = useState(false);
  const [submittedData, setSubmittedData] = useState([
    {
      model: "Honda City",
      fuel: "Petrol",
      color: "White",
      variant: "VX",
      exShowroom: "10,00,000",
      exchange: "50,000",
      otherDiscount: "10,000",
      additionalDiscount: "5,000",
      billingPrice: "9,35,000",
      tcs: "9,350",
      scrapCertificate: true,
      rto: "50,000",
      insurance: "40,000",
      fastag: "500",
      accessories: "15,000",
      accessoriesDiscount: "2,000",
      vas: "3,000",
      finalDealAmount: "9,50,850",
      customerName: "Rahul Sharma",
      customerMobile: "9876543210",
      address: "Delhi, India",
      hpn: "No",
    },
    {
      model: "Maruti Swift",
      fuel: "Diesel",
      color: "Red",
      variant: "ZXI",
      exShowroom: "8,00,000",
      exchange: "40,000",
      otherDiscount: "8,000",
      additionalDiscount: "2,000",
      billingPrice: "7,50,000",
      tcs: "7,500",
      scrapCertificate: false,
      rto: "40,000",
      insurance: "35,000",
      fastag: "500",
      accessories: "10,000",
      accessoriesDiscount: "1,500",
      vas: "2,000",
      finalDealAmount: "7,89,000",
      customerName: "Priya Mehta",
      customerMobile: "9123456789",
      address: "Mumbai, India",
      hpn: "Yes",
    },
  ]);
  

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData([...submittedData, formData]);
    setShowModal(false);
    setFormData({
      model: '',
      fuel: '',
      color: '',
      variant: '',
      exShowroom: '',
      exchange: '',
      otherDiscount: '',
      additionalDiscount: '',
      billingPrice: '',
      tcs: '',
      scrapCertificate: false,
      rto: '',
      insurance: '',
      fastag: '',
      accessories: '',
      accessoriesDiscount: '',
      vas: '',
      finalDealAmount: '',
      customerName: '',
      customerMobile: '',
      address: '',
      hpn: '',
    });
    alert('Quotation Submitted Successfully!');
  };

  return (
    <>
      <div className="text-right ">
        <h3 className=" font-semibold mb-4 p-2 text-center bg-yellow-500 text-white text-black">Quotations Management</h3>
        <button
          onClick={() => setShowModal(true)}
          className="bg-yellow-500 text-white px-4 py-2 rounded-md"
        >
          Create New Quotation
        </button>

        {showModal && (
          <QuotationPopupForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            closeModal={() => setShowModal(false)}
          />
        )}

        <QuotationTable submittedData={submittedData} />
      </div>
    </>
  );
};

export default QuotationForm;
