"use client";
import React from "react";
import Image from "next/image";

const Header = () => {
  return (
    <div className="border border-gray-300 shadow-md rounded-md p-4">
      <div className="flex justify-between items-center">
        {/* Left Section */}
        <div className="border border-spacing-1">
          <h1 className="text-lg font-bold uppercase border border-spacing-1">
            Shree Shyam Motors
          </h1>
          <div className="text-sm">
            <p className="border border-spacing-1">
              <strong>Jaipur VKI:</strong> Kh. No. 52-53, VKI Area, Sikar Road,
              Jaipur-302013
            </p>
            <p className="border border-spacing-1">
              <strong>Mansarovar:</strong> Plot No 4,5,6,7 Mangyawas, New
              Sanganer Road, Mansarovar, Jaipur-302020
            </p>
            <p className="border border-spacing-1">
              <strong>Kotputli:</strong> Kundli Mod, Pulti Cut, NH-8,
              Kotputli-303108
            </p>
            <p className="border border-spacing-1">
              <strong>Chomu:</strong> Chomu Jaipur Road, Opp Ganpati Hotel,
              Chomu-303702
            </p>
            <div className="mt-4 text-sm border border-spacing-1">
              <p>
                <strong>(M)</strong> +91-7229811889, <strong>Email:</strong>{" "}
                <a
                  href="mailto:sales.shreeshyammotors@gmail.com"
                  className="text-blue-500 hover:underline"
                  aria-label="Email Shree Shyam Motors"
                >
                  sales.shreeshyammotors@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
        {/* Right Section */}
        <div className="w-30 border border-spacing-1">
          <Image
            width={100}
            height={100}
            src="/LoginImages/pexels-a-darmel-8134194.jpg"
            alt="Shree Shyam Motors Logo"
            className="w-full border border-black"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
