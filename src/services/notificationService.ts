import { Notification, NotificationType, User } from '../types';
import { mockNotifications, mockUsers } from '../data/mockData';

class NotificationService {
  private notifications: Notification[] = [...mockNotifications];
  private users: User[] = [...mockUsers];
  private queueProcessor: NodeJS.Timeout | null = null;

  constructor() {
    // Start the queue processor when the service is initialized
    this.startQueueProcessor();
  }

  private startQueueProcessor() {
    // Process the queue every 2 seconds
    this.queueProcessor = setInterval(() => {
      this.processNotificationQueue();
    }, 2000);
  }

  private processNotificationQueue() {
    // Process queued notifications
    const queuedNotifications = this.notifications.filter(n => n.status === 'queued');
    
    queuedNotifications.forEach(notification => {
      // Simulate processing delay
      setTimeout(() => {
        // 80% chance of success, 20% chance of failure
        const success = Math.random() < 0.8;
        
        if (success) {
          this.updateNotificationStatus(notification.id, 'sent');
          
          // After a delay, mark as delivered
          setTimeout(() => {
            this.updateNotificationStatus(notification.id, 'delivered');
          }, 1500);
        } else {
          this.updateNotificationStatus(notification.id, 'failed');
          
          // If retries are left, queue for retry
          if (!notification.retryCount || notification.retryCount < 3) {
            setTimeout(() => {
              this.retryNotification(notification.id);
            }, 3000);
          }
        }
      }, Math.random() * 1000);
    });
  }

  private updateNotificationStatus(id: string, status: 'queued' | 'sent' | 'delivered' | 'failed' | 'retry') {
    const index = this.notifications.findIndex(n => n.id === id);
    if (index !== -1) {
      this.notifications[index] = {
        ...this.notifications[index],
        status,
        updatedAt: new Date(),
      };
    }
  }

  private retryNotification(id: string) {
    const index = this.notifications.findIndex(n => n.id === id);
    if (index !== -1) {
      const retryCount = this.notifications[index].retryCount || 0;
      this.notifications[index] = {
        ...this.notifications[index],
        status: 'retry',
        retryCount: retryCount + 1,
        updatedAt: new Date(),
      };
      
      // After a delay, set back to queued
      setTimeout(() => {
        this.updateNotificationStatus(id, 'queued');
      }, 1000);
    }
  }

  getUsers(): User[] {
    return this.users;
  }

  getUserById(id: string): User | undefined {
    return this.users.find(user => user.id === id);
  }

  getNotifications(): Notification[] {
    return this.notifications;
  }

  getUserNotifications(userId: string): Notification[] {
    return this.notifications
      .filter(notification => notification.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  sendNotification(
    userId: string,
    type: NotificationType,
    title: string,
    content: string
  ): Notification {
    const newNotification: Notification = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      userId,
      type,
      title,
      content,
      status: 'queued',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.notifications.push(newNotification);
    return newNotification;
  }

  cleanup() {
    if (this.queueProcessor) {
      clearInterval(this.queueProcessor);
    }
  }
}

// Create a singleton instance
const notificationService = new NotificationService();

export default notificationService;