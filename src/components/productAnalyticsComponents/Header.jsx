import React from 'react';

const Header = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-black text-white">
      <div className="text-5xl font-bold ml-3">Dashboard</div>
      <div className="flex space-x-4">
        {/* <button className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700">Copy Code</button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Create Journey</button> */}
      </div>
    </div>
  );
};

export default Header;
