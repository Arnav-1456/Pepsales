import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import NotificationForm from './components/NotificationForm';
import NotificationList from './components/NotificationList';
import UserSelect from './components/UserSelect';
import NotificationFilters from './components/NotificationFilters';
import Dashboard from './components/Dashboard';
import notificationService from './services/notificationService';
import { User, Notification, NotificationType } from './types';
import { RefreshCw } from 'lucide-react';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [userNotifications, setUserNotifications] = useState<Notification[]>([]);
  const [allNotifications, setAllNotifications] = useState<Notification[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [refreshKey, setRefreshKey] = useState<number>(0);

  // Initial data fetch
  useEffect(() => {
    const fetchUsers = () => {
      const users = notificationService.getUsers();
      setUsers(users);
      
      if (users.length > 0 && !selectedUserId) {
        setSelectedUserId(users[0].id);
      }
    };

    fetchUsers();

    // Clean up notification service on unmount
    return () => {
      notificationService.cleanup();
    };
  }, []);

  // Fetch notifications when selected user changes or after refreshing
  useEffect(() => {
    if (selectedUserId) {
      const userNotifications = notificationService.getUserNotifications(selectedUserId);
      setUserNotifications(userNotifications);
    }
    
    const allNotifications = notificationService.getNotifications();
    setAllNotifications(allNotifications);
    
    // Set up periodic refresh - every 2 seconds
    const intervalId = setInterval(() => {
      if (selectedUserId) {
        const userNotifications = notificationService.getUserNotifications(selectedUserId);
        setUserNotifications(userNotifications);
      }
      
      const allNotifications = notificationService.getNotifications();
      setAllNotifications(allNotifications);
    }, 2000);
    
    return () => clearInterval(intervalId);
  }, [selectedUserId, refreshKey]);

  const handleUserChange = (userId: string) => {
    setSelectedUserId(userId);
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  const handleSendNotification = (
    userId: string,
    type: NotificationType,
    title: string,
    content: string
  ) => {
    notificationService.sendNotification(userId, type, title, content);
    // Trigger a refresh
    setRefreshKey(prev => prev + 1);
  };

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Dashboard */}
          <div className="lg:col-span-2 space-y-6">
            <Dashboard notifications={allNotifications} />
            
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">User Notifications</h2>
                <button 
                  onClick={handleRefresh}
                  className="flex items-center text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                >
                  <RefreshCw size={16} className="mr-1" />
                  Refresh
                </button>
              </div>
              
              <UserSelect 
                users={users} 
                selectedUserId={selectedUserId} 
                onUserChange={handleUserChange} 
              />
              
              <NotificationFilters 
                activeFilter={activeFilter} 
                onFilterChange={handleFilterChange} 
              />
              
              <NotificationList 
                notifications={userNotifications} 
                filterType={activeFilter === 'all' ? undefined : activeFilter} 
              />
            </div>
          </div>
          
          {/* Right column - Send notification form */}
          <div>
            <NotificationForm 
              users={users} 
              onSendNotification={handleSendNotification} 
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;