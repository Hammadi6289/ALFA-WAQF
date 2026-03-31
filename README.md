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
   7.6. Video Block
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
32. Password reset functionality.
33. Book appointment with doctor feature integration.
34. Integrate Messaging feature in Contact Us Form.
35. Add react-helmet on client side.
36. Admin Panel Web Messages integration for getting clients messages and ability to delete them.
37. Search functionality in the Admin Dashboard.
38. First build and deployment to the Render (BE) and Vercel (FE Client and FE Admin Dashboard).
39. For manual google search console, added the google-site-verification to the public folder of Client => Frontend to help google crawl.
40. Fixed Vercel SPA routing issue for both client and Admin Panel. Vercel doesn't know how to handle client-side routes on refresh.
    https://hammad6289.atlassian.net/browse/KAN-32
41. Created uat environment.
42. Added a spinner on Book appointments page / All Doctors (Admin) / all-users (admin)
43. Noticed while setting up Cronjobs Failed (output too large) (310 ms): https://alfa-waqf.onrender.com/api/v1/doctor/get-all
    base64 images were super heavy to load on the website so changed them to placeholder avatars images.
44. Added fixes for the security vulnerablilities. NoSQL Injection / Rate Limiting / Security Headers.
    npm i express-mongo-sanitize helmet express-rate-limit
45. Changed the express verion to express@4.21.2 in order to make the express-mongo-sanitize work.
46. Setting up CI/CD Pipeline with GitHub Actions
    - Verified Cypress tests working on b_automated_testing branch (6 tests passing)
    - Created .github/workflows/ci-cd.yml for automated testing and deployment
    - Renamed cypress.config.js to cypress.config.cjs for ES module compatibility
    - Downgraded Cypress to 13.15.2 for Node 18 compatibility
    - Added GitHub secrets: VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID, VERCEL_ADMIN_PROJECT_ID, RENDER_DEPLOY_HOOK
47. Add an option to delete a user from the admin-panel.
48. Enable the users to de-activate / self delete their account. (Client side)
49. Added a search bar and search by speciality feature to the "All Doctors" page.
50. Added dropdown items to the About us and added a new NavLink in the Navbar (Speciality).
51. Adding new routes controllers and redux actions for the careers opportunities.
52. Add a news section under "about us" dropdown.

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
4. Static UI blocks: Facilities || Our Work || Why Choose Us || Contact Us || Key Facts (responsive slider) || Video Block.

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

### Production Notes.

1. Base url for the backend (render)
   https://alfa-waqf.onrender.com/
   https://alfa-waqf.onrender.com/api/v1/doctor/get-all
2. url for the websites. (Vercel)
   https://alfalah-waqf.vercel.app/
   https://alfalah-dashboard.vercel.app/

### Future Improvements (TODO)

1. Email‑based password reset
2. Appointment approval system ❌❌📛
3. Payment gateway integration ❌❌📛
4. Cloud image storage (AWS / Cloudinary) ❓❓❓
5. configure web message system in the admin-panel. ✅
6. fix Menu bar in the tablet mode. (Add a close button to the overlay) ✅
7. Add Appointments logic to the button in admin-panel.❌❌📛
8. Automated tests. ✅
9. Security Risk: No Email Uniqueness Check on Registration In userRegisterController ❌❌📛
10. Broken Login Navigation Logic Login component's useEffect, after successful login it navigate to /login instead of a dashboard/home page. This creates a redirect loop. Should navigate to /doctors or /home. ✅
11. CI/CD pipeline setup, Lets just use CI/CD for testing only, Vercel handles deployment ✅
12. Code review process/Git workflow ❌❌📛
13. Appointment Details page (need to create an action and a slice, Controller and route is already there.)

### Optimization / SEO Principles Followed.

1. Used Asynchronous Approach Site wide.
2. Tags nesting.
3. Made use of Keys with the list items.
4. Added react-helmet on the client side for the SEO.
5. Google search console. Added added the google-site-verification for client side.
