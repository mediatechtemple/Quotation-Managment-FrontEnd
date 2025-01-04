'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaChevronDown } from 'react-icons/fa';

const Dropdown = ({ title, items, basePath }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(()=>{
    console.log('heel this one asoka')
  },[isOpen]);

  return (
    <li>
      <div
        className={`flex items-center justify-between px-2 py-1 rounded cursor-pointer ${
          isOpen ? 'bg-[#f8b602] text-white' : 'hover:bg-[#f8b602] hover:text-white'
        }`}
        onClick={() =>{ 
          setIsOpen(!isOpen)
        }}
      >
        <span className="flex items-center gap-2">{title}</span>
        <FaChevronDown className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      {isOpen && (
        <ul className="pl-4 mt-2 space-y-1">
          {items.map((item, index) => (
            <li key={index}>
              <Link href={`${item.path}`}>
                <span
                  className={`flex items-center gap-2 px-2 py-1 rounded hover:bg-[#f8b602] hover:text-white`}
                >
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default Dropdown;
