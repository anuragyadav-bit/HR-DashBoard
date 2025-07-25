﻿### HR-DashBoard

 ## Setup instructions:- 
 
# 1. Create Next.js Project

npx create-next-app@latest hr-dashboard --javascript --tailwind --eslint --app --src-dir=false --import-alias="@/*"
cd hr-dashboard

## 2. Install Required Dependencies

# UI Components & Styling
npm install @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-label @radix-ui/react-progress @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slot @radix-ui/react-tabs @radix-ui/react-toast

# Utility Libraries
npm install clsx tailwind-merge class-variance-authority

# Form Handling & Validation
npm install react-hook-form @hookform/resolvers zod

# Charts & Visualization
npm install recharts

# Icons & Theme
npm install lucide-react next-themes

# Additional Tailwind Plugin
npm install tailwindcss-animate

# Run the Application
npm run dev

## 🎯 Key Features Breakdown

## Dashboard Features
- **Employee Cards**: Display employee information with performance ratings
- **Quick Actions**: View, bookmark, and promote employees directly from cards
- **Real-time Search**: Filter employees by name, email, or department
- **Multi-select Filters**: Filter by department and performance rating
- **Responsive Grid**: Adapts to different screen sizes

## Employee Management
- **Detailed Profiles**: Comprehensive employee information
- **Tabbed Interface**: Overview, Projects, and Feedback sections
- **Performance History**: Visual representation of performance over time
- **Project Tracking**: Current projects with status and completion percentage
- **Feedback System**: Add and view employee feedback

## Analytics & Insights
- **Key Metrics**: Total employees, average rating, bookmarks, top performers
- **Department Performance**: Bar chart showing average ratings by department
- **Bookmark Trends**: Line chart showing bookmark activity over time
- **Department Distribution**: Pie chart showing employee distribution

## Form & Validation
- **Comprehensive Form**: All employee information in organized sections
- **Real-time Validation**: Zod schema validation with error messages
- **Auto-save Drafts**: Prevent data loss with form persistence
- **Smart Defaults**: Pre-filled values for better UX

## Technical Features
- **🌙 Dark/Light Mode** - Complete theme switching with system preference detection
- **📱 Responsive Design** - Mobile-first approach that works on all devices
- **💾 Data Persistence** - Local storage for bookmarks and employee data
- **🔄 Real-time Updates** - Instant UI updates with optimistic rendering
- **♿ Accessibility** - ARIA labels, keyboard navigation, screen reader support
- **🎨 Modern UI** - Built with shadcn/ui components and Tailwind CSS

## 📸 Screenshots
DashBoard :-   <img width="1901" height="960" alt="Screenshot 2025-07-20 124527" src="https://github.com/user-attachments/assets/eccf1b24-cb2d-4f5f-b541-5b4a79b67325" />

Bookmarks:-    <img width="1890" height="960" alt="Screenshot 2025-07-20 124604" src="https://github.com/user-attachments/assets/d44b979c-e77e-4342-bb49-63fe6932dfea" />

Analytics:-    <img width="1884" height="984" alt="Screenshot 2025-07-20 124744" src="https://github.com/user-attachments/assets/5b0f7616-ebec-4e92-ac7a-4698c992e787" />
               <img width="1878" height="955" alt="Screenshot 2025-07-20 124801" src="https://github.com/user-attachments/assets/f6cdd46b-9206-4d44-9b40-234cb215f395" />

Add Employee:- <img width="1917" height="1079" alt="Screenshot 2025-07-20 125247" src="https://github.com/user-attachments/assets/2302c5ec-b91f-429c-9960-a77f066f826d" />








