# React + Vite Project for the AGH.

### Project Features & Setup Overview --- This project is a full-stack hospital management web application built using React, Node.js, Express, and MongoDB.

### To run the Frontend - use npm run dev

### To run the tests => npm test

1. Smoke Test => Test if the API is alive

backend/
├── **tests**/
│ ├── auth.test.js ← auth API tests
│ └── doctor.test.js ← doctor API tests
├── test-setup/
│ ├── db.js ← in-memory MongoDB setup
│ └── jest.setup.js ← Jest setup hooks
└── jest.config.js
