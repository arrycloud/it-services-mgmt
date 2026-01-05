************   PROJECT PROMPT   ************
********************************************

Please provide a complete, step-by-step guide to set up GitLab CI/CD for a Docker-based project featuring both frontend and backend components. The project should demonstrate a professional IT Services Management website designed for small businesses and enterprises.

# Project Requirements:
## 1. Technical Stack
Frontend: HTML5, CSS3, JavaScript (modern ES6+)

Backend: Node.js with Express.js

Containerization: Docker (separate images for frontend and backend)

CI/CD: GitLab CI/CD pipeline

## 2. File Structure & Naming Convention
Provide clearly named script files to distinguish components:

text
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   ├── server.js
│   └── routes/
└── .gitlab-ci.yml

## 3. Website Functionality
Create an attractive, professional IT Services Management interface featuring:

Dashboard with service overview and analytics

Service Management (Add/Edit/Delete services)

Client Management (CRUD operations for business clients)

Booking/Scheduling system

Reporting & Analytics

User Authentication (login/register)

Responsive design (mobile-first approach)

## 4. Deliverables Needed
Complete project structure with all necessary files

Step-by-step GitLab CI/CD setup from repository creation to production deployment

Dockerfiles for both frontend and backend

.gitlab-ci.yml configuration with all stages (build, test, deploy)

Professional UI/UX with modern design principles

Detailed documentation suitable for:

Beginners/novices

Intermediate developers

Executive stakeholders

## 5. Pipeline Stages Required
text
stages:
  - build-frontend
  - build-backend
  - test
  - deploy-staging
  - deploy-production

## 6. Success Criteria
Fully functional, attractive website running in Docker containers

Automated CI/CD pipeline deploying to staging/production

Repository structure ready for client/employer showcase

Comprehensive README.md with setup instructions

Code quality suitable for production use

Target Audience: The guide should be accessible to complete beginners while demonstrating enterprise-level professionalism for potential employers/clients.
