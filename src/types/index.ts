export type NotificationType = 'email' | 'sms' | 'in-app';

export type NotificationStatus = 'queued' | 'sent' | 'delivered' | 'failed' | 'retry';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  content: string;
  status: NotificationStatus;
  createdAt: Date;
  updatedAt: Date;
  retryCount?: number;
}

export interface NotificationStats {
  total: number;
  sent: number;
  delivered: number;
  failed: number;
  retry: number;
}