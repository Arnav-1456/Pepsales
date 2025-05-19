import React, { useState, useEffect } from 'react';
import { User, Notification, NotificationType } from '../types';

interface DashboardProps {
  notifications: Notification[];
}

const Dashboard: React.FC<DashboardProps> = ({ notifications }) => {
  const [stats, setStats] = useState({
    total: 0,
    byType: { email: 0, sms: 0, 'in-app': 0 },
    byStatus: { queued: 0, sent: 0, delivered: 0, failed: 0, retry: 0 }
  });

  useEffect(() => {
    // Calculate statistics
    const byType = { email: 0, sms: 0, 'in-app': 0 };
    const byStatus = { queued: 0, sent: 0, delivered: 0, failed: 0, retry: 0 };
    
    notifications.forEach(notification => {
      byType[notification.type]++;
      byStatus[notification.status]++;
    });
    
    setStats({
      total: notifications.length,
      byType,
      byStatus
    });
  }, [notifications]);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <h2 className="text-xl font-semibold mb-4">Notification Stats</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatCard 
          title="Total Notifications" 
          value={stats.total} 
          color="bg-indigo-100 text-indigo-800" 
        />
        
        <StatCard 
          title="Delivered" 
          value={stats.byStatus.delivered} 
          color="bg-green-100 text-green-800" 
        />
        
        <StatCard 
          title="Failed" 
          value={stats.byStatus.failed + stats.byStatus.retry} 
          color="bg-red-100 text-red-800" 
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium mb-3">By Type</h3>
          <div className="space-y-2">
            <ProgressBar 
              label="Email" 
              value={stats.byType.email} 
              max={stats.total} 
              color="bg-indigo-600" 
            />
            <ProgressBar 
              label="SMS" 
              value={stats.byType.sms} 
              max={stats.total} 
              color="bg-teal-600" 
            />
            <ProgressBar 
              label="In-App" 
              value={stats.byType['in-app']} 
              max={stats.total} 
              color="bg-amber-600" 
            />
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">By Status</h3>
          <div className="space-y-2">
            <ProgressBar 
              label="Queued" 
              value={stats.byStatus.queued} 
              max={stats.total} 
              color="bg-yellow-500" 
            />
            <ProgressBar 
              label="Sent" 
              value={stats.byStatus.sent} 
              max={stats.total} 
              color="bg-blue-500" 
            />
            <ProgressBar 
              label="Delivered" 
              value={stats.byStatus.delivered} 
              max={stats.total} 
              color="bg-green-500" 
            />
            <ProgressBar 
              label="Failed" 
              value={stats.byStatus.failed} 
              max={stats.total} 
              color="bg-red-500" 
            />
            <ProgressBar 
              label="Retry" 
              value={stats.byStatus.retry} 
              max={stats.total} 
              color="bg-purple-500" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: number;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, color }) => {
  return (
    <div className={`p-4 rounded-lg ${color}`}>
      <p className="text-sm font-medium mb-1">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};

interface ProgressBarProps {
  label: string;
  value: number;
  max: number;
  color: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ label, value, max, color }) => {
  const percentage = max > 0 ? (value / max) * 100 : 0;
  
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span>{label}</span>
        <span>{value} ({max > 0 ? Math.round(percentage) : 0}%)</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${color}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Dashboard;