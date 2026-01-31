# TypeStorm ⚡

A modern, Monkeytype-inspired typing speed test web application built for the **Blue Screen Programming Club (BSPC)** at **Hindustan Institute of Technology and Science (HITS)**. Designed specifically for the **Career Compass 2026** event to showcase typing skills to visiting 11th-grade students.

## 🎯 Features

### Core Functionality

- **Typing Test Modes:**
  - ⏱️ Time-based (default: 60 seconds)
  - 📝 Word-count based (customizable)
- **Difficulty Levels:**
  - 🟢 Easy - Basic HITS-related terms
  - 🟡 Medium - HITS achievements and departments
  - 🔴 Hard - Complex phrases and technical terms

- **Storm Points Scoring:**
  - Unique scoring system: `WPM × (Accuracy / 100)`
  - Rewards both speed AND accuracy
  - Prevents careless high-speed typing

- **Real-time Statistics:**
  - Words Per Minute (WPM)
  - Accuracy percentage
  - Error count
  - Storm Points

### Advanced Features

- 🏆 **Leaderboard System** with localStorage
- 👥 **Auto-numbered Students** (student1, student2, etc.)
- 🎨 **Dark/Light Theme Toggle**
- 💎 **Glassmorphism UI** with backdrop blur effects
- 🖥️ **Fullscreen Mode** for kiosk display
- 🔐 **Admin Panel** with password protection
- 📊 **Comprehensive Results Screen**
- 🎯 **HITS-themed Word Lists** promoting college achievements

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## 🎮 Usage Guide

### For Students

1. Start typing in the input field - test begins automatically
2. Complete the test (time/word-based)
3. View your Storm Points, WPM, and Accuracy
4. Click "Try Again" for another attempt

### For Admins

1. Navigate to `/admin` or click ⚙️ Settings
2. Login with password: `bspc2026`
3. Configure test settings (mode, duration, difficulty)
4. Reset leaderboard between classes
5. Use fullscreen mode for kiosk display

## 🛠️ Tech Stack

- Next.js 16.1.6 (App Router)
- React 19.2.3
- Tailwind CSS v4
- ShadcnUI Components
- TypeScript
- next-themes

## 📝 Default Settings

- **Admin Password:** `bspc2026`
- **Test Mode:** Time-based
- **Duration:** 60 seconds
- **Difficulty:** Medium
- **Theme:** Dark mode

## 🎓 About

**Event:** Career Compass 2026  
**Department:** Computer Science & Engineering  
**College:** Hindustan Institute of Technology and Science  
**Club:** Blue Screen Programming Club (BSPC)

Made with ❤️ and ⌨️ by BSPC!
