# 🛡️ The Focus Warden
**A high-contrast, productivity-first Chrome Extension designed to reclaim your mental space**

<p align="center">
<img src="assets/image/mockup-display.png" alt="Focus Warden Mockup" width="900">
</p>

Focus Warden is a productivity tool built with **Manifest V3** that allows users to block distracting websites with a high-performance filtering engine.

## ✨ Key Features
* **Instant Block**: Uses `declarativeNetRequest` for efficient, browser-level URL filtering.
* **Mindset Check**: A minimalist, 5-second countdown page to discourage impulsive browsing.
* **Quick-Pick Chips**: Fast access to block the most common distractions (FB, YT, IG, TK).
* **Cyberpunk UI**: A neon-accented dark mode interface for a modern user experience.

## 🛠️ Tech Stack
* **JavaScript (ES6+)**: Modular logic with Event Delegation and Destructuring.
* **Chrome Extensions API**: Manifest V3, Storage API, Declarative Net Request.
* **CSS3**: Custom properties (variables), Flexbox, and CSS animations.

## 📂 Project Structure
* `/popup`: UI logic and layout.
* `/blocked`: The custom redirect page.
* `/css`: Global styles and neon variables.
* `/assets`: All graphic resources (icons and documentation images).

## 📸 Interface Preview

| Feature: Extension UI | Feature: Mindset Check (Blocked Page) |
| :---: | :---: |
| <img src="assets/image/extension-ui.png" width="400"> | <img src="assets/image/warden-gate.png" width="400"> |

## ⚙️ Installation
1. Clone this repository.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode".
4. Click "Load unpacked" and select the project folder.