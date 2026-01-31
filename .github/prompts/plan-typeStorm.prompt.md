# TypeStorm - Typing Test Web App Plan

## Project Overview
Building a Monkeytype-style typing test web app for BSPC's Career Compass event at HITS college, where 11th grade students will participate in a typing challenge.

**Deadline:** Tomorrow (Event Date)
**Tech Stack:** Next.js, Tailwind CSS, ShadcnUI, TypeScript

---

## Key Questions & Requirements

### 1. Scope & Features (Critical for tomorrow)
- [ ] **Test Type:** Time-based or word-count based test? (e.g., 30s, 60s timer OR 25, 50 words)
- [ ] **Difficulty Levels:** Single difficulty or multiple? (easy/medium/hard word lists)
- [ ] **Leaderboard:** Do you need a leaderboard? (with names, scores display)
- [ ] **Results Screen:** Should display WPM, Accuracy, Errors?
- [ ] **Restart/Retry:** Functionality needed?

### 2. Branding Assets
- [ ] **HITS College Logo:** Available? (add to `/public` folder)
- [ ] **BSPC Club Logo:** Available? (add to `/public` folder)
- [ ] **Color Scheme:** Any specific college/club colors to use?
- [ ] **Typography:** Any preferred fonts?

### 3. Settings/Customization
- [ ] **Test Duration Options:** Should students choose test duration (15s/30s/60s)?
- [ ] **Fixed Settings:** Or predetermined by admin?
- [ ] **Theme:** Dark/light mode toggle needed?
- [ ] **Sound Effects:** Keyboard sounds, completion sounds?

### 4. Data/Content
- [ ] **Word List Source:** Built-in word list or specific words/quotes?
- [ ] **Language:** English words only? Technical terms included?
- [ ] **Word Count:** How many words in the pool?
- [ ] **Content Type:** Random words, quotes, programming-related terms?

### 5. Deployment
- [ ] **Hosting Platform:** Vercel/Netlify for quick deploy?
- [ ] **Demo Type:** Local demo or live URL needed?
- [ ] **Domain:** Custom domain or default hosting URL?

---

## Proposed Features (Based on Monkeytype)

### Core Features
1. **Typing Test Interface**
   - Display words/text to type
   - Real-time input validation
   - Highlight correct/incorrect characters
   - Cursor indicator

2. **Timer & Progress**
   - Countdown timer
   - Progress bar or word counter
   - Live WPM display

3. **Results Screen**
   - Words Per Minute (WPM)
   - Accuracy percentage
   - Error count
   - Time taken
   - Option to retry/restart

4. **Branding**
   - HITS college logo in header
   - BSPC club logo
   - Custom color scheme
   - Event name display

### Nice-to-Have Features (If Time Permits)
- [ ] Leaderboard (top scores)
- [ ] Student name input before test
- [ ] Multiple test modes (time/word count)
- [ ] Keyboard heatmap
- [ ] Sound effects toggle
- [ ] Share results capability
- [ ] Dark/light theme toggle

---

## Technical Implementation Plan

### Phase 1: Setup & Core Structure
- [x] Next.js project initialized
- [x] Tailwind CSS configured
- [x] ShadcnUI components ready
- [ ] Project structure setup
- [ ] Branding assets added

### Phase 2: Core Typing Test
- [ ] Word generation system
- [ ] Typing input component
- [ ] Character validation logic
- [ ] Timer implementation
- [ ] WPM/Accuracy calculation

### Phase 3: UI/UX
- [ ] Main typing interface
- [ ] Results screen
- [ ] Header with logos
- [ ] Responsive design
- [ ] Animations (from Aceternity/MagicUI/Reactbits)

### Phase 4: Polish & Deploy
- [ ] Testing with sample data
- [ ] Performance optimization
- [ ] Deployment to hosting
- [ ] Final testing

---

## Questions for Aravindakshan

1. **What is the primary goal?** Competition (leaderboard) or just practice/demo?
2. **Test duration preference?** Suggest: 30 seconds or 60 seconds for quick rounds
3. **Do you have the logo files ready?** If yes, please add to `/public` folder
4. **Color scheme?** HITS/BSPC brand colors?
5. **Any specific words/themes?** Tech terms, general English, motivational quotes?
6. **Will you track student names?** Or anonymous participation?

---

## Recommended Minimal Viable Product (MVP) for Tomorrow

### Must-Have
1. Clean typing interface with real-time feedback
2. Single test mode: 60-second timer
3. Results screen: WPM, Accuracy, Errors
4. HITS + BSPC branding (logos, colors)
5. Restart functionality
6. Responsive design

### Skip for Now (Post-Event)
- Leaderboard with backend
- Multiple difficulty levels
- User accounts/authentication
- Advanced statistics

---

## Next Steps

1. **Get clarifications** on the questions above
2. **Add branding assets** to `/public` folder
3. **Implement core typing test** functionality
4. **Add animations** from component libraries
5. **Test and deploy** before event

---

## Notes

- Event: Career Compass @ HITS
- Audience: 11th grade school students
- Purpose: Showcase BSPC programming club capabilities
- Timeline: Must be ready by tomorrow
