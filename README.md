# Ali Ashraf - Portfolio Website

A modern, professional, and responsive personal portfolio website for showcasing Data Science and Machine Learning projects.

![Portfolio Preview](assets/images/preview.png)

## 🚀 Features

- **Modern Design**: Clean, professional UI with a blue/green color palette
- **Fully Responsive**: Mobile-first design that works on all devices
- **Fast Loading**: Optimized assets and minimal dependencies
- **SEO Friendly**: Proper meta tags and semantic HTML
- **Smooth Animations**: Subtle fade-in effects and smooth scrolling
- **Contact Form Ready**: Integrated with Formspree for form submissions
- **Accessible**: ARIA labels and keyboard navigation support

## 📁 Project Structure

```
Portfolio/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # All styles (CSS variables, responsive design)
├── js/
│   └── main.js         # JavaScript (navigation, animations, form handling)
├── assets/
│   └── images/         # Images and media (add your photos here)
└── README.md           # This file
```

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Custom properties, Flexbox, Grid, animations
- **JavaScript**: ES6+, Intersection Observer API
- **Google Fonts**: Inter (primary), Fira Code (monospace)
- **Font Awesome**: Icons

## 🏃‍♂️ Getting Started

### Run Locally

1. **Clone or download the repository:**
   ```bash
   git clone https://github.com/aliashraf407/portfolio.git
   cd portfolio
   ```

2. **Open in browser:**
   - Simply open `index.html` in your browser, or
   - Use a local server for best results:
   
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (npx)
   npx serve
   
   # Using VS Code
   # Install "Live Server" extension and click "Go Live"
   ```

3. **View the website:**
   Open `http://localhost:8000` in your browser

## 📝 Customization

### Personal Information

Edit `index.html` to update:
- Name and title in the hero section
- About me text
- Social media links
- Contact information
- Project details

### Colors

Edit CSS variables in `css/style.css`:

```css
:root {
    --primary-color: #2563eb;      /* Main blue */
    --secondary-color: #10b981;    /* Green accent */
    --text-primary: #1f2937;       /* Dark text */
    --bg-primary: #ffffff;         /* Background */
}
```

### Contact Form

To enable the contact form:

1. Sign up at [Formspree](https://formspree.io)
2. Create a new form and get your form ID
3. Update the form action in `index.html`:

```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

### Adding Profile Photo

1. Add your photo to `assets/images/profile.jpg`
2. Replace the avatar icon in the hero section with an `<img>` tag

## 🚀 Deployment

### GitHub Pages (Free)

1. **Create a GitHub repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Select "main" branch and "/ (root)" folder
   - Click Save
   - Your site will be live at `https://YOUR_USERNAME.github.io/portfolio`

### Netlify (Free)

1. **Option A: Drag & Drop**
   - Go to [Netlify](https://netlify.com)
   - Drag your project folder to the deploy area

2. **Option B: Git Integration**
   - Connect your GitHub repository
   - Netlify will auto-deploy on every push

**Custom Domain Setup:**
- Add your domain in Netlify Site Settings → Domain Management
- Update DNS records as instructed

### Vercel (Free)

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Or connect your GitHub repository at [vercel.com](https://vercel.com)

## 📋 Checklist Before Deployment

- [ ] Update all personal information
- [ ] Replace placeholder links with real URLs
- [ ] Add actual project GitHub/demo links
- [ ] Set up contact form (Formspree)
- [ ] Add profile photo (optional)
- [ ] Update social media links
- [ ] Test on mobile devices
- [ ] Check all links work
- [ ] Verify contact form submission

## 🔧 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Ali Ashraf**
- GitHub: [@ali-abofouda](https://github.com/ali-abofouda)
- LinkedIn: [ali-ashraf-8b619b22a](https://www.linkedin.com/in/ali-ashraf-8b619b22a/)
- X (Twitter): [@realaliashraf](https://x.com/realaliashraf)
- Email: aliashraf407@gmail.com

---

⭐ If you found this helpful, please consider giving it a star!
