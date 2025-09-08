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

