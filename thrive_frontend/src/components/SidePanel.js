import React, { useState } from 'react';

const SidePanelButton = ({ children, panelContent }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openPanel = () => {
    setIsOpen(true);
  };

  const closePanel = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button
        onClick={openPanel}
        className="w-1/5 select-none rounded-sm text-[#f0f0f0] text-xl mt-4 ml-2 mr-2 mb-4 p-2 bg-[#191970] transition-all hover:opacity-90 hover:bg-[#c6c6c6] hover:text-[#191970] active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      >
        {children}
      </button>
      {isOpen && (
        <div className="fixed inset-0 overflow-hidden z-50">
          <div className="absolute inset-0 bg-gray-500 opacity-50"></div>
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl z-50">
            <div className="p-4">
              <button
                onClick={closePanel}
                className="absolute top-0 right-0 m-2 p-2 rounded-full hover:bg-gray-200 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              {panelContent}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SidePanelButton;