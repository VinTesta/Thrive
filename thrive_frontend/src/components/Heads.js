import React from 'react';
import headerImage from '../assets/thriveArt2.png'; // Adjust the path according to your project structure


const Header = () => {
  return (
    <header className="h-auto flex justify-between items-center ml-40">
      {/* Your other header content */}
      <img src={headerImage} alt="Thrive Logo" className="h-20 w-auto" />

    </header>
  );
};

export default Header;