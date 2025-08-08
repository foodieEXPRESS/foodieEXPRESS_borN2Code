import React, { useState } from 'react';
import type { ProfileFieldProps } from '../../types/propsTypes';

const ProfileField: React.FC<ProfileFieldProps> = ({ 
  label, 
  value, 
  showEdit = true, 
  showNote, 
  customValueColor,
  onEdit,
  fieldKey
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (onEdit && fieldKey) {
      onEdit(fieldKey, editValue);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-200 last:border-b-0">
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-900 mb-1 font-sans">
          {label}
        </label>
        {isEditing ? (
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyPress}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent font-sans"
            autoFocus
          />
        ) : (
          <span
            className="font-sans"
            style={{ color: customValueColor || '#666666' }}
          >
            {value}
          </span>
        )}
      </div>
      {showEdit && !isEditing ? (
        <button 
          onClick={handleEdit}
          className="font-medium text-sm font-sans hover:text-purple-700 transition-colors"
          style={{ color: '#4318D1' }}
        >
          Edit
        </button>
      ) : showEdit && isEditing ? (
        <div className="flex space-x-2">
          <button 
            onClick={handleSave}
            className="text-sm font-medium text-green-600 hover:text-green-700 transition-colors"
          >
            Save
          </button>
          <button 
            onClick={handleCancel}
            className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
          >
            Cancel
          </button>
        </div>
      ) : (
        <span className="text-gray-500 text-sm font-sans">
          {showNote}
        </span>
      )}
    </div>
  );
};

export default ProfileField;
