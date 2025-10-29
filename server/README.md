# StudyNotion Server

This is the backend server for StudyNotion, a comprehensive EdTech platform. The server is built using Node.js and Express.js, featuring a robust architecture with MongoDB as the database.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Server Configuration](#server-configuration)
- [API Routes](#api-routes)
- [Database Models](#database-models)
- [Middlewares](#middlewares)
- [Controllers](#controllers)
- [Utils](#utils)
- [Configuration](#configuration)

## Tech Stack

- Node.js
- Express.js
- MongoDB (with Mongoose)
- JWT for Authentication
- Bcrypt for Password Hashing
- Express-fileupload for File Handling
- Cloudinary for Media Storage
- Nodemailer for Email Services
- Razorpay for Payment Integration

## Server Configuration

The server is configured in `index.js` with the following key features:

- Cross-Origin Resource Sharing (CORS) enabled
- JSON body parsing
- Cookie parsing
- File upload handling
- Database connection
- Cloudinary configuration
- Environment variables support

## API Routes

### 1. Auth Routes (`/api/v1/auth`)
- `POST /signup` - Register new user
- `POST /login` - User login
- `POST /sendotp` - Send OTP for verification
- `POST /reset-password-token` - Request password reset
- `POST /reset-password` - Reset password
- `POST /changepassword` - Change password (Auth required)

### 2. Profile Routes (`/api/v1/profile`)
- `DELETE /deleteProfile` - Delete user account
- `GET /getUserDetails` - Get user information
- `PUT /updateProfile` - Update profile details
- `PUT /updateDisplayPicture` - Update profile picture
- `GET /getEnrolledCourses` - Get user's enrolled courses
- `GET /getInstructorDashboardDetails` - Get instructor dashboard
- `GET /getAdminPanelDetails` - Get admin panel details
- `GET /getInstructorsDetails` - Get all instructors' details
- `POST /addToCart` - Add course to cart
- `PUT /removeFromCart` - Remove course from cart
- `GET /getCartData` - Get cart details
- `PUT /resetCartData` - Reset cart

### 3. Course Routes (`/api/v1/course`)
- `POST /createCourse` - Create new course
- `POST /editCourse` - Edit existing course
- `GET /getAllCourses` - Get all courses
- `POST /getCourseDetails` - Get course details
- `GET /getInstructorCourses` - Get instructor's courses
- `POST /getFullCourseDetails` - Get complete course details
- `DELETE /deleteCourse` - Delete course
- `POST /updateCourseProgress` - Update course progress
- `POST /searchCourse` - Search courses

#### Category Related:
- `POST /createCategory` - Create course category
- `GET /showAllCategories` - Show all categories
- `POST /getCategoryPageDetails` - Get category page details

#### Section and Subsection:
- `POST /addSection` - Add course section
- `POST /updateSection` - Update section
- `POST /deleteSection` - Delete section
- `POST /addSubSection` - Add subsection
- `POST /updateSubSection` - Update subsection
- `POST /deleteSubSection` - Delete subsection

#### Ratings and Reviews:
- `POST /createRating` - Create course rating
- `GET /getAverageRating` - Get course average rating
- `GET /getAllRating` - Get all course ratings

### 4. Payment Routes (`/api/v1/payment`)
- `POST /capturePayment` - Initialize payment
- `POST /verifyPayment` - Verify payment
- `POST /sendPaymentSuccessEmail` - Send payment confirmation

### 5. Contact Routes (`/api/v1/contact`)
- `POST /contactUs` - Send contact form

## Database Models

### 1. User Model
- Account details (name, email, password)
- Account type (Student, Instructor, Admin)
- Course enrollments
- Course progress
- Additional details (Profile) reference
- Token details

### 2. Course Model
- Course information (name, description, price, status)
- Instructor reference
- Course content structure
- Student enrollments reference
- Ratings and reviews
- Category reference

### 3. Category Model
- Name and description
- Course references

### 4. Section & Subsection Models
- Course content organization (section & sub-section name)
- Video/content url
- Duration tracking

### 5. Profile Model
- User information (gender, dob, about, contact)

### 6. Rating & Review Model
- User references
- Course ratings
- User reviews
- Course references

### 7. Course Progress Model
- Course references
- User references
- Completed lectures tracking

### 8. Cart Model
- User reference
- Cart items (Course references)

## Middlewares

1. **Authentication Middleware**
   - JWT verification
   - User role validation
   - Protected route handling

2. **Role-based Authorization**
   - `isStudent` - Student access control
   - `isInstructor` - Instructor access control
   - `isAdmin` - Admin access control

## Controllers

1. **Auth Controller**
   - Signup & Login
   - Password management
   - OTP handling

2. **Course Controller**
   - Course CRUD operations
   - Search courses 
   - Get Instructor Courses
   - Progress tracking

3. **Profile Controller**
   - Profile management
   - Instructor & Admin Dashboard data
   - Account settings
   - Reset password

4. **Payment Controller**
   - Payment processing
   - Order management
   - Payment verification

5. **Category Controller**
   - Category management
   - Course categorization

6. **Cart Controller**
   - Cart CRUD operations

7. **Rating & Reviews Controller**
   - Create rating
   - Get all rating & average rating

8. **Section & Sub-section Controller**
   - Section CRUD operations
   - Sub-Section CRUD operations

## Utils

1. **File Uploader**
   - Cloudinary integration
   - File management

2. **Mail Sender**
   - Email notifications
   - Template management

3. **Duration Converter**
   - Time format utilities

## Configuration

1. **Cloudinary Config**
   - Media storage settings
   - Upload configurations

2. **Database Config**
   - MongoDB connection
   - Mongoose settings

3. **Razorpay Config**
   - Payment gateway setup

## Environment Variables

Required environment variables in `.env`:

```env
PORT=4000
MONGODB_URL=your_mongodb_url
JWT_SECRET=your_jwt_secret
MAIL_HOST=your_mail_host
MAIL_USER=your_mail_user
MAIL_PASS=your_mail_password
CLOUD_NAME=your_cloudinary_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
RAZORPAY_KEY=your_razorpay_key
RAZORPAY_SECRET=your_razorpay_secret
```