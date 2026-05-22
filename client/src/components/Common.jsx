import React from 'react';

export const ProgressBar = ({ completed, total }) => {
  const percentage = total > 0 ? (completed / total) * 100 : 0;

  return (
    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
      <div
        className="bg-secondary h-full transition-all duration-500 ease-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition ${className}`}>
      {children}
    </div>
  );
};

export const Button = ({ children, primary = false, className = '', ...props }) => {
  const baseStyle = 'px-4 py-2 rounded-lg font-semibold transition';
  const style = primary 
    ? `${baseStyle} bg-primary text-white hover:bg-blue-600`
    : `${baseStyle} bg-light text-dark hover:bg-gray-300`;
  
  return (
    <button className={`${style} ${className}`} {...props}>
      {children}
    </button>
  );
};

export const Badge = ({ children, type = 'default' }) => {
  const colors = {
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
    default: 'bg-gray-100 text-gray-800'
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${colors[type]}`}>
      {children}
    </span>
  );
};
