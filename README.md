# Traffic Turbine

A real-time energy monitoring system for IoT devices with dynamic device management and data visualization.

## 🚀 Features

- **Real-time Energy Monitoring**: Track voltage, current, power, energy consumption, and battery levels
- **Dynamic Device Management**: Automatically create collections for new devices
- **Multi-Device Support**: Monitor multiple Arduino/ESP32 devices (ARD-1, ARD-2, ARD-3, ARD-4)
- **REST API**: Full CRUD operations for device data
- **Modern UI**: React-based dashboard with ShadCN/UI components and sidebar navigation
- **MongoDB Atlas Integration**: Cloud-hosted scalable database with device-specific collections
- **Production Ready**: Frontend on Vercel, Backend on Render

## 📁 Project Structure

```
TrafficTurbine/
├── backend/
│   ├── models/
│   │   └── deviceDataSchema.js    # MongoDB schema for device data
│   └── server.js                  # Express.js server
├── Esp32/
├── frontend/
│   └── src/
│       └── components/
│           ├── ui/
│           │   └── sidebar.jsx    # UI sidebar components
│           └── app-sidebar.jsx    # Main sidebar navigation
└── README.md
```

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB Atlas** - Cloud database service
- **Mongoose** - ODM for MongoDB
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management
- **Render** - Backend hosting platform

### Frontend
- **Next.js** - Framework
- **ShadCN/UI** - Modern UI component library with Tailwind CSS
- **Tabler Icons** - Icon library
- **Custom UI Components** - Sidebar and navigation
- **Vercel** - Frontend hosting platform

## 🗄️ Database Architecture

### MongoDB Atlas Setup
The system uses MongoDB Atlas (cloud) with a dynamic collection strategy:

- **Provider**: MongoDB Atlas (Cloud)
- **Database**: `trafficturbine`
- **Collections**: Automatically created per device (e.g., `ARD-1`, `ARD-2`, `ESP32-1`)
- **Schema**: Consistent across all device collections
- **Indexing**: Time-based indexing for efficient queries
- **Backup**: Automatic daily backups included

### Collection Naming Convention
```javascript
Device ID: "ARD-1" → Collection: "ARD-1"
Device ID: "ESP32-SENSOR-01" → Collection: "ESP32-SENSOR-01"
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (free tier available)
- Vercel account (for frontend deployment)
- Render account (for backend deployment)
- npm or yarn

### Local Development

#### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install express mongoose cors dotenv
```

3. Create a `.env` file:
```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/trafficturbine
```

4. Start the server:
```bash
npm start
```

#### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

4. Start the development server:
```bash
npm run dev
```

## 🌐 Production Deployment

### Backend Deployment (Render)

1. **Create Render Account**: Sign up at [render.com](https://render.com)

2. **Connect Repository**: Link your GitHub repository

3. **Configure Build Settings**:
   ```
   Build Command: npm install
   Start Command: npm start
   ```

4. **Environment Variables** (in Render dashboard):
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/trafficturbine
   PORT=10000
   ```

5. **Deploy**: Your API will be available at `https://your-app.onrender.com`

### Frontend Deployment (Vercel)

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy to Vercel**:
   ```bash
   cd frontend
   vercel --prod
   ```

3. **Environment Variables** (in Vercel dashboard):
   ```
   NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
   ```

4. **Custom Domain** (optional): Configure in Vercel dashboard

### MongoDB Atlas Setup

1. **Create Atlas Account**: Sign up at [mongodb.com/atlas](https://mongodb.com/atlas)

2. **Create Cluster**: 
   - Choose free tier (M0)
   - Select region closest to your users
   - Name: `traffic-turbine-cluster`

3. **Database Configuration**:
   - Database name: `trafficturbine`
   - Collections: Auto-created by application

4. **Network Access**: 
   - Add IP: `0.0.0.0/0` (allow all) for Render
   - Or specific Render IP ranges

5. **Database User**:
   - Create user with read/write permissions
   - Use credentials in MONGO_URI

6. **Connection String**:
   ```
   mongodb+srv://<username>:<password>@traffic-turbine-cluster.abc123.mongodb.net/trafficturbine
   ```

## 📡 API Endpoints

### POST `/api/data`
Save energy data for a device.

**Request Body:**
```json
{
  "voltage": 220.5,
  "current": 2.3,
  "power": 507.15,
  "energy": 1234.56,
  "batteryLevel": 85,
  "deviceId": "ARD-1",
  "time": "2024-01-01T12:00:00Z"
}
```

**Response:**
```json
{
  "message": "Energy data saved successfully",
  "data": { /* saved data object */ }
}
```

### GET `/api/data/:deviceId`
Retrieve all data for a specific device.

**Example:** `GET /api/data/ARD-1`

**Response:**
```json
[
  {
    "_id": "...",
    "voltage": 220.5,
    "current": 2.3,
    "power": 507.15,
    "energy": 1234.56,
    "batteryLevel": 85,
    "time": "2024-01-01T12:00:00Z"
  }
]
```

## 🎯 Supported Devices

- **ARD-1** - `/dashboard/1`
- **ARD-2** - `/dashboard/2`
- **ARD-3** - `/dashboard/3`
- **ARD-4** - `/dashboard/4`

Each device has its own MongoDB collection for data isolation and scalability.

## 🔧 Configuration

### Environment Variables

#### Backend (Render)
| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | 10000 |
| `MONGO_URI` | MongoDB Atlas connection string | mongodb+srv://... |

#### Frontend (Vercel)
| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | https://your-app.onrender.com |

### Production URLs
- **Frontend**: `https://your-app.vercel.app`
- **Backend API**: `https://your-backend.onrender.com`
- **Database**: MongoDB Atlas cluster

## 🚨 Error Handling

The API includes comprehensive error handling:
- Invalid device IDs
- Missing required fields
- Database connection errors (MongoDB Atlas)
- Validation errors
- Network timeout handling for ESP32 devices
- CORS configuration for Vercel frontend

