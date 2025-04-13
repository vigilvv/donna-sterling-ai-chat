
import React from 'react';

const SterlingLogo: React.FC = () => {
  return (
    <div className="flex items-center space-x-2">
      <div className="flex flex-col items-center justify-center bg-gradient-to-r from-purple-600 to-purple-800 w-10 h-10 rounded-md text-white font-bold">
        <span className="text-xs">SI</span>
      </div>
      <div className="font-semibold text-lg text-gray-900">
        Sterling Intelligence
      </div>
    </div>
  );
};

export default SterlingLogo;
