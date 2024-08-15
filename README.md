# Job Portal

## Introduction
The **Job Portal** is a comprehensive platform designed to streamline the recruitment process for **jobseekers**, **employers (companies)**, and **administrators**. It consists of three primary modules:

- **Admin Module**: Manage companies, jobs, and jobseekers.
- **Company (Employer) Module**: Post jobs, manage applicants, and company profiles.
- **Job Seeker Module**: Search and apply for jobs, manage profiles, education, and experiences.

## Main Modules

### 1. Admin Module
- **Admin Dashboard**
- **Admin Profile**
- **View Companies**
  - Active Jobs
  - Job History
- **View Jobs**
  - Job Details
  - Edit Job Details
- **View Jobseeker**
  - Jobseeker Profile
- **Notifications**

### 2. Company/Employer Module
- **Company Search (Company Landing Page)**
- **View Job**
- **Post Jobs**
- **Profile**
- **Depts_Sector**
  - Add Sector
- **My Jobs**
  - Edit Job
  - View Applicants
    - User Profile

### 3. Job Seeker Module
- **Job Seeker Search (Job Seeker Landing Page)**
  - View Job Details
- **Job Seeker Profile**
- **Job Seeker Education**
  - Add Education
- **Job Seeker Experience**
  - Add Experience
- **Applied Jobs**
- **Saved Jobs**

## Technologies Used
- **Backend**: Django, Django REST Framework
- **Frontend**: React Vite, Tailwind CSS
- **Database**: MySQL

## Installation Guide

### Prerequisites
Ensure the following are installed:
- **Node.js** (v14+)
- **npm** (v6+) or **Yarn**
- **Python** (v3.8+)
- **MySQL** (v5.7+)
- **pip** (Python package installer)
- **Virtualenv** (for Python virtual environments)
- **Git** (optional but recommended)

### Backend Setup (Django & Django REST Framework)
1. Clone the backend repository:
   ```
   git clone <backend-repo-url>
   cd <backend-repo-folder>
   
   ```
   
2.Create a virtual environment:
```
  virtualenv venv
```
3.Activate the virtual environment:
On macOS/Linux:
```
source venv/bin/activate
```
On Windows:
```
venv\Scripts\activate
```
4.Install Python dependencies:
```
pip install -r requirements.txt
```
5.Set up MySQL database:
Create a new database:
```
CREATE DATABASE job_portal_db;
```
6.Configure database settings in settings.py:
```
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'job_portal_db',
        'USER': 'your_username',
        'PASSWORD': 'your_password',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}
```
7.Apply migrations:
```
python manage.py migrate
```
8.Create a superuser:
```
python manage.py createsuperuser
```
9.Run the Django development server:
```
python manage.py runserver
```
###Frontend Setup (React with Vite)

1.Clone the frontend repository:
```
git clone <frontend-repo-url>
cd <frontend-repo-folder>
```
2.Install Node.js dependencies:
```
npm install
```
3.Install Tailwind CSS via npm:
```
npm install -D tailwindcss postcss autoprefixer
```
4.Generate the Tailwind configuration files:
```
npx tailwindcss init
```
5.Configure the tailwind.config.js:
```
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```
6.Add Tailwind directives to your CSS (e.g., src/index.css):
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```
7.Run the React development server:
```
npm run dev
```
