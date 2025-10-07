
import React from 'react';
import Header from './Header';
import FooterNav from './FooterNav';
import type { Page } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPage, setCurrentPage }) => {
  return (
    <div className="flex flex-col h-screen font-sans">
      <Header />
      <main className="flex-1 overflow-y-auto pb-24 pt-16 bg-gradient-to-br from-gray-50 to-blue-100 scrollbar-hide">
        <div className="p-4">
          {children}
        </div>
      </main>
      <FooterNav currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default Layout;
