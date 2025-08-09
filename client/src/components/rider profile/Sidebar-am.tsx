import React from 'react';
import type { SidebarProps } from '../../types/propsTypes';

const Sidebar: React.FC<SidebarProps> = ({ activeItem }) => {
  const menuItems = [
    { id: 'profile', label: 'Profile Information', href: '#' },
    { id: 'notifications', label: 'Notifications', href: '#' },
    { id: 'availability', label: 'Availability Schedule', href: '#' },
    { id: 'security', label: 'Security & Verification', href: '#' },
  ];

  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <nav className="space-y-2 ">
          {menuItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={`block w-full text-left px-4 py-3 rounded-md transition-colors font-sans ${
                activeItem === item.id
                  ? 'text-white font-sans'
                  : 'hover:bg-gray-100'
              }`}
              style={activeItem === item.id ? { backgroundColor: '#4318D1' } : { color: '#666666' }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
