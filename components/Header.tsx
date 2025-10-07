import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white/30 backdrop-blur-lg z-10 flex items-center justify-center">
      <h1 className="text-xl font-bold text-gray-800">Operation Saves</h1>
    </header>
  );
};

export default Header;