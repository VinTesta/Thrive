// Tile.js
import React from 'react';

const Tile = ({ title }) => {
  return (
    <div className="p-4 border border-gray-200 rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
    </div>
  );
};

export default Tile;
