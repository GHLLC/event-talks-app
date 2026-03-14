# TechTalks One-Day Event Website

A modern, high-performance, single-track event website designed for technical conferences. This app features a dynamic scheduling engine, a sleek dark theme, and real-time category-based search highlighting.

## 🚀 Features

- **Dynamic Scheduling Engine:** Automatically calculates session timings, 10-minute transitions, and lunch breaks based on a 10:00 AM start time.
- **Real-time Search Highlighting:** Interactive search bar that highlights matching talk categories with a "glow and scale" effect without breaking the chronological flow.
- **Modern Tech Aesthetic:** A responsive dark-themed UI built with Inter typography and a Slate/Sky-blue color palette.
- **Data-Driven:** Content is decoupled from the code and managed via a simple `talks.json` file.
- **Lightweight Backend:** Powered by Node.js and Express for fast static file delivery.

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** Standard HTML5, CSS3 (CSS Grid/Flexbox), Vanilla JavaScript (ES6+)
- **Data Format:** JSON

## 📦 Installation & Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/GHLLC/event-talks-app.git
   cd event-talks-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the application:**
   ```bash
   npm start
   ```

4. **View in browser:**
   Open [http://localhost:8080](http://localhost:8080) to see the app in action.

## 📂 Project Structure

```text
├── public/
│   ├── index.html    # Main page structure
│   ├── style.css     # Dark theme and highlighting animations
│   ├── script.js     # Scheduling logic and search interaction
│   └── talks.json    # Event content (titles, speakers, categories)
├── server.js         # Node.js Express server
└── package.json      # Dependencies and scripts
```

## ⚙️ Configuration

To modify the event schedule, update the `talks.json` file. The timing engine in `script.js` handles the rest. You can adjust the following constants in `public/script.js`:

- `START_TIME`: Default is `10:00`.
- `TALK_DURATION`: Default is `60` minutes.
- `TRANSITION_TIME`: Default is `10` minutes.
- `LUNCH_DURATION`: Default is `60` minutes.

## 📝 License

This project is open-source and available under the MIT License.
