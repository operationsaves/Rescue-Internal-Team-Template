
import React from 'react';
import type { Page } from '../types';

interface FooterNavProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

interface NavItemProps {
  icon: string;
  label: string;
  page: Page;
  isActive: boolean;
  onClick: (page: Page) => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, page, isActive, onClick }) => {
  const activeClasses = 'text-blue-600';
  const inactiveClasses = 'text-gray-500';

  return (
    <button
      onClick={() => onClick(page)}
      className={`flex flex-col items-center justify-center w-full transition-colors duration-200 ease-in-out ${isActive ? activeClasses : inactiveClasses}`}
    >
      <span className="text-2xl">{icon}</span>
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
};

const FooterNav: React.FC<FooterNavProps> = ({ currentPage, setCurrentPage }) => {
  const navItems: { icon: string; label: string; page: Page }[] = [
    { icon: '🏠', label: 'Home', page: 'home' },
    { icon: '📄', label: 'Workflow', page: 'workflow' },
    { icon: '🔗', label: 'Resources', page: 'resources' },
    { icon: '💬', label: 'AI Chat', page: 'chat' },
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 h-20 bg-white/70 backdrop-blur-lg border-t border-gray-200 z-10">
      <nav className="flex items-center justify-around h-full px-2">
        {navItems.map((item) => (
          <NavItem
            key={item.page}
            {...item}
            isActive={currentPage === item.page}
            onClick={setCurrentPage}
          />
        ))}
      </nav>
    </footer>
  );
};

export default FooterNav;
