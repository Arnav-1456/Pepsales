import { User, Notification, NotificationType, NotificationStatus } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+0987654321',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    phone: '+1122334455',
  },
];

export const generateMockNotifications = (): Notification[] => {
  const notificationTypes: NotificationType[] = ['email', 'sms', 'in-app'];
  const notificationStatuses: NotificationStatus[] = ['queued', 'sent', 'delivered', 'failed', 'retry'];
  
  const notifications: Notification[] = [];
  
  // Generate 5 random notifications for each user
  mockUsers.forEach(user => {
    for (let i = 0; i < 5; i++) {
      const type = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
      const status = notificationStatuses[Math.floor(Math.random() * notificationStatuses.length)];
      const daysAgo = Math.floor(Math.random() * 7);
      const createdAt = new Date();
      createdAt.setDate(createdAt.getDate() - daysAgo);
      
      notifications.push({
        id: `${user.id}-${i}`,
        userId: user.id,
        type,
        title: `Notification ${i + 1}`,
        content: `This is a ${type} notification for ${user.name}`,
        status,
        createdAt,
        updatedAt: new Date(),
        retryCount: status === 'retry' ? Math.floor(Math.random() * 3) + 1 : undefined,
      });
    }
  });
  
  return notifications;
};

export const mockNotifications = generateMockNotifications();