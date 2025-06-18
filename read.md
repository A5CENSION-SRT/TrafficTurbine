# Traffic Turbine

## Overview
Traffic Turbine is a web application designed to manage and visualize data related to devices and clusters. It consists of a frontend built with Next.js and a backend powered by Node.js.

## Project Structure

### Frontend
The frontend is located in the `frontend/` directory and is built using Next.js. It includes the following key components:

- **src/components/app-sidebar.jsx**: Implements the sidebar navigation, including menu items and submenus for device clusters.
- **src/components/ui/sidebar**: Contains reusable UI components for the sidebar, such as `SidebarMenu`, `SidebarMenuItem`, and `SidebarMenuSub`.
- **src/app/dashboard**: Contains the dashboard page and related data.

### Backend
The backend is located in the `backend/` directory and is built using Node.js. It includes:

- **server.js**: The main server file.
- **models/energydata.js**: Handles energy-related data models.

## Key Features

### Sidebar Navigation
The sidebar provides navigation options, including:
- **Dashboard**: Links to the main dashboard.
- **Device Cluster**: Displays a submenu with device names and links.
- **Settings**: Provides access to application settings.

### Data Management
The application supports managing and visualizing data for devices and clusters.

## How to Run

### Frontend
1. Navigate to the `frontend/` directory.
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

### Backend
1. Navigate to the `backend/` directory.
2. Install dependencies: `npm install`
3. Start the server: `node server.js`

## Contributing
Feel free to contribute by submitting issues or pull requests. Refer to the `Contribution Guide` in the sidebar for more details.

## License
This project is licensed under the MIT License.
