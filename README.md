# Infrastructure Fault Reporter

A web application that allows users to report infrastructure faults such as cut cables, damaged poles, or tangled wires. Users can click on a map to select a location, fill out a form, and submit fault reports. All submitted reports are visible on the map.

## Tech Stack

**Frontend (Angular 19+)**
- TypeScript
- Leaflet mapping library
- Reactive Forms
- Modular architecture (AppModule, SharedModule, CoreModule)

**Backend (ASP.NET Core Web API)**
- C# / .NET Core
- Entity Framework Core with SQLite
- RESTful API design

## Setup Instructions

### Backend Setup
#### Prerequisites
1. Check if .NET SDK is installed and verify version:
dotnet --version

You'll need .NET 6.0 or later (preferably .NET 8.0 for the latest features).

#### Project Setup
1. Navigate to the backend directory:
cd backend

2. Create ASP.NET Core Web API Project:
dotnet new webapi -n FaultReportingApi

3. Navigate to the project directory:
cd FaultReportingApi

4. Install required NuGet packages:
dotnet add package Microsoft.EntityFrameworkCore.Sqlite dotnet add package Microsoft.EntityFrameworkCore.Tools dotnet add package Swashbuckle.AspNetCore

#### Database Setup
1. Install EF Core Tools globally:
dotnet tool install --global dotnet-ef

2. Create the migration (generates code that describes database tables):
dotnet ef migrations add InitialCreate

3. Apply the migration (creates SQLite database file and tables):
dotnet ef database update

#### Run the Application
1. Start the API:
dotnet run

Backend will be available at `http://localhost:5045`
Swagger UI at `http://localhost:5045/swagger`

### Frontend Setup

#### Prerequisites
1. Install Node.js (Version 22.19.0 or compatible):
   - Download from [nodejs.org](https://nodejs.org/)
   - Verify installation:
     ```bash
     node -v
     npm -v
     ```
   - Ensure it displays the correct version numbers

2. Install Angular CLI globally:
npm install -g @angular/cli

3. Verify Angular CLI installation:
ng version

#### Project Setup
1. Navigate to the frontend directory:
cd frontend

2. Create Angular project with module-based architecture:
ng new fault-reporter-ui-modules --routing --style=css --no-standalone

Note: Using `--no-standalone` to create traditional module structure as required

3. Navigate to the project directory:
cd fault-reporter-ui-modules

4. Install Leaflet mapping library and TypeScript definitions:
npm install leaflet 
npm install @types/leaflet --save-dev

#### Run the Application
1. Start the development server:
ng serve

Frontend will be available at `http://localhost:4200`

## How to Use

1. **View Existing Faults**: Open the application to see existing fault reports as markers on the map
2. **Report New Fault**: 
- Click anywhere on the map to drop a pin
- Fill out the fault type and description in the form
- Click "Submit Fault Report"
3. **View Fault Details**: Click on any existing marker to see fault details and when it was reported

## Features

- Interactive map with click-to-pin functionality
- Form validation and submission
- Real-time coordinate capture
- Custom time formatting pipe ("2 hours ago")
- Popup displays for existing faults
- Responsive design

## Architecture Notes

- **Modular Angular Structure**: Organized with Core (singletons), Shared (reusables), and App modules
- **Service Communication**: Coordinate sharing between map and form components via shared service
- **RESTful API**: Clean separation between frontend and backend
- **Entity Framework**: Code-first approach with migrations
- **Reactive Forms**: Better validation and type safety over template-driven forms

## API Endpoints

- `GET /api/InfrastructureFaults` - Retrieve all fault reports
- `POST /api/InfrastructureFaults` - Create new fault report
- `GET /api/InfrastructureFaults/{id}` - Get specific fault by ID