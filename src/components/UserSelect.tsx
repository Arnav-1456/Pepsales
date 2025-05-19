import React from 'react';
import { User } from '../types';

interface UserSelectProps {
  users: User[];
  selectedUserId: string;
  onUserChange: (userId: string) => void;
}

const UserSelect: React.FC<UserSelectProps> = ({ 
  users, 
  selectedUserId, 
  onUserChange 
}) => {
  return (
    <div className="flex items-center space-x-2 mb-4">
      <label htmlFor="user-select" className="text-sm font-medium text-gray-700">
        Select User:
      </label>
      <select
        id="user-select"
        value={selectedUserId}
        onChange={(e) => onUserChange(e.target.value)}
        className="form-select rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      >
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default UserSelect;