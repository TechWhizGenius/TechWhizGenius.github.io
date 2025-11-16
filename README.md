# Welcome to My Portfolio

A modern, responsive personal portfolio website showcasing professional experience, education, projects, and contact information. Built with React and Vite for optimal performance and developer experience.

**Live Site:** [https://techwhizgenius.github.io/](https://techwhizgenius.github.io/)

## Features

- 🎨 **Dark/Light Theme Toggle** - Smooth theme switching with persistent preferences
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- ⚡ **Fast Performance** - Built with Vite for rapid development and optimized production builds
- 🎭 **Interactive Animations** - Smooth transitions, particle effects, and typing animations
- 🧭 **Smooth Navigation** - React Router for seamless page transitions
- ♿ **Accessible** - Focus states, semantic HTML, and ARIA labels
- 📊 **Multiple Sections** - Home, Experience, Education, Projects, and Contact

## Tech Stack

- **Frontend:** React 19
- **Build Tool:** Vite 7
- **Routing:** React Router 7
- **Styling:** CSS3 with CSS Variables for theming
- **Deployment:** GitHub Pages
- **Package Manager:** npm

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/TechWhizGenius/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:5173/`

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production (creates `dist/` folder) |
| `npm run preview` | Preview production build locally |
| `npm run deploy` | Build and deploy to GitHub Pages |
| `npm run lint` | Check code for errors and style issues |

## Deployment

This portfolio is deployed to GitHub Pages using the `gh-pages` package.

### Deploy to GitHub Pages

```bash
npm run deploy
```

This command:
1. Builds the React app for production
2. Pushes the built files to the `gh-pages` branch
3. Updates the live site automatically

**Note:** The site is built and deployed from the `main` branch.

## Project Structure

```
portfolio/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Home.jsx
│   │   ├── Experience.jsx
│   │   ├── Education.jsx
│   │   ├── Contact.jsx
│   │   └── Navbar.jsx
│   ├── pages/              # Page components
│   │   ├── HomePage.jsx
│   │   └── ProjectsPage.jsx
│   ├── App.jsx             # Main app component
│   ├── ThemeContext.jsx    # Theme context provider
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
│   └── images/
│       └── profile.jpg
├── package.json
├── vite.config.js
└── README.md
```
## License

This project is open source and available under the MIT License.

## Contact

For inquiries or feedback, reach out at: **https://www.linkedin.com/in/teja-mandaloju/**

---

**Last Updated:** November 2025
