import React from 'react';
import type { UserAvatarProps } from '../../types/propsTypes';

const UserAvatar: React.FC<UserAvatarProps> = ({ name, email, imageUrl, isActive }) => {
  const getInitials = (fullName: string) => {
    return fullName
      .split(' ')
      .map(name => name.charAt(0))
      .join('')
      .toUpperCase();
  };

  return (
    <div className="flex items-center space-x-4 mb-8">
      <div className="relative">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-20 h-20 rounded-lg object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.nextElementSibling?.classList.remove('hidden');
            }}
          />
        ) : null}
      </div>
      
      <div>
        <h3 className="text-xl font-semibold text-gray-900 font-sans">{name}</h3>
        <p className="text-gray-600 font-sans">{email}</p>
        <div className="flex items-center mt-1">
          <span
            className={`inline-block w-2 h-2 rounded-full mr-2 ${
              isActive ? 'bg-green-500' : 'bg-gray-400'
            }`}
          ></span>
          <span className="text-sm text-gray-500 font-sans">
            {isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserAvatar;
