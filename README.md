# ITSM Pro: Enterprise IT Services Management Platform

## Project Overview

**ITSM Pro** is a professional, full-stack application designed to demonstrate enterprise-level IT Services Management (ITSM) capabilities for small businesses and enterprises. This project features a modern, responsive frontend, a robust Node.js backend, and a fully automated Continuous Integration/Continuous Deployment (CI/CD) pipeline using **GitLab CI/CD** and **Docker**.

This repository is structured to be a showcase piece, demonstrating best practices in:
*   **Microservices Architecture**: Separate containers for frontend and backend.
*   **Modern Web Development**: HTML5, CSS3 (with a modern utility-first approach), and ES6+ JavaScript.
*   **DevOps Automation**: Automated build, test, and multi-stage deployment (Staging and Production).

## Technical Stack

| Component | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | HTML5, CSS3, JavaScript (ES6+) | User Interface and Interaction |
| **Backend** | Node.js, Express.js | RESTful API and Business Logic |
| **Containerization** | Docker | Packaging and Isolation |
| **CI/CD** | GitLab CI/CD | Automated Pipeline Management |

## Project Structure

```
it-services-mgmt/
├── backend/
│   ├── Dockerfile             # Docker configuration for the Node.js API
│   ├── package.json           # Backend dependencies
│   └── server.js              # Express.js application entry point
├── frontend/
│   ├── Dockerfile             # Docker configuration for the Nginx-served static site
│   ├── package.json           # Frontend dependencies (e.g., for build tools)
│   ├── index.html             # Main application entry point
│   ├── styles.css             # Modern, responsive CSS styles
│   └── app.js                 # Frontend JavaScript logic (API calls, routing)
├── .gitlab-ci.yml             # The core CI/CD pipeline definition
├── docker-compose.yml         # Local development and testing setup
└── README.md                  # This documentation
```

## Local Setup Guide (For Beginners/Intermediate Developers)

### Prerequisites

1.  **Git**: Installed and configured.
2.  **Node.js**: Not strictly required for running the containers, but useful for development.
3.  **Docker & Docker Compose**: Essential for running the application locally.

### Steps

1.  **Clone the Repository** (Simulated step for this guide):
    ```bash
    git clone <your-gitlab-repo-url>
    cd it-services-mgmt
    ```

2.  **Build and Run Containers with Docker Compose**:
    The `docker-compose.yml` file orchestrates the build and run process for both the frontend and backend services.

    ```bash
    docker-compose up --build
    ```

3.  **Access the Application**:
    *   **Frontend (Web UI)**: Access the application in your browser at `http://localhost:80`
    *   **Backend (API)**: The API is available at `http://localhost:5000/api`

4.  **Stop the Application**:
    ```bash
    docker-compose down
    ```

## GitLab CI/CD Pipeline Guide (For Intermediate/Executive Stakeholders)

The `.gitlab-ci.yml` file defines a robust, multi-stage pipeline that automates the entire deployment process.

### Pipeline Stages

| Stage Name | Description | Components | Trigger |
| :--- | :--- | :--- | :--- |
| **build-frontend** | Builds the static frontend into a Docker image (using Nginx) and pushes it to the GitLab Container Registry. | `frontend/Dockerfile` | Automatic |
| **build-backend** | Builds the Node.js API into a Docker image and pushes it to the GitLab Container Registry. | `backend/Dockerfile` | Automatic |
| **test** | Runs unit and integration tests for the backend service. | `backend/package.json` (`npm test`) | Automatic |
| **deploy-staging** | Deploys the latest images to the Staging environment. | Frontend & Backend Images | Automatic (on `develop` branch push) |
| **deploy-production** | Deploys the validated Staging images to the Production environment. | Frontend & Backend Images | **Manual** (on `main` branch push) |

### Key CI/CD Configuration Details

1.  **Image Registry**: Images are tagged and pushed to the GitLab Container Registry using the predefined variables: `$CI_REGISTRY_IMAGE`, `$CI_COMMIT_REF_SLUG`, etc.
2.  **Docker-in-Docker (dind)**: The `services: - docker:dind` entry is crucial for allowing the GitLab Runner to execute Docker commands (build and push) within the CI job.
3.  **Deployment Logic**: The deployment jobs (`deploy-staging` and `deploy-production`) are placeholders. In a real-world scenario, the `script` section would contain commands to:
    *   SSH into the target server.
    *   Log in to the container registry.
    *   Pull the new images.
    *   Run `docker-compose pull && docker-compose up -d` to update the running services.
4.  **Branching Strategy**:
    *   **Staging** is automatically deployed upon changes to the `develop` branch.
    *   **Production** deployment is restricted to the `main` branch and requires a `when: manual` action, ensuring a human review before final release.

---
*This document was generated by Manus AI to fulfill the project requirements.*
