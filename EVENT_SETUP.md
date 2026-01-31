# TypeStorm - Event Setup Guide 🚀

Quick guide for setting up TypeStorm at the Career Compass 2026 event.

## Pre-Event Checklist ✅

### 1. Technical Setup

- [ ] Computer with browser (Chrome/Edge recommended)
- [ ] Stable internet connection (or run locally)
- [ ] External keyboard (optional, for better typing experience)
- [ ] Large monitor/screen for better visibility

### 2. Software Setup

```bash
# Navigate to project
cd "C:/College shit/BSPC-TypeStorm/typestorm"

# Install dependencies (if not done)
npm install

# Start the server
npm run dev
```

### 3. Browser Setup

- Open: `http://localhost:3000`
- Enable fullscreen (click maximize icon in header)
- Set theme preference (dark mode recommended)
- Test typing to ensure everything works

## During the Event 🎯

### For Each Class Group:

**1. Before Students Arrive:**

- Reset leaderboard from admin panel (`/admin`)
  - Password: `bspc2026`
  - Click "Reset Leaderboard" button
- Verify settings are correct
- Enable fullscreen mode

**2. Student Instructions (Brief Them):**

```
Welcome to TypeStorm!

1. You'll see words on the screen
2. Start typing them in the input box below
3. Test runs for 60 seconds (or as configured)
4. Your score = Storm Points (WPM × Accuracy / 100)
5. Try to be both FAST and ACCURATE!
6. After finishing, you can take another test
```

**3. After Each Student:**

- Results display automatically
- Student name auto-increments (student1, student2...)
- Score saves to leaderboard automatically
- Student can click "Try Again" or "View Leaderboard"

**4. Between Class Groups:**

- Go to admin panel (`/admin`)
- Click "Reset Leaderboard"
- This clears all scores and resets student counter
- Ready for next class!

## Admin Panel Quick Reference 🔐

**Access:** Click ⚙️ icon in header or go to `/admin`  
**Password:** `bspc2026`

### Available Settings:

| Setting    | Options              | Default |
| ---------- | -------------------- | ------- |
| Test Mode  | Time / Words         | Time    |
| Duration   | 15-300 seconds       | 60s     |
| Word Count | 10-200 words         | 50      |
| Difficulty | Easy / Medium / Hard | Medium  |

### When to Change Settings:

- **Easy:** Younger students, beginners
- **Medium:** Average typists, default
- **Hard:** Advanced typists, show-off mode

- **30s:** Quick rounds, long queues
- **60s:** Standard test (recommended)
- **120s:** Endurance test

## Troubleshooting 🔧

### Issue: Page won't load

**Solution:**

```bash
# Check if server is running
npm run dev

# If port 3000 is busy
PORT=3001 npm run dev
```

### Issue: Leaderboard not showing

**Solution:**

- Check browser console (F12)
- Clear browser cache (Ctrl + Shift + R)
- Reset leaderboard from admin panel

### Issue: Theme not working

**Solution:**

- Refresh page
- Check if next-themes is loaded
- Use theme toggle in header

### Issue: Fullscreen not working

**Solution:**

- Press F11 manually
- Click maximize icon in header
- Some browsers block fullscreen - use F11

## Tips for Best Experience 💡

1. **Queue Management:**
   - Have students line up
   - One student at a time
   - 1-2 minutes per student (test + viewing results)

2. **Engagement:**
   - Show leaderboard on screen between students
   - Announce top scores periodically
   - Create friendly competition

3. **Branding:**
   - Point out HITS logos
   - Mention BSPC (Blue Screen Programming Club)
   - Highlight CSE department
   - Explain HITS-themed words

4. **Technical:**
   - Keep admin panel open in another tab
   - Monitor for any issues
   - Have backup plan (refresh browser if needed)

## Quick Commands 📝

```bash
# Start server
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Check for errors
npm run lint
```

## Contact & Support 📞

**Event Coordinator:** Aravindakshan R (VP, BSPC)  
**Admin Password:** bspc2026  
**Default URL:** http://localhost:3000  
**Admin URL:** http://localhost:3000/admin

## Post-Event 📊

1. **Export Leaderboard (Manual):**
   - Open browser console (F12)
   - Run: `JSON.stringify(localStorage.getItem('typestorm_leaderboard'))`
   - Copy and save for records

2. **Reset Everything:**
   - Admin panel → Reset Leaderboard
   - Or clear localStorage manually

3. **Feedback:**
   - Note any issues encountered
   - Gather student feedback
   - Document for future events

---

**Good luck with the event! 🎉**  
_Remember: The goal is to showcase HITS and BSPC, not just test typing speed!_
