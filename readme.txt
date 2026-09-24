# Roster Desk

A web-based staff roster management application for creating, managing, publishing, and updating weekly staff schedules.

## 🚀 Features

* 👥 Staff roster management
* 🏥 Ward management
* 📅 Weekly roster scheduling
* 🔄 Staff swap management
* ✏️ Update roster assignments
* 📢 Publish weekly rosters
* 🔍 View staff and ward information
* ⚡ Fast and responsive React interface
* 🔗 REST API integration
* 🗄️ Server-side data management

## 🛠️ Tech Stack

### Frontend

* React
* TypeScript
* Vite
* TanStack React Query
* Axios
* CSS

### Backend / API

* REST API
* Node.js
* Express.js

### Development Tools

* Git
* GitHub
* Vercel
* VS Code

## 📁 Project Structure

```text
roster_desks/
│
├── src/
│   ├── core/
│   │   ├── api/
│   │   └── ...
│   │
│   ├── features/
│   │   └── roster/
│   │       ├── components/
│   │       ├── pages/
│   │       └── ...
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── public/
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/nizammhd/roster_desks.git
```

Navigate into the project:

```bash
cd roster_desks
```

Install dependencies:

```bash
npm install
```

## ▶️ Run Locally

Start the development server:

```bash
npm run dev
```

The application will normally be available at:

```text
http://localhost:5173
```

## 🏗️ Production Build

To create a production build:

```bash
npm run build
```

The build process runs TypeScript checking followed by Vite:

```bash
tsc -b && vite build
```

To preview the production build locally:

```bash
npm run preview
```

## 🔄 Roster Workflow

The application follows a basic roster-management workflow:

```text
Staff
  ↓
Wards
  ↓
Create Weekly Roster
  ↓
Assign Staff
  ↓
Edit Assignments
  ↓
Create / Manage Swaps
  ↓
Review
  ↓
Publish
```

## 📅 Weekly Roster

Administrators can manage staff assignments for different weeks.

Typical roster operations include:

* Selecting a week
* Viewing assigned staff
* Assigning staff to wards
* Updating assignments
* Reviewing the roster
* Publishing the roster

## 🔁 Staff Swap

The application also provides functionality for staff swaps.

The intended workflow is:

```text
Select Staff
      ↓
Select Shift / Assignment
      ↓
Select Swap Staff
      ↓
Review Swap
      ↓
Submit Swap
```

## 📢 Publishing

Once the roster has been reviewed, the weekly roster can be published.

Publishing makes the finalized roster available to the relevant users.

## 🔌 API Integration

The frontend communicates with backend APIs for operations such as:

* Fetching staff
* Fetching wards
* Fetching roster information
* Updating roster assignments
* Publishing rosters
* Managing swaps

API functions are organized separately to keep the UI components clean and maintainable.

## 🧠 Data Fetching

The application uses **TanStack React Query** for server-state management.

Example:

```tsx
const { data, isLoading, error } = useQuery({
  queryKey: ["roster"],
  queryFn: apiGetRoster,
});
```

Mutations are used for operations such as updating and publishing data.

```tsx
const mutation = useMutation({
  mutationFn: apiPublish,
});
```

## 🌐 Deployment

The project can be deployed using Vercel.

Production build command:

```bash
npm run build
```

Vercel automatically runs the build during deployment.

## 🔐 Environment Variables

If the project requires an API URL, create a `.env` file:

```env
VITE_API_URL=your_api_url
```

Do not commit `.env` files containing private credentials.

Add them to `.gitignore`:

```gitignore
.env
.env.local
.env.*.local
```

## 🧪 Development

Before pushing changes, run:

```bash
npm run build
```

Then check the Git status:

```bash
git status
```

Commit your changes:

```bash
git add .
git commit -m "Update roster functionality"
```

Push to GitHub:

```bash
git push origin main
```

## 📌 Future Improvements

* Role-based authentication
* Better swap approval workflow
* Staff availability management
* Drag-and-drop roster creation
* Notifications for roster changes
* Mobile-responsive improvements
* Audit history for roster changes
* Advanced roster conflict detection

## 👨‍💻 Author

**Muhammed Nishamudheen**

GitHub:
https://github.com/nizammhd

---

⭐ If you find this project useful, consider giving it a star!
