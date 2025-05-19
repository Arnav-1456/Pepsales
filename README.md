# Notification Service

A modern notification management system built with React and TypeScript that handles email, SMS, and in-app notifications with real-time status tracking and analytics.

## Features

- 📨 Multi-channel notifications (Email, SMS, In-app)
- 📊 Real-time notification status tracking
- 🔄 Automatic retry mechanism for failed notifications
- 📱 Responsive design for all devices
- 📈 Analytics dashboard with notification metrics
- 🎯 User-specific notification filtering
- ⚡ Real-time queue processing simulation

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Vite
- Lucide React Icons

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── components/        # React components
├── services/         # Business logic and API services
├── types/           # TypeScript type definitions
└── data/            # Mock data for development
```

## Components

- `Dashboard`: Displays notification metrics and analytics
- `NotificationForm`: Form for sending new notifications
- `NotificationList`: Displays notifications with filtering
- `NotificationItem`: Individual notification display
- `UserSelect`: User selection dropdown
- `NotificationFilters`: Filter notifications by type

## Notification Types

- Email: For email-based notifications
- SMS: For text message notifications
- In-app: For application-based notifications

## Notification Statuses

- Queued: Initial state when notification is created
- Sent: Notification has been processed and sent
- Delivered: Notification has been successfully delivered
- Failed: Delivery attempt failed
- Retry: Failed notification queued for retry (up to 3 attempts)

## Development

The project uses a simulated queue system to process notifications:

1. New notifications start in 'queued' status
2. Queue processor runs every 2 seconds
3. 80% success rate simulation for delivery
4. Failed notifications retry up to 3 times
5. Real-time status updates as notifications progress

## Build

To build for production:

```bash
npm run build
```

 