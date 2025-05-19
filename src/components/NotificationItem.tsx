import React from 'react';
import { Notification } from '../types';
import { Mail, MessageSquare, Bell, CheckCircle, Clock, XCircle, RefreshCw } from 'lucide-react';

interface NotificationItemProps {
  notification: Notification;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'sent':
        return 'bg-blue-100 text-blue-800';
      case 'queued':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'retry':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle size={16} className="text-green-600" />;
      case 'sent':
        return <CheckCircle size={16} className="text-blue-600" />;
      case 'queued':
        return <Clock size={16} className="text-yellow-600" />;
      case 'failed':
        return <XCircle size={16} className="text-red-600" />;
      case 'retry':
        return <RefreshCw size={16} className="text-purple-600" />;
      default:
        return null;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <Mail size={20} className="text-indigo-600" />;
      case 'sms':
        return <MessageSquare size={20} className="text-teal-600" />;
      case 'in-app':
        return <Bell size={20} className="text-amber-600" />;
      default:
        return null;
    }
  };

  const formattedDate = notification.createdAt.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-3 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-gray-100 rounded-full">
          {getTypeIcon(notification.type)}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-medium text-gray-800">{notification.title}</h3>
            <span className="text-xs text-gray-500">{formattedDate}</span>
          </div>
          
          <p className="text-gray-600 text-sm mb-2">{notification.content}</p>
          
          <div className="flex items-center justify-between">
            <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${getStatusColor(notification.status)}`}>
              {getStatusIcon(notification.status)}
              <span className="capitalize">{notification.status}</span>
              {notification.retryCount && notification.status === 'retry' && (
                <span className="ml-1">({notification.retryCount}/3)</span>
              )}
            </span>
            
            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full capitalize">
              {notification.type}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;