<div align="center">

# 📦 PasteBox

### Secure, Ephemeral File Sharing — Built with the MERN Stack

[![MIT License](https://img.shields.io/badge/License-MIT-00d9a3?style=flat-square)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-8cc84b?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react&logoColor=white)](https://reactjs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-4db33d?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com)
[![Express](https://img.shields.io/badge/Express-4.x-ffffff?style=flat-square&logo=express&logoColor=black)](https://expressjs.com)

<br/>

> Upload a file. Get a **6-digit code**. Share instantly.
> No accounts. No long-term traces. Just clean, fast, private file sharing.

<br/>

---

</div>

## 📌 Overview

**PasteBox** is a modern file-sharing application designed for simplicity, privacy, and speed. It enables users to upload files and share them instantly using a **6-digit access code** — without requiring accounts or leaving long-term storage traces.

Files are automatically deleted based on configurable expiration rules such as **time limits** or **download counts**, ensuring a minimal storage footprint and enhanced privacy.

<br/>

## ✨ Key Features

| Feature | Description |
|---|---|
| 📋 **Text Snippets** | Create and save pastes with instant shareable links |
| 🔢 **6-Digit Access Code** | Simple, memorable codes for file retrieval |
| 📱 **QR Code Generation** | Auto-generated QR for every upload |
| 🔐 **Password Protection** | Optional bcrypt-encrypted password per file |
| ⏱️ **Auto-Expiration** | Files expire by time limit or download count |
| 📋 **Copy to Clipboard** | One-click copy for links and access codes |
| 📱 **Responsive UI** | Clean interface that works on all devices |

<br/>

## 🏗️ Project Architecture

```
pastebox-mern/
├── server/                   # Backend — Node.js & Express
│   ├── index.js              # Application entry point
│   ├── models/               # Mongoose database schemas
│   ├── routes/               # API route handlers
│   └── .env                  # Environment configuration
│
├── client/                   # Frontend — React 18
│   ├── public/               # Static assets
│   └── src/
│       ├── components/       # Reusable UI components
│       ├── pages/            # Application pages
│       └── App.js            # Root component
│
└── package.json              # Project configuration
```

<br/>

## ⚙️ Installation & Setup

### Prerequisites

- **Node.js** v18 or higher
- **MongoDB Atlas** account (or local MongoDB instance)
- **npm** or **yarn**

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/PasteBox.git
cd PasteBox
```

### 2. Configure Environment Variables

Create a `.env` file inside the `/server` directory:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
CLIENT_URL=http://localhost:3000
```

### 3. Start the Backend

```bash
cd server
npm install
npm start
```

> Server will run on `http://localhost:5000`

### 4. Start the Frontend

```bash
cd client
npm install
npm run dev
```

> Client will run on `http://localhost:3000`

<br/>

## 🔌 API Reference

### Base URL
```
http://localhost:5000/api
```

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/files/upload` | Upload a file to GridFS |
| `POST` | `/files/verify` | Validate an access code |
| `GET` | `/files/download/:code` | Stream file to client |
| `GET` | `/files/status/:code` | Retrieve file metadata & status |
| `GET` | `/health` | Server health check |

<br/>

## 🔄 Application Workflow

### 📤 File Upload Flow

```
User selects file
      │
      ▼
Client sends file via POST /api/files/upload
      │
      ▼
File stored in MongoDB using GridFS
      │
      ▼
6-digit access code generated
      │
      ▼
Response: { code, shareLink, qrCode, expiresAt }
```

### 📥 File Download Flow

```
User enters 6-digit code
      │
      ▼
POST /api/files/verify
      │
      ├── Check expiry timestamp
      ├── Check download limit
      └── Verify password (if set)
            │
            ▼
       GET /api/files/download/:code
            │
            ▼
       File streamed to user
```

<br/>

## 🧠 System Design

### Storage — MongoDB GridFS

PasteBox uses **MongoDB GridFS** for chunk-based file storage, enabling reliable handling of large binary files natively within the MongoDB ecosystem.

### File Metadata Schema

Each uploaded file record stores:

```json
{
  "filename": "document.pdf",
  "accessCode": "482910",
  "expiresAt": "2024-12-31T23:59:59Z",
  "downloadCount": 0,
  "maxDownloads": 5,
  "passwordHash": "$2b$10$...",
  "createdAt": "2024-12-01T10:00:00Z"
}
```

> Expired files are flagged during access validation and can be removed via scheduled cleanup cron jobs.

<br/>

## 🛠️ Technology Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | 18.x | UI framework |
| React Router | v6 | Client-side routing |
| Axios | Latest | HTTP client |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Node.js | 18.x | Runtime environment |
| Express | 4.x | Web framework |
| Mongoose | Latest | MongoDB ODM |
| Multer | Latest | File upload middleware |
| bcryptjs | Latest | Password hashing |
| qrcode | Latest | QR code generation |

### Database & DevOps
| Technology | Purpose |
|---|---|
| MongoDB Atlas | Cloud database |
| GridFS | Binary file storage |
| nodemon | Dev auto-restart |
| concurrently | Run client + server together |

<br/>

## 🚀 Production Deployment

### Build the Frontend

```bash
npm run build
```

### Start in Production Mode

```bash
NODE_ENV=production node server/index.js
```

### Recommended Platforms

| Platform | Type | Notes |
|---|---|---|
| **Render** | Full-stack | Simple MERN deployment |
| **Railway** | Full-stack | Easy MongoDB integration |
| **Vercel** | Frontend | Pair with Render backend |
| **AWS EC2** | Self-hosted | Full control |

<br/>

## 🔮 Roadmap

- [ ] ⏰ Automated GridFS cleanup using cron jobs
- [ ] 📊 File analytics and usage dashboard
- [ ] 🔗 One-time secure download links
- [ ] 🖱️ Drag-and-drop file upload interface
- [ ] ☁️ Cloud deployment (AWS, Vercel, Render)
- [ ] 🌐 Multi-language support
- [ ] 🖼️ File preview (images, PDFs)

<br/>

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -m 'Add YourFeature'`
4. Push to the branch: `git push origin feature/YourFeature`
5. Open a Pull Request

<br/>

## 👤 Author

**Satyasagar Sahoo**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077b5?style=flat-square&logo=linkedin&logoColor=white)](https://in.linkedin.com/in/satyasagarsahoo)

<br/>

## 📄 License

This project is licensed under the **MIT License** — free for personal and commercial use.

See the [LICENSE](LICENSE) file for full details.

---

<div align="center">

Made with ❤️ by [Satyasagar Sahoo](https://in.linkedin.com/in/satyasagarsahoo)

⭐ **Star this repo if you found it helpful!**

</div>