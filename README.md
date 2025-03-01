# Frontend Habit Building App 
## Table of Contents
- [Overview](#overview)
- [Tools Used](#tools-used)
- [Requirements](#requirements)
- [Setup](#setup)
  - [Clone the Repository](#1-clone-the-repository)
  - [Create a Virtual Environment & Install Dependencies](#2-create-a-virtual-environment--install-dependencies)
  - [Run Locally](#4-run-locally)
- [Backend API Endpoints](#Backend-API-Endpoints)
- [Serverless Deployment](#serverless-deployment)
- [Cloud Architecture](#Cloud-Architecture)
- [Architecture Diagram](#architecture-diagram)
- [Front End](#Front-End)
- [Demo](#Demo)
- [License](#license)
- [Contact Me](#contact-me)

## Overview
This project is a backend application built using FastAPI, PyMongo, and Docker. It demonstrates building RESTful APIs that interact with a MongoDB database and includes a serverless deployment option using AWS Lambda and API Gateway.

## Tools Used
### Backend
- FastAPI for building RESTful APIs
- PyMongo for interacting with MongoDB
- Docker for containerized deployment 
- JSON Web Tokens for User Authentication
- Hosted on AWS 
  - ECR to host containerized images
  - Lambda Functions to respond to requests
  - API Gateway to manage server-client communications

### Front End
- React
- Next.js
- ShadCN (component library)
  - Skeleton Loaders
  - Motion Elements
  - Fallback functionality

## Requirements
- Python 3.11

## Setup
### 1. Clone the repository
```sh
git clone https://github.com/unsupervised-machine/habit_frontend
cd habit_frontend
```

### 2. Create a virtual environment & install dependencies
```sh
npm install
```

### 3. Run Locally
```sh
uvicorn main:app --reload --port 8000

You can also visit the live website here: https://habit-frontend-five.vercel.app
```
This will start both the FastAPI Uvicorn service running on http://127.0.0.1:8000 



## Backend API Endpoints
![FastAPI Docs](diagrams/FastAPI%20Endpoints.png)


## Serverless Deployment
- This projects database is currently being hosted on MongoDB Atlas server, whether you hit the API from the API Gateway routes or from the locally hosted routes the database will reflect the changes.
- The project was containerized using docker, the container image was stored in a ECR repo, a Lambda instance is spun up on calls from an API Gateway.

### Cloud Architecture
- A diagram describing my API architecture can be found here: `diagrams/Cloud Diagram.drawio.svg`
![Cloud Architecture](diagrams/Cloud%20Diagram.drawio.svg)
  
### MongoDB
- The database is hosted on the cloud using MongoDB Atlas.
- All CRUD operations with the database are done through the official MongoDB driver pymongo.

## Front End
- The Front end was built using Next.js, React, 

## Demo
![Demo Video](diagrams/Screen%20Recording%20Demo.mov)


## License
None

## Contact Me
If you have any questions, suggestions, or issues, feel free to reach out!
- Email: taran.s.lau@gmail.com
- GitHub: https://github.com/unsupervised-machine

---
