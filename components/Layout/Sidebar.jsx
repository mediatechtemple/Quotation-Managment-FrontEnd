'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaAd, FaCar, FaBell, FaCogs, FaClipboard, FaUsers } from 'react-icons/fa'; // Icons import
import Dropdown from './Dropdown';

const Sidebar = ({ isSidebarOpen }) => {
  const pathname = usePathname(); // Get the current path
  // console.log(pathname);
  const inputDropdownItems = [
    { label: 'Fastag & TSC', path: 'Fastag_tsc' },
    { label: 'HPN', path: 'HPN' },
    { label: 'Scarf Certificate', path: 'Scarf-Certificate' },
  ];

  return (
    <div
      className={`bg-white p-4 fixed top-16 h-[calc(100vh-64px)] transition-transform duration-300 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } w-64 overflow-y-auto pb-20`}
    >
      <ul className="space-y-2 text-[#a098ae]">
        <li>
          <Link href="/Quotation-Management">
            <span
              className={`flex items-center gap-2 px-2 py-1 rounded ${
                pathname === '/Quotation-Management'
                  ? 'bg-[#f8b602] text-white'
                  : 'hover:bg-[#f8b602] hover:text-white'
              }`}
            >
              <FaHome /> Quotation Management
            </span>
          </Link>
        </li>
        <li>
          <Link href="/Advertisement-Management">
            <span
              className={`flex items-center gap-2 px-2 py-1 rounded ${
                pathname === '/Advertisement-Management'
                  ? 'bg-[#f8b602] text-white'
                  : 'hover:bg-[#f8b602] hover:text-white'
              }`}
            >
              <FaAd /> Advertisement Management
            </span>
          </Link>
        </li>
        <li>
          <Link href="/Vehicle-Management">
            <span
              className={`flex items-center gap-2 px-2 py-1 rounded ${
                pathname === '/Vehicle-Management'
                  ? 'bg-[#f8b602] text-white'
                  : 'hover:bg-[#f8b602] hover:text-white'
              }`}
            >
              <FaCar /> Vehicle Management
            </span>
          </Link>
        </li>
        <li>
          <Link href="/Notification-Management">
            <span
              className={`flex items-center gap-2 px-2 py-1 rounded ${
                pathname === '/Notification-Management'
                  ? 'bg-[#f8b602] text-white'
                  : 'hover:bg-[#f8b602] hover:text-white'
              }`}
            >
              <FaBell /> Notification Management
            </span>
          </Link>
        </li>
        <li>
          <Link href="/Accessories">
            <span
              className={`flex items-center gap-2 px-2 py-1 rounded ${
                pathname === '/Accessories'
                  ? 'bg-[#f8b602] text-white'
                  : 'hover:bg-[#f8b602] hover:text-white'
              }`}
            >
              <FaCogs /> Accessories
            </span>
          </Link>
        </li>
        <li>
          <Link href="/">
            <span
              className={`flex items-center gap-2 px-2 py-1 rounded ${
                pathname === '/'
                  ? 'bg-[#f8b602] text-white'
                  : 'hover:bg-[#f8b602] hover:text-white'
              }`}
            >
              <FaClipboard /> Vas
            </span>
          </Link>
        </li>
        <li>
          <Link href="/user-management">
            <span
              className={`flex items-center gap-2 px-2 py-1 rounded ${
                pathname === '/user-management'
                  ? 'bg-[#f8b602] text-white'
                  : 'hover:bg-[#f8b602] hover:text-white'
              }`}
            >
              <FaUsers /> User Management
            </span>
          </Link>
        </li>









        {/* <li>
          <Link href="/Input">
            <span
              className={`flex items-center gap-2 px-2 py-1 rounded ${
                pathname === '/Input'
                  ? 'bg-[#f8b602] text-white'
                  : 'hover:bg-[#f8b602] hover:text-white'
              }`}
            >
              <FaUsers /> Input
            </span>
          </Link>
        </li> */}









       
        <Dropdown title="Input" items={inputDropdownItems} basePath="/Input" />




      </ul>
    </div>
  );
};

export default Sidebar;
