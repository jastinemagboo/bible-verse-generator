# 📖 Bible Verse Generator

A simple, minimalist web app that displays a random Bible verse (NIV) with meaning and reflection.
Built with React, Vite, TypeScript, TailwindCSS, and Lucide Icons.

This project is designed not just as a coding exercise, but also as a way to encourage and motivate others in their daily lives through God's Word.

---

## Features

- Generate a random Bible verse on button click
- Includes reference, verse text, and short description
- Copy verse to clipboard with one click (with “Copied” toast)
- Remembers the last verse shown using local storage
- Clean and responsive design (TailwindCSS)
- Uses NIV translation for modern readability

---

## Tech Stack

- **React** (TypeScript)
- **Tailwind CSS** (for responsive styling)
- **Lucide Icons** (icons)

---

## Project Structure

```plaintext
src/
 ├── components/
 │   └── VerseCard.tsx    # Main component for rendering verses
 ├── data/
 │   └── verses.json      # Bible verses (NIV)
 ├── App.tsx              # Root component
 ├── main.tsx             # App entry point
 └── index.css            # Tailwind base styles

```

---

## How to Run locally

To run the app locally, simply execute the following command using bash:

1. **Clone the repository**

- git clone <repository-url>
- cd <project-folder>

2. **Install dependencies**

- npm install

3. **Run the web app**

- npm run dev

---

## Credits

- Verses from the Holy Bible, New International Version (NIV)
- Built with ❤️ and faith by Jastine
