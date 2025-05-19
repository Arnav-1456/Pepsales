import React, { useState } from 'react';
import { User, NotificationType } from '../types';
import { Mail, MessageSquare, Bell } from 'lucide-react';

interface NotificationFormProps {
  users: User[];
  onSendNotification: (userId: string, type: NotificationType, title: string, content: string) => void;
}

const NotificationForm: React.FC<NotificationFormProps> = ({ users, onSendNotification }) => {
  const [userId, setUserId] = useState<string>(users[0]?.id || '');
  const [type, setType] = useState<NotificationType>('in-app');
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userId || !title || !content) return;
    
    onSendNotification(userId, type, title, content);
    
    // Reset form
    setTitle('');
    setContent('');
    
    // Show success message
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <h2 className="text-xl font-semibold mb-4">Send Notification</h2>
      
      {showSuccess && (
        <div className="bg-green-100 text-green-700 p-3 rounded-md mb-4 flex items-center gap-2 animate-fade-in">
          <CheckCircleIcon />
          <span>Notification queued successfully!</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Recipient</label>
          <select
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            required
          >
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.email})
              </option>
            ))}
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Notification Type</label>
          <div className="flex gap-2">
            <TypeButton 
              type="in-app" 
              currentType={type} 
              icon={<Bell size={18} />}
              onChange={setType} 
            />
            <TypeButton 
              type="email" 
              currentType={type} 
              icon={<Mail size={18} />}
              onChange={setType} 
            />
            <TypeButton 
              type="sms" 
              currentType={type} 
              icon={<MessageSquare size={18} />}
              onChange={setType} 
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="Notification title"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none min-h-[100px]"
            placeholder="Write your notification content here..."
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Send Notification
        </button>
      </form>
    </div>
  );
};

interface TypeButtonProps {
  type: NotificationType;
  currentType: string;
  icon: React.ReactNode;
  onChange: (type: NotificationType) => void;
}

const TypeButton: React.FC<TypeButtonProps> = ({ type, currentType, icon, onChange }) => {
  const isActive = type === currentType;
  const baseClasses = "flex-1 flex items-center justify-center gap-1 py-2 px-3 border rounded-md text-sm font-medium transition-all";
  const activeClasses = "bg-indigo-100 border-indigo-300 text-indigo-700";
  const inactiveClasses = "bg-white border-gray-300 text-gray-700 hover:bg-gray-50";
  
  return (
    <button
      type="button"
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
      onClick={() => onChange(type)}
    >
      {icon}
      <span className="capitalize">{type}</span>
    </button>
  );
};

// CheckCircle icon component
const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

export default NotificationForm;