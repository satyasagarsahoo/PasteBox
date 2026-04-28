PasteBox 🚀

Secure, ephemeral file sharing built with the MERN Stack.

Upload a file, get a 6-digit access code, and share instantly. No accounts. No clutter. No traces.


---

📌 Overview

PasteBox is a modern file-sharing application focused on simplicity, privacy, and speed.

Files are automatically deleted based on configurable expiration rules such as:

Time-based expiry

Download count limits

Optional password protection


This ensures minimal storage footprint and stronger privacy.


---

✨ Features

📝 Text Snippets support

🔗 Shareable links with 6-digit access codes

📋 One-click copy to clipboard

🔐 Password-protected file sharing

⏱️ Auto-expiration by time or download count

📱 QR Code generation for instant mobile access

🗂️ MongoDB GridFS file storage

📊 Download tracking and limits



---

🏗 Project Structure

pastebox-mern/
├── server/                 # Backend — Node.js & Express
│   ├── index.js            # Application entry point
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API route handlers
│   └── .env                # Environment configuration
│
├── client/                 # Frontend — React 18
│   ├── public/             # Static assets
│   └── src/
│       ├── components/     # Reusable UI components
│       ├── pages/          # Application pages
│       └── App.js          # Root component
│
└── package.json            # Project configuration


---

⚙️ Installation

1. Clone the repository

git clone https://github.com/your-username/PasteBox.git

2. Install and start backend

cd server
npm install
npm start

3. Install and start frontend

cd client
npm install
npm run dev


---

🔧 Environment Variables

Create a .env file inside the /server directory:

MONGO_URI=your_mongodb_connection_string
PORT=5000
CLIENT_URL=http://localhost:3000


---

📡 API Reference

Method	Endpoint	Description

POST	/api/files/upload	Upload a file to GridFS
POST	/api/files/verify	Validate an access code
GET	/api/files/download/:code	Stream file to client
GET	/api/files/status/:code	Retrieve file metadata
GET	/api/health	Server health check



---

🔄 Application Workflow

📤 Upload Flow

1. User uploads file via client UI


2. File stored in MongoDB using GridFS


3. Unique 6-digit access code generated


4. Returns code, shareable link, and QR code


5. Expiration metadata attached to record



📥 Download Flow

1. Recipient enters the 6-digit code


2. System validates expiry timestamp


3. Download count is checked


4. Password verified if applicable


5. File is securely streamed to the user




---

🗄 System Design

Storage & Metadata

MongoDB GridFS → Chunk-based large file storage

Expiration Tracking → Auto-cleanup scheduling support

Download Counting → Max download enforcement

Encrypted Passwords → bcryptjs-based secure access



---

🛠 Tech Stack

Frontend

React 18

React Router v6

Axios


Backend

Node.js

Express.js

MongoDB Atlas

GridFS

Mongoose

Multer

bcryptjs

qrcode

nodemon



---

🚀 Deployment

Production Build

npm run build
NODE_ENV=production node server/index.js


---

🛣 Roadmap

⏰ Automated GridFS cleanup using cron jobs

📊 File analytics and usage dashboard

🔗 One-time secure download links

🖱 Drag-and-drop upload interface

☁️ Cloud deployment (AWS, Vercel, Render)



---

👨‍💻 Author

Satyasagar Sahoo

🔗 LinkedIn: https://in.linkedin.com/in/satyasagarsahoo


---

📜 License

This project is released under the MIT License.

Free for personal and commercial use.


---

⭐ Support

If you like this project, please give it a star on GitHub ⭐

It helps a lot.