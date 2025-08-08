import React from 'react';
import type { ProfileFieldProps } from '../../types/propsTypes';

const ProfileField: React.FC<ProfileFieldProps> = ({ label, value, showEdit = true, showNote, customValueColor }) => {
  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-200 last:border-b-0">
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1 font-sans">
          {label}
        </label>
        <span
          className="font-sans"
          style={{ color: customValueColor || '#666666' }}
        >
          {value}
        </span>
      </div>
      {showEdit ? (
        <a href="#" className="font-medium text-sm font-sans" style={{ color: '#4318D1' }}>
          Edit
        </a>
      ) : (
        <span className="text-gray-500 text-sm font-sans">
          {showNote}
        </span>
      )}
    </div>
  );
};

export default ProfileField;
