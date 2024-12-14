'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import Popup from './Popup';
import LoginForm from './LoginForm';
import { useRouter } from 'next/navigation'
const LoginPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  const LoginHandler = (e) => {
    e.preventDefault();
    alert('hello')
    console.log(e.target.mobile.value);
    console.log(e.target.password.value);
    if(e.target.mobile.value){
      router.push('/')
    }
  };

  return (
    <>
      <div className="flex flex-wrap min-h-screen bg-gray-50">
        {/* Left side: Image */}
        <div className="w-full lg:w-1/2 h-64 lg:h-auto relative">
          <Image
            src="/LoginImages/pexels-a-darmel-8134194.jpg"
            alt="Login Image"
            layout="fill"
            objectFit="cover"
            className="rounded-lg lg:rounded-none"
          />
        </div>

        {/* Right side: Form */}
        <div className="w-full lg:w-1/2 flex justify-center items-center p-6 lg:p-12 bg-gray-400 shadow-lg">
          <LoginForm
            onLogin={LoginHandler}
            onForgotPassword={() => setShowPopup(true)}
          />
        </div>
      </div>

      {showPopup && (
        <Popup
          message="Please contact your administrator for password recovery."
          onClose={() => setShowPopup(false)}
        />
      )}
    </>
  );
};

export default LoginPage;
