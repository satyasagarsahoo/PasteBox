🚀 PasteBox: Secure, Ephemeral File Sharing — Built with the MERN Stack
PasteBox is a modern file-sharing application designed for simplicity, privacy, and speed.
It enables users to upload files and share them instantly using a 6-digit access code—without requiring accounts or leaving long-term storage traces.

📌 Overview
PasteBox focuses on secure and temporary file transfer. Files are automatically deleted based on configurable expiration rules such as time limits or download counts, ensuring minimal storage footprint and enhanced privacy.

✨ Key Features
Secure File Sharing
Optional password protection with encrypted storage using bcrypt
Automatic Expiry
Files expire after a defined time or number of downloads
Ephemeral Storage
Files are removed after usage to ensure no residual data
Simple Access System
6-digit code-based retrieval for quick and user-friendly access
QR Code Integration
Seamless file access on mobile devices
Efficient File Handling
Stream-based upload and download for performance optimization
Scalable Storage
MongoDB GridFS for handling large files efficiently

🏗️ Project Architecture
pastebox-mern/
├── server/                  # Backend (Node.js, Express)
│   ├── index.js             # Application entry point
│   ├── models/              # Database schemas
│   ├── routes/              # API route handlers
│   └── .env                 # Environment configuration
│
├── client/                  # Frontend (React)
│   ├── public/              # Static assets
│   └── src/
│       ├── components/      # Reusable UI components
│       ├── pages/           # Application pages
│       └── App.js           # Root component
│
└── package.json             # Project configuration

⚙️ Getting Started
1. Clone the Repository
git clone <repository-url>
cd pastebox-mern
2. Install Dependencies
Frontend Setup
cd client
npm install
npm start
Backend Setup
cd server
npm install
npm run dev
🌐 Local Development
Service	URL
Frontend	http://localhost:3000

Backend	http://localhost:5000

The frontend is configured to proxy API requests to the backend during development.


🔐 Environment Configuration
Create a .env file in the /server directory:
MONGO_URI=your_mongodb_connection_string
PORT=5000
CLIENT_URL=http://localhost:3000

🔌 API Reference
Method	Endpoint	Description
POST	/api/files/upload	Upload a file
POST	/api/files/verify	Validate access code
GET	/api/files/download/:code	Download file
GET	/api/files/status/:code	Retrieve file status
GET	/api/health	Health check endpoint

🔄 Application Workflow
File Upload
User uploads a file via the client interface
File is stored in MongoDB using GridFS
A unique 6-digit access code is generated
The system returns:
Access code
Shareable link
QR code
Expiration details
File Download
User enters the access code
System validates:
Expiry status
Download limit
Password (if applicable)
File is securely streamed to the user

🧠 System Design
Storage: MongoDB GridFS (chunk-based file storage)
Metadata Includes:
Expiration timestamp
Download count tracking
Encrypted password (optional)
Expired files are flagged and can be removed using scheduled cleanup processes.

🛠️ Technology Stack
Layer	Technologies
Frontend	React 18, React Router v6, Axios
Backend	Node.js, Express
Database	MongoDB Atlas (GridFS)
ORM/ODM	Mongoose
File Upload	Multer
Security	bcryptjs
Utilities	qrcode
Dev Tools	nodemon, concurrently

🚀 Production Deployment
npm run build
NODE_ENV=production node server/index.js
The backend serves the optimized React build in production.

🔮 Roadmap
Automated GridFS cleanup using cron jobs
File analytics and usage dashboard
One-time secure download links
Drag-and-drop file upload interface
Cloud deployment (AWS, Vercel, Render)

👤 Author
Satyasagar Sahoo
🔗 https://in.linkedin.com/in/satyasagarsahoo

📄 License
This project is licensed under the MIT License.