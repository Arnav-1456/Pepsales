import React from 'react';
import { Mail, MessageSquare, Bell, RefreshCw } from 'lucide-react';

interface NotificationFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const NotificationFilters: React.FC<NotificationFiltersProps> = ({
  activeFilter,
  onFilterChange,
}) => {
  const filters = [
    { id: 'all', label: 'All', icon: null },
    { id: 'email', label: 'Email', icon: <Mail size={16} /> },
    { id: 'sms', label: 'SMS', icon: <MessageSquare size={16} /> },
    { id: 'in-app', label: 'In-App', icon: <Bell size={16} /> },
  ];

  return (
    <div className="flex items-center space-x-2 mb-4 overflow-x-auto pb-1">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            activeFilter === filter.id
              ? 'bg-indigo-100 text-indigo-800'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {filter.icon && <span className="mr-1.5">{filter.icon}</span>}
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default NotificationFilters;