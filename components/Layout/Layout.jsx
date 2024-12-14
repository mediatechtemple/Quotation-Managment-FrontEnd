'use client';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

export default function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header toggleSidebar={toggleSidebar} />

      {pathname === '/login' ? (
        <div
          style={{ backgroundColor: '#f5f5f5' }}
          className={` bg-["#f5f5f5"] flex-1 p-4`}
        >
          {children}
        </div>
      ) : (
        <div className="flex flex-1 pt-16">
          {/* Sidebar */}
          <Sidebar isSidebarOpen={isSidebarOpen} />

          {/* Main Content */}
          <div
            style={{ backgroundColor: '#f5f5f5' }}
            className={`bg-["#f5f5f5"] flex-1 p-4 transition-all duration-300 ${
              isSidebarOpen ? 'ml-64' : 'ml-0'
            } max-w-full overflow-hidden`}
          >
            {children}
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
