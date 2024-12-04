# Web322 Assignment

**Student Name**: Nirajan Bist  
**Student Number**: 157716226  
**Student Email**: nbist1@myseneca.ca  
**Date Created**: 2024/09/16  
**Last Modified**: 2024/12/04

**GitHub URL**: [https://github.com/nbist24k/Web322_Assignment.git](https://github.com/nbist24k/Web322_Assignment.git)  
**Vercel URL**: [https://web322-assignment-ten.vercel.app](https://web322-assignment-ten.vercel.app/)

## 🚀 Overview

A professional car blog application built with Node.js, Express.js, and PostgreSQL, featuring article management, category filtering, and image uploads. The application showcases various automotive topics including Electric Vehicles, Sports Cars, Family SUVs, and Luxury Sedans.

## 📂 Project Structure

```
web322-assignment/
├── models/                    # Database models
│   ├── index.js              # Database configuration and associations
│   ├── article.js            # Article model definition
│   └── category.js           # Category model definition
│
├── public/                    # Static assets
│   └── css/
│       └── style.css         # Custom styles
│
├── views/                     # EJS templates
│   ├── partials/             # Reusable template parts
│   │   ├── head.ejs         # Common head content
│   │   ├── nav.ejs          # Navigation bar
│   │   ├── footer.ejs       # Footer component
│   │   └── scripts.ejs      # Common scripts
│   │
│   ├── 404.ejs              # Error page
│   ├── about.ejs            # About page
│   ├── addArticle.ejs       # Add article form
│   ├── article.ejs          # Single article view
│   ├── articles.ejs         # Articles list
│   ├── categories.ejs       # Categories list
│   ├── editArticle.ejs      # Edit article form
│   └── home.ejs             # Homepage
│
├── .env                      # Environment variables (not in version control)
├── .gitignore               # Git ignore file
├── content-service.js        # Data access layer
├── package.json             # Project dependencies and scripts
├── README.md                # Project documentation
├── server.js                # Application entry point
├── setup.sql                # Database setup script
└── vercel.json              # Vercel deployment configuration
```

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
- Sequelize ORM for database operations
- PostgreSQL database hosted on Neon.tech
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
  "dotenv": "^16.4.5",
  "ejs": "^3.1.10",
  "express": "^4.21.0",
  "multer": "^1.4.5-lts.1",
  "pg": "^8.13.1",
  "pg-hstore": "^2.3.4",
  "sequelize": "^6.37.5",
  "streamifier": "^0.1.1"
}
```

## 🗄️ Project Configuration

### Environment Variables

Create a `.env` file in the project root with the following structure:

```env
# Server Configuration
PORT=<port_number>

# Database Configuration
DB_NAME=<database_name>
DB_USER=<database_user>
DB_PASSWORD=<database_password>
DB_HOST=<database_host>
DB_PORT=<database_port>

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=<cloud_name>
CLOUDINARY_API_KEY=<api_key>
CLOUDINARY_API_SECRET=<api_secret>
```

### Database Schema

The application uses a PostgreSQL database with the following schema:

```sql
-- Create Categories Table
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

-- Create Articles Table
CREATE TABLE articles (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    categoryid INTEGER REFERENCES categories(id),
    published BOOLEAN DEFAULT false,
    publisheddate DATE DEFAULT CURRENT_DATE,
    featureimage VARCHAR(255),
    source VARCHAR(255)
);
```

## 🔌 API Endpoints

### Articles

```
GET  /articles                 - List all articles
GET  /articles?category=id     - Category filter
GET  /articles?minDate=date    - Date filter
GET  /article/:id             - Single article view
POST /articles/add            - Create article
PUT  /articles/:id            - Update article
DELETE /articles/:id          - Delete article
```

### Categories

```
GET  /categories              - List categories
```

## 🚀 Setup Instructions

1. Clone Repository

   ```bash
   git clone https://github.com/nbist24k/Web322_Assignment.git
   cd Web322_Assignment
   ```

2. Install Dependencies

   ```bash
   npm install
   ```

3. Environment Setup

   - Create `.env` file in the project root
   - Add the required environment variables following the structure above
   - Replace placeholder values with your actual credentials
   - Never commit `.env` to version control

4. Database Setup

   - Create a PostgreSQL database on Neon.tech
   - Execute the schema SQL commands to create tables
   - Configure database connection using environment variables

5. Start Development Server

   ```bash
   npm run dev
   ```

6. Start Production Server
   ```bash
   npm start
   ```

Access the application at: `http://localhost:<PORT>`

## 🔒 Security Features

- Environment variable configuration
- Database connection encryption (SSL)
- Connection pooling and retry mechanisms
- File upload validation
- Size limit enforcement (4.5MB max)
- MIME type checking
- Input sanitization
- Error handling

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
