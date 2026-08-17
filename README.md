# WebPro Task Orchestrator Monorepo

Welcome to the Task Orchestrator Monorepo. This repository contains a full-stack task management web application styled with premium modern aesthetics, featuring a Spring Boot (Java) backend and a Next.js (TypeScript) frontend.

---

## 📂 Project Structure

```text
webpro/
├── backend/          # Spring Boot JPA & REST API
│   ├── src/          # Java Source Code
│   ├── Dockerfile    # Multi-stage Java build
│   └── pom.xml       # Maven dependencies
├── frontend/         # Next.js & React Web App
│   ├── src/          # TypeScript Next.js Source Code
│   ├── Dockerfile    # Multi-stage Node.js build
│   └── package.json  # NPM dependencies
└── README.md         # Workspace documentation
```

---

## 🛠️ Technology Stack

* **Frontend**: Next.js 15+ (App Router), React, TypeScript, Tailwind CSS
* **Backend**: Spring Boot 3.x, Java 17, Spring Data JPA, Spring Web
* **Database**: PostgreSQL (JPA-managed)
* **Containers**: Docker & Docker Compose (Multi-stage optimized builds)

---

## 🚀 Getting Started

### 1. Database Setup
Ensure you have a PostgreSQL database named `tasks_db` running locally.
* **Default URL**: `jdbc:postgresql://localhost:5432/tasks_db`
* **Default Username**: `postgres`
* **Default Password**: `password`

You can update these configurations in [application.properties](file:///c:/Users/DELL-Precision-5570/Desktop/webpro/backend/src/main/resources/application.properties).

---

### 2. Running the Backend
Navigate to the `backend/` directory:

```bash
cd backend
```

Run the Spring Boot application using the Maven wrapper:
```bash
./mvnw spring-boot:run
```

The REST API will be available at `http://localhost:8080/api/tasks`.

---

### 3. Running the Frontend
Navigate to the `frontend/` directory:

```bash
cd frontend
```

Install dependencies and start the development server:
```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to interact with the task manager.

---

## 🐳 Docker Deployment

Both services are fully dockerized. To build production-ready minimal images:

### Backend Image
```bash
cd backend
docker build -t task-backend .
```

### Frontend Image
```bash
cd frontend
docker build -t task-frontend .
```

---

## 🌿 Git & Feature Branch Workflow

For contributing code and merging changes to the development cycle, follow these workflows:

### 1. Working on Feature Branches
Create a feature branch for your changes (e.g., `feature/task-priority`):
```bash
git checkout -b feature/task-priority
```
Make your changes, commit them:
```bash
git add .
git commit -m "feat: add task priority attribute"
```

### 2. Merging to the `dev` Branch
When your feature is complete and you want to push it to the `dev` branch:

#### Option A: Local Merge & Push (Recommended)
Switch to the local `dev` branch, merge, and push:
```bash
# Switch to dev branch
git checkout dev

# Pull latest dev changes to avoid conflicts
git pull origin dev

# Merge your feature branch
git merge feature/task-priority

# Push to the remote dev branch
git push origin dev

# Return to your feature branch
git checkout feature/task-priority
```

#### Option B: Direct Remote Push
Push your current local feature branch directly to the remote `dev` branch:
```bash
git push origin feature/task-priority:dev
```
