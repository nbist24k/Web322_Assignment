# Web322 Assignment

**Student Name**: Nirajan Bist  
**Student Number**: 157716226  
**Student Email**: nbist1@myseneca.ca  
**Date Created**: 2024/09/16  
**Last Modified**: 2024/11/21

**GitHub URL**: [https://github.com/nbist24k/Web322_Assignment.git](https://github.com/nbist24k/Web322_Assignment.git)  
**Vercel URL**: [https://web322-assignment-ten.vercel.app](https://web322-assignment-ten.vercel.app/)

## 🚀 Overview

A professional car blog application built with Node.js and Express.js, featuring article management, category filtering, and image uploads. The application showcases various automotive topics including Electric Vehicles, Sports Cars, Family SUVs, and Luxury Sedans.

## 🛠️ Technology Stack

### Frontend

- EJS templating engine for dynamic views
- Bootstrap 5 for responsive design
- Custom CSS for enhanced styling
- Bootstrap Icons for UI elements
- Client-side JavaScript for form validation

### Backend

- Node.js runtime environment
- Express.js web framework
- Multer for file upload handling
- Cloudinary for image storage
- Streamifier for buffer handling

### Development

- Nodemon for auto-reloading
- Vercel for deployment

## 📦 Dependencies

```json
{
  "cloudinary": "^2.5.1",
  "ejs": "^3.1.10",
  "express": "^4.21.0",
  "multer": "^1.4.5-lts.1",
  "streamifier": "^0.1.1"
}
```

## 🗄️ Project Structure

```
├── data/
│   ├── articles.json         # Article data
│   └── categories.json       # Category data
├── public/
│   └── css/
│       └── style.css        # Custom styles
├── views/
│   ├── 404.ejs             # Error page
│   ├── about.ejs           # About page
│   ├── addArticle.ejs      # Article form
│   ├── article.ejs         # Single article view
│   ├── articles.ejs        # Articles list
│   ├── categories.ejs      # Categories list
│   ├── home.ejs           # Homepage
│   └── partials/          # Reusable components
│       ├── head.ejs       # Common head content
│       ├── nav.ejs        # Navigation bar
│       ├── footer.ejs     # Footer component
│       └── scripts.ejs    # Common scripts
├── content-service.js      # Data layer
├── server.js              # Entry point
├── package.json          # Configuration
├── package-lock.json     # Dependency lock file
└── vercel.json          # Vercel deployment config
```

## 🌟 Features

### Article Management

- Create and view articles
- Individual article views
- Category name display
- Category-based filtering
- Date-based filtering
- Image upload support
- Publication status toggle
- Source URL attribution

### Categories

- Electric Vehicles
- Sports Cars
- Family SUVs
- Luxury Sedans
- Category-based article filtering
- Detailed category cards

### Image System

- Cloudinary integration
- JPG/PNG/GIF support
- 4.5MB size limit
- Automatic URL generation
- Responsive image display

## 🔌 API Endpoints

### Articles

```
GET  /articles                 - List all articles
GET  /articles?category=id     - Category filter
GET  /articles?minDate=date    - Date filter
GET  /article/:id             - Single article view
POST /articles/add            - Create article
```

### Categories

```
GET  /categories              - List categories
```

## 📝 Data Sources

### Articles

- [History of Electric Cars](https://www.energy.gov/articles/history-electric-car)
- [Top 10 Sports Cars of 2024](https://www.autocar.co.uk/car-news/best-cars/top-10-best-sports-cars)
- [Best SUVs for Families](https://www.autoweek.com/rankings/g45445032/best-family-suvs/)
- [Luxury Sedans](https://www.msn.com/en-us/autos/autos-luxury/20-timeless-luxury-sedans-that-embodied-elegance/ss-BB1qkDWW)

## 🚀 Setup Instructions

1. **Clone Repository**

   ```bash
   git clone https://github.com/nbist24k/Web322_Assignment.git
   cd Web322_Assignment
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Start Development Server**

   ```bash
   npm run dev
   ```

4. **Start Production Server**

   ```bash
   npm start
   ```

Access the application at: `http://localhost:4250`

## 🔒 Security Features

- File upload validation
- Size limit enforcement (4.5MB max)
- MIME type checking (JPG/PNG/GIF only)
- Error handling
- Input sanitization
- Published status verification

## 🎨 UI/UX Features

- Responsive design
- Mobile-first approach
- Intuitive navigation
- Form validation
- Error feedback
- Category badges
- Article cards
- Interactive tables
- Bootstrap icons integration

## 📱 Browser Support

- Chrome
- Firefox
- Safari
- Edge
- Mobile browsers

## 👤 Author

**Nirajan Bist**

- Student Number: 157716226
- Email: nbist1@myseneca.ca

## 📄 License

MIT License - See LICENSE file for details