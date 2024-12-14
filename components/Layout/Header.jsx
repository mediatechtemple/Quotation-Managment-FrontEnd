'use client';
import { AiOutlineMenu } from 'react-icons/ai';

const Header = ({ toggleSidebar }) => {
  return (
    <header
      style={{ backgroundColor: '#f5f5f5' }}
      className="bg-blue-500 text-white p-4 fixed w-full z-10 border-b-2 border-[#ddd]"
    >
      <div className="flex justify-between items-center text-black">
        <button
          onClick={toggleSidebar}
          className="bg-[#f8b602] text-blue-500 px-2 py-1 rounded"
        >
          <AiOutlineMenu size={24} className="text-white" />
        </button>
        <span>Header</span>
      </div>
    </header>
  );
};

export default Header;
