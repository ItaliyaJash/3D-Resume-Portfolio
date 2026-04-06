# 3D Resume Portfolio - Italiya Jash

A modern, visually impressive 3D portfolio/resume website built with HTML, CSS, JavaScript, Tailwind CSS, and Node.js/Express backend.

![Portfolio Preview](./preview.png)

## ✨ Features

- **Modern 3D Design** - Glassmorphism, gradient backgrounds, floating elements, and 3D transforms
- **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- **Interactive Animations** - Smooth transitions, hover effects, typing animations, and scroll-triggered effects
- **Contact Form API** - Backend-powered contact form with validation
- **Performance Optimized** - Efficient CSS and JavaScript with minimal dependencies
- **SEO Friendly** - Proper meta tags and semantic HTML structure

## 🛠️ Tech Stack

### Frontend
- HTML5
- CSS3 (Custom + Tailwind CSS)
- JavaScript (ES6+)
- Tailwind CSS (via CDN)
- Font Awesome Icons
- Google Fonts (Inter, Fira Code)

### Backend
- Node.js
- Express.js
- CORS
- dotenv

## 📁 Project Structure

```
3d-resume/
├── public/
│   ├── index.html          # Main HTML file with all sections
│   ├── css/
│   │   └── styles.css      # Custom styles with 3D effects
│   └── js/
│       └── main.js         # JavaScript for animations and interactions
├── server/
│   └── server.js           # Express server with contact API
├── .env                    # Environment variables
├── .gitignore              # Git ignore file
├── package.json            # Node.js dependencies
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd 3d-resume
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Edit the `.env` file if needed:
   ```
   PORT=3000
   NODE_ENV=development
   ```

4. **Start the server**
   ```bash
   npm start
   ```

   For development with auto-reload:
   ```bash
   npm run dev
   ```

5. **Open in browser**
   
   Navigate to `http://localhost:3000`

## 🎨 Sections Included

| Section | Description |
|---------|-------------|
| **Hero** | Introduction with typing effect, 3D code block, and CTA buttons |
| **About** | Professional summary with experience badge and personal info |
| **Skills** | 10 skill cards with animated progress bars |
| **Projects** | 6 project cards with hover effects and links |
| **Experience** | Timeline showing work history and education |
| **Contact** | Form with validation connected to backend API |
| **Footer** | Social links and copyright info |

## 🎯 Customization Guide

### Personal Information

1. **Basic Info** - Edit `public/index.html`:
   - Name and role in Hero section
   - About section content
   - Experience/Education timeline
   - Contact information

2. **Skills** - Modify the skills grid in `public/index.html`:
   ```html
   <div class="skill-card glass">
     <div class="skill-icon"><i class="fab fa-js"></i></div>
     <h3 class="skill-name">JavaScript</h3>
     <div class="skill-bar">
       <div class="skill-progress" data-progress="90"></div>
     </div>
   </div>
   ```

3. **Projects** - Update project cards with your work:
   ```html
   <div class="project-card glass">
     <!-- Update image, title, description, tags, and links -->
   </div>
   ```

4. **Social Links** - Update all social media URLs:
   - GitHub
   - LinkedIn
   - Twitter
   - Email

### Styling

Edit `public/css/styles.css` to customize:
- Color scheme (CSS variables at top)
- Animation speeds
- Glassmorphism intensity
- Responsive breakpoints

### Backend

Modify `server/server.js` to:
- Add email sending functionality (use nodemailer)
- Connect to a database for storing submissions
- Add authentication or rate limiting

## 📧 Contact Form API

### Endpoint
```
POST /api/contact
```

### Request Body
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "Hello, I'd like to discuss a project..."
}
```

### Response (Success)
```json
{
  "success": true,
  "message": "Thank you for your message! I will get back to you soon."
}
```

### Response (Error)
```json
{
  "success": false,
  "errors": ["Name is required", "Valid email is required"]
}
```

## 🌐 Deployment

### Frontend + Backend (Recommended)

1. **Deploy to Vercel/Netlify + Railway/Render**
   - Frontend: Vercel or Netlify
   - Backend: Railway, Render, or Heroku

2. **Deploy to a VPS**
   - Use PM2 for process management
   - Configure Nginx as reverse proxy

### Quick Deploy Options

#### Vercel
```bash
npm install -g vercel
vercel
```

#### Railway
```bash
# Connect your GitHub repo to Railway
# Railway will auto-detect Node.js and deploy
```

## 🔧 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/contact` | Submit contact form |
| GET | `/*` | Serve frontend |

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start production server |
| `npm run dev` | Start development server with nodemon |

## 🔐 Security Notes

- The contact form currently logs submissions to console
- For production, integrate with an email service (SendGrid, Mailgun, etc.)
- Add rate limiting to prevent spam
- Consider adding reCAPTCHA for additional protection

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio!

## 📄 License

MIT License - Feel free to use this template for your personal portfolio.

## 👨‍💻 Author

**Italiya Jash**
- Portfolio: [Your Portfolio URL]
- GitHub: [@ItaliyaJash](https://github.com/ItaliyaJash)
- LinkedIn: [Italiya Jash](www.linkedin.com/in/jash-italiya-060862343)

---

Built with ❤️ using HTML, CSS, JavaScript, Tailwind CSS, and Node.js
