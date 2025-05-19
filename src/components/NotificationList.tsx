import React from 'react';
import { Notification } from '../types';
import NotificationItem from './NotificationItem';

interface NotificationListProps {
  notifications: Notification[];
  filterType?: string;
}

const NotificationList: React.FC<NotificationListProps> = ({ 
  notifications, 
  filterType = 'all' 
}) => {
  const filteredNotifications = filterType === 'all' 
    ? notifications 
    : notifications.filter(notification => notification.type === filterType);

  return (
    <div className="space-y-2">
      {filteredNotifications.length === 0 ? (
        <div className="bg-gray-50 p-8 rounded-lg text-center">
          <p className="text-gray-500">No notifications found</p>
        </div>
      ) : (
        filteredNotifications.map(notification => (
          <NotificationItem key={notification.id} notification={notification} />
        ))
      )}
    </div>
  );
};

export default NotificationList;