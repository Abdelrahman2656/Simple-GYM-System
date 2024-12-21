Simple GYM System 🏋️‍♂️
Overview 🌟
The Simple GYM System is a web application that allows gym members to manage their memberships, book classes, and track their progress. It also enables administrators to manage user accounts, membership plans, class schedules, and more. Built with Node.js, Express.js, and MongoDB, this system is scalable, secure, and designed for high performance.

<hr>
Key Features 🔑
User Registration & Authentication: Sign up and log in using secure JWT tokens 🔐
Membership Management: Select, renew, and update membership plans 💪
Class Booking: Browse and book classes 🏅
Admin Dashboard: Manage users, memberships, and classes 👨‍💻
Notifications: Receive updates on bookings, renewals, and account status 📧
<hr>
Technologies Used ⚙️
Backend: Node.js, Express.js, MongoDB
Authentication: JWT, bcrypt
Email Service: Nodemailer
Testing: Mocha, Chai
Deployment: Heroku, MongoDB Atlas
<hr>
Installation 🛠️
Clone the repository:

bash
Copy code
git clone https://github.com/your-repo/Simple-GYM-System.git  
cd Simple-GYM-System  
Install dependencies:

bash
Copy code
npm install  
Set up environment variables:

bash
Copy code
MONGODB_URI=mongodb://your-database-uri  
EMAIL_USER=your-email@example.com  
EMAIL_PASS=your-email-password  
JWT_SECRET=your-secret-key  
Start the development server:

bash
Copy code
npm start  
<hr>
API Documentation 📜
POST /api/v1/signup: Register a new user 📝
POST /api/v1/login: Log in to get a JWT token 🔑
GET /api/v1/classes: View available classes 🏋️‍♀️
POST /api/v1/book-class: Book a class 📅
GET /api/v1/memberships: View membership plans 🏅
<hr>
Contributing 🤝
Fork the repository 🍴
Create a feature branch 🌱
Commit your changes 💻
Push to your branch 🚀
Create a pull request 🔀
<hr>
License 📜
This project is licensed under the MIT License. See the LICENSE file for more details.



