# StudyNotion Ed-Tech Learning Platform

StudyNotion is a comprehensive ed-tech platform built using the MERN stack. This repository contains both the frontend and backend code for the platform.

# Frontend Documentation

This is the frontend client for StudyNotion, built using React.js, featuring a modern and responsive design with Redux for state management.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Components](#components)
- [Pages](#pages)
- [State Management](#state-management)
- [Services](#services)
- [Utils](#utils)
- [Data](#data)
- [Features](#features)

## Tech Stack

- React.js
- Redux Toolkit for State Management
- React Router for Navigation
- Tailwind CSS for Styling
- Axios for API Integration
- React Hot Toast for Notifications
- Chart.js for Data Visualization
- React Rating Stars for Ratings
- React Type Animation
- Video React Player

## Project Structure

The frontend application follows a well-organized structure:

```
src/
├── assets/           # Static assets (images, logos)
├── components/       # Reusable UI components
├── data/            # Static data and configurations
├── hooks/           # Custom React hooks
├── pages/           # Main application pages
├── reducer/         # Redux reducers
├── services/        # API services and operations
├── slices/          # Redux slices
└── utils/           # Utility functions
```

## Components

1. **Common Components (`/components/common`)**
    - `NavBar` - Main navigation bar
    - `Footer` - Site footer
    - `IconBtn` - Reusable icon button
    - `ConfirmationModal` - Confirmation dialog
    - `RatingStars` - Star rating component
    - `Tab` - Tab navigation component

2. **Core Components (`/components/core`)**

#### Authentication (`/core/Auth`)
- `LoginForm` - User login form
- `SignupForm` - User registration
- `PrivateRoute` - Protected route wrapper
- `OpenRoute` - Public route wrapper
- `ProfileDropDown` - User profile dropdown

#### Dashboard (`/core/Dashboard`)
- `Sidebar` - Dashboard navigation
- `EnrolledCourses` - User's enrolled courses
- `MyProfile` - User profile management
- `Settings` - Account settings
- `Category` - Account settings
- `Course` - Account settings

#### Course Management
- `AddCourse` - Course creation interface
- `CourseBuilder` - Course content builder
- `EditCourse` - Course editing interface
- `CourseInformation` - Course details display
- `AddCategory` - Category creation interface

#### Admin Features
- `AdminPanel` - Admin dashboard
- `DashboardChart` - Analytics visualization
- `InstructorDashboard` - Instructor dashboard
- `InstructorDetails` - Instructor management

#### Cart Management
- `Cart` - Shopping cart interface
- `RenderCartCourses` - Cart items display
- `RenderTotalAmount` - Price calculation

#### View Course
- `VideoDetails` - Course video player
- `VideoDetailsSidebar` - Content navigation
- `ReviewModal` - Course review interface

## Pages

1. **Authentication Pages**
   - `Login.jsx` - User login
   - `Signup.jsx` - User registration
   - `ForgotPassword.jsx` - Password recovery
   - `ResetPassword.jsx` - Password reset
   - `VerifyEmail.jsx` - Email verification

2. **Main Pages**
   - `Home.jsx` - Landing page
   - `Catalog.jsx` - Course catalog
   - `About.jsx` - About page
   - `ContactUs.jsx` - Contact form

3. **Course Pages**
   - `CourseDetails.jsx` - Course information
   - `ViewCourse.jsx` - Course content viewer
   - `SearchCourse.jsx` - Course search

4. **Dashboard Pages**
   - `Dashboard.jsx` - User dashboard
   - `Error.jsx` - Error handling page

## State Management

**Redux Slices (`/slices`)**
    - `authSlice` - Authentication state
    - `cartSlice` - Shopping cart state
    - `courseSlice` - Course management
    - `profileSlice` - User profile data
    - `viewCourseSlice` - Course viewing state

## Services

1. **API Operations (`/services/operations`)**
    - `authAPI` - Authentication operations
    - `courseDetailsAPI` - Course data handling
    - `profileAPI` - Profile management
    - `studentFeaturesAPI` - Student-specific features

2. **API Configuration*
    - `apiConnector` - Axios instance setup
    - `apis` - API endpoint definitions

## Utils

1. **Helper Functions**
    - `avgRating` - Calculate average ratings
    - `formatDate` - Date formatting
    - `secToDuration` - Time format conversion
    - `constants` - Application constants

2. **Custom Hooks**
    - `useOnClickOutside` - Click outside detection

## Data

1. **Static Data**
    - `countrycode.json` - Country codes
    - `dashboard-links` - Dashboard navigation
    - `footer-links` - Footer navigation
    - `homepage-explore` - Homepage content
    - `navbar-links` - Navigation links

## Features

1. **Authentication**
   - Email/Password login
   - OTP verification
   - Password recovery
   - Protected routes

2. **Course Management**
   - Course creation and editing
   - Content organization
   - Video upload and management
   - Progress tracking

3. **User Dashboard**
   - Profile management
   - Course enrollment
   - Progress monitoring
   - Payment history

4. **Shopping Cart**
   - Course addition/removal
   - Payment processing
   - Order confirmation

5. **Admin Features**
   - User management
   - Course approval
   - Category management
   - Analytics dashboard

6. **Instructor Features**
   - Course creation
   - Student management
   - Revenue tracking
   - Course analytics

7. **UI Features**
   - Responsive design
   - Loading animations
   - Toast notifications
   - Interactive charts

## Environment Variables

Required environment variables in `.env`:

```env
REACT_APP_BASE_URL=your_backend_api_url
REACT_APP_RAZORPAY_KEY=your_razorpay_key
```