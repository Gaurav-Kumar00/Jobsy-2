# 🧠 JobSy — Job & Internship Platform

Jobsy is a full-stack MERN application that connects job seekers with companies. It provides an efficient system for **admins** to post jobs, manage applications, and for **applicants** to search, apply, and track their job applications.

---

## ✨ Features

### 👤 Applicant Side
- 🔍 Search and browse jobs based on filters (location, salary, etc.)
- 📄 Upload resume and list skills
- 🧾 Apply to job postings
- 📋 See all applications in a personalized dashboard
- 💼 View job details (salary, requirements, location, etc.)

### 🛠️ Admin Side
- 🏢 Create and manage company profiles
- 📢 Post jobs with:
  - Salary
  - Requirements
  - Location
  - Job type
- 👁️ View list of applicants for each job
- ✅ Accept / ❌ Reject applicants
- 📈 View total number of applications per job

---

## 🧩 Tech Stack
- **Frontend:** React.js, Tailwind CSS / Bootstrap (optional)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT-based Auth (Admin & Applicant roles)
- **File Uploads:** (for resumes) – Multer / Cloudinary
- **State Management:** Context API / Redux (optional)

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/jobsy.git
cd jobsy
```

### 2. Install Dependencies

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd ../frontend
npm install
```

### 3. Setup environment variables
Create a `.env` file in the backend directory with the following variables:

#### Example `.env` File
```ini
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 4. Start the development servers

#### Backend
```bash
cd backend
npm run dev
```

#### Frontend
```bash
cd frontend
npm start
```

The application should now be running at `http://localhost:3000` with the backend API at `http://localhost:5000`.

---

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new applicant
- `POST /api/auth/login` - Login for applicants and admins
- `GET /api/auth/me` - Get current user profile

### Jobs
- `GET /api/jobs` - Get all jobs
- `GET /api/jobs/:id` - Get job by ID
- `POST /api/jobs` - Create new job (admin only)
- `PUT /api/jobs/:id` - Update job (admin only)
- `DELETE /api/jobs/:id` - Delete job (admin only)
- `GET /api/jobs/search` - Search jobs with filters

### Applications
- `POST /api/applications` - Submit job application
- `GET /api/applications/user` - Get all applications for current user
- `GET /api/applications/job/:id` - Get all applications for a job (admin only)
- `PUT /api/applications/:id` - Update application status (admin only)

### Companies
- `POST /api/companies` - Create company profile (admin only)
- `GET /api/companies` - Get all companies
- `GET /api/companies/:id` - Get company by ID
- `PUT /api/companies/:id` - Update company (admin only)

---

## 🗂️ Project Structure
```
jobsy/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── utils/
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── tailwind.config.js
└── README.md
```

---

## 🔐 Authentication Flow

1. **Registration:**
   - Applicants can register with email, password, and personal details
   - Admins are created through a separate admin registration process

2. **Login:**
   - JWT-based authentication
   - Token stored in localStorage
   - Different dashboards for applicants and admins

3. **Authorization:**
   - Protected routes for admin and applicant sections
   - Middleware to verify user roles

---

## 🛠️ Development Notes

### Database Schema Overview
- **User** - Stores both applicants and admins with role distinction
- **Job** - Job listings with all details
- **Application** - Connects users to jobs they've applied to
- **Company** - Company profiles linked to admin users

### File Upload
The application uses Cloudinary for resume storage:
1. Applicant uploads resume
2. File sent to Cloudinary via API
3. Cloudinary URL stored in the database

### Deployment Options
- **Frontend:** Vercel, Netlify, or GitHub Pages
- **Backend:** Heroku, Railway, or Render
- **Database:** MongoDB Atlas

---

## 📝 Future Enhancements
- 💬 In-app messaging between applicants and admins
- 📱 Mobile application with React Native
- 📊 Advanced analytics dashboard for admins
- 🔔 Email notifications for application updates
- 🔍 AI-powered job matching algorithm
- 📅 Interview scheduling system

---

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
