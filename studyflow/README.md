# 📚 StudyFlow

A modern student productivity dashboard built with **Next.js**, **React**, **TypeScript**, and **Tailwind CSS**.

StudyFlow helps students organize their study schedule, manage notes, track goals, and improve focus using the Pomodoro technique—all in a clean, responsive interface with Light/Dark mode support.

---

## ✨ Features

### 📊 Dashboard
- Personalized welcome section
- Productivity statistics
- Daily motivational quote
- Responsive dashboard cards

### 📅 Study Planner
- Create study sessions
- Select subject, priority, and time slot
- Mark sessions as completed
- Delete sessions
- Local storage persistence

### 📝 Notes
- Create subject-wise notes
- Search notes instantly
- Delete notes
- Responsive card layout

### ⏱ Pomodoro Timer
- Pomodoro
- Short Break
- Long Break
- Start / Pause / Reset controls
- Session counter
- Local storage persistence

### 🎯 Goal Tracker
- Create study goals
- Progress tracking
- Increase/Decrease progress
- Deadline management
- Progress bar visualization

### ⚙ Settings
- Light Mode / Dark Mode
- Local storage preferences
- Clear application data

### 🔐 Authentication
- Frontend authentication
- Login page
- Protected dashboard routes
- Persistent user session

---

# 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 15 | React Framework |
| React 19 | UI Library |
| TypeScript | Type Safety |
| Tailwind CSS 4 | Styling |
| Font Awesome | Icons |
| Local Storage | Data Persistence |

---

# 📂 Project Structure

```
studyflow
│
├── app
│   ├── login
│   ├── (dashboard)
│   │   ├── planner
│   │   ├── notes
│   │   ├── goals
│   │   ├── timer
│   │   ├── settings
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── globals.css
│   └── layout.tsx
│
├── components
│   ├── auth
│   ├── dashboard
│   ├── goals
│   ├── layout
│   ├── notes
│   ├── planner
│   ├── timer
│   └── ui
│
├── context
├── hooks
├── data
├── lib
├── types
└── utils
```

---

# 🚀 Installation

Clone the repository

```bash
git clone https://github.com/your-username/studyflow.git
```

Go to the project folder

```bash
cd studyflow
```

Install dependencies

```bash
npm install
```

Run the development server

```bash
npm run dev
```

Open

```
http://localhost:3000
```

---

Feel free to use and modify it for learning purposes.