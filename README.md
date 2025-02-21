# ToDo List Application

## Description
A modern and responsive ToDo List application built with React, TailwindCSS, and React Query. This application allows users to add, view, and delete tasks. It integrates with a backend API for task management and provides a seamless user experience with features like form validation, loading states, and error handling.

---

## Live Links
- **Live:** [ToDo List App](https://task-manager-six-murex.vercel.app/)
- **Backend API:** [API Links](https://task-manager-server-seven-pi.vercel.app/)


## Repository
- **Frontend:** [tariqul420/task-management](https://github.com/tariqul420/task-management.git)
- **Backend:** [tariqul420/task-management-server](https://github.com/tariqul420/task-management-server.git)

---

## Features
- Add new tasks with a title, category, and description.
- View all tasks in a responsive grid layout.
- Delete tasks with a confirmation toast.
- Form validation for task inputs.
- Loading skeletons for better user experience during data fetching.
- Error handling for API requests.

---

## Technologies Used
- **Frontend:**
  - React
  - TailwindCSS
  - React Query (for data fetching and state management)
  - React Hook Form (for form handling and validation)
  - React Hot Toast (for notifications)
  - React Icons (for icons)
  - React Loading Skeleton (for loading states)
- **Backend:**
  - Firebase (for authentication and database, if applicable)
  - Axios (for API requests)
- **Build Tool:**
  - Vite (for fast development and production builds)

---

## Dependencies
Here are the key dependencies used in this project:

### Frontend Dependencies
- `@tanstack/react-query`: For data fetching and state management.
- `react-hook-form`: For form handling and validation.
- `react-hot-toast`: For displaying toast notifications.
- `react-icons`: For icons.
- `react-loading-skeleton`: For loading placeholders.
- `tailwindcss`: For styling.
- `axios`: For making HTTP requests.

### Dev Dependencies
- `vite`: For fast development and production builds.
- `eslint`: For code linting.
- `@vitejs/plugin-react`: For React support in Vite.
- `daisyui`: For TailwindCSS components.

---

## Installation Steps
Follow these steps to set up and run the project locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/tariqul420/task-management.git
   cd task-management
   ```
2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
    Create a `.env` file in the root directory and add the following variables:
    ```bash
    VITE_API_BASE_URL=your-api-base-url
    VITE_FIREBASE_API_KEY=your-firebase-api-key
    VITE_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
    VITE_FIREBASE_PROJECT_ID=your-firebase-project-id
    VITE_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
    VITE_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
    VITE_FIREBASE_APP_ID=your-firebase-app-id
    ```

4.  Run the development server:
    ```bash
    npm run dev
    ```

5.  Build for production:
    ```bash
    npm run build
    ```

6. Preview the production build:
    ```bash
    npm run preview
    ```