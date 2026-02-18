# React + Vite Project for the AGH.

### Project Features & Setup Overview --- This project is a full-stack hospital management web application built using React, Node.js, Express, and MongoDB.

### To run the Frontend - use npm run dev

### To run the Server - Also use npm run dev or change accordingly in package.json

### Features.

1. Added Bootstrap CDN for styling.
2. Added font-awesome CDN.
3. npm i react-router
4. initially three routes. HOME, ABOUT, CONTACT.
5. Navbar setup. (Topbar and NavMenu).
6. Slider block, npm i swiper
7. Static blocks -
   7.1. Facility Blocks.
   7.2. our-work Block.
   7.3. Why Us.
   7.4. Contact Us.
   7.5. KeyFacts Block
8. Footer component
9. About Us Page
10. Gallery Page
11. Authentication Pages
12. Doctors Page.
13. Doctor Details Page / Appointment page
14. NavMenu (User Profile)
15. Profile => Edit Profile
16. Profile => My Appointments page
17. Setting up node server and installed the packages.
18. Connect to the Database MDb.
19. Create userModel schema for user related CRUD Operations.
20. userRoutes => register user / login user / Update User Details / Reset Password
21. added middlewares: jwt secret and multer for image uploads (local DB)
22. webMessages routes => Create message / Get all messages / Delete Messages.
23. Doctor routes => Add new doctor, Get all doctors, Get Doctor details, Delete doctor by Id, Update doctor details, Update availability status.
24. Appointment routes (Admin) => Add an Appointment, Get all Appointment, GET APPOINTMENT DETAILS, UPDATE APPOINTMENT STATUS.
    Appointment routes (User) => GET ALL APPOINTMENTS, GET APPOINTMENT DETAILS, CANCEL APPOINTMENT.
25. Admin Panel. Pages and components e.g Menu Bar and footers etc.
26. creating env file for the admin dashboard.
27. Create redux store. created slices & actions for get users , login, logout, loadToken.
28. Admin Panel (All Users / User Details / Doctors / Appointments) along with some more solution cleanup and architecture updates.
29. Admin Panel Homepage Analytics & reports.
30. Adding actions and slices for the Analytics in admin-panel.
31. Made the user profile dynamic and integrated edit user profile feature

###### Features

### Frontend (Core Setup)

1. Bootstrap CDN for responsive UI
2. Font Awesome CDN for icons
3. React Router for client‑side routing

### Routing

1. / → Home
2. /about → About
3. /contact → Contact
4. /gallery → Gallery
5. /doctors → Doctors
6. /appointment/:id → Doctor Appointment
7. /register → Register
8. /login → Login

### Layout & UI Components

1. Topbar + Navigation Menu
2. Footer component
3. Swiper slider integration (swiper)
4. Static UI blocks: Facilities || Our Work || Why Choose Us || Contact Us || Key Facts (responsive slider)

### Backend (Node.js + Express)

1. Server Setup - Express server configuration
2. Environment‑based configuration (development / production)
3. Database - MongoDB with Mongoose
4. Models -- User schema
5. Middleware -- JWT authentication / Multer for image uploads (local storage)

### Installation & Setup

Prerequisites

1. Node.js (v16+ recommended)
2. MongoDB (local instance)
3. npm or yarn

### Frontend Setup

1. cd client
2. npm install
3. npm run dev

### Backend Setup

1. cd client
2. npm install
3. npm run dev

### Future Improvements (TODO)

1. Email‑based password reset
2. Appointment approval system ❌❌📛
3. Payment gateway integration ❌❌📛
4. Cloud image storage (AWS / Cloudinary) ❓❓❓
5. configure web message system in the admin-panel. ❌❌📛
6. fix Menu bar in the tablet mode. (Add a close button to the overlay) ❌❌📛
7. Add Appointments logic to the button in admin-panel.❌❌📛
8. Automated tests. ✅
9. Security Risk: No Email Uniqueness Check on Registration In userRegisterController ❌❌📛
10. Broken Login Navigation Logic Login component's useEffect, after successful login it navigate to /login instead of a dashboard/home page. This creates a redirect loop. Should navigate to /doctors or /home. ❌❌📛
11. CI/CD pipeline setup ❌❌📛
12. Code review process/Git workflow ❌❌📛
13. Appointment Details page (need to create an action and a slice, Controller and route is already there.)
