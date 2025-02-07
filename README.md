# Web322 Assignment

## 🚀 Overview

A professional car blog application built with Node.js, Express.js, and PostgreSQL, featuring article management, category filtering, and image uploads. The application showcases various automotive topics including Electric Vehicles, Sports Cars, Family SUVs, and Luxury Sedans.

## 🛠️ Technology Stack

### Frontend

- EJS templating engine
- Bootstrap 5
- Custom CSS
- Bootstrap Icons
- Client-side JavaScript

### Backend

- Node.js & Express.js
- PostgreSQL (Neon.tech)
- Sequelize ORM
- Multer for file uploads
- Cloudinary for image storage
- Streamifier for buffer handling

### Development

- Nodemon
- pgAdmin 4
- Vercel deployment

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

<<<<<<< HEAD
## 🗄️ Project Configuration

```
├── models/
│   ├── index.js           # Database configuration and model associations
│   ├── article.js         # Article model definition
│   └── category.js        # Category model definition
├── public/
│   └── css/
│       └── style.css      # Custom styles
├── views/
│   ├── 404.ejs           # Error page
│   ├── about.ejs         # About page
│   ├── addArticle.ejs    # Article creation form
│   ├── article.ejs       # Single article view
│   ├── articles.ejs      # Articles list
│   ├── categories.ejs    # Categories list
│   ├── editArticle.ejs   # Article edit form
│   ├── home.ejs         # Homepage
│   └── partials/        # Reusable components
├── content-service.js    # Data access layer
├── server.js            # Application entry point
├── setup.sql           # Database setup script
├── .env               # Environment variables
├── package.json       # Project configuration
└── vercel.json       # Vercel deployment config
```

## ⚙️ Prerequisites

1. **Node.js and npm**

   - Download and install from [Node.js website](https://nodejs.org/)
   - Verify installation:
     ```bash
     node --version
     npm --version
     ```

2. **PostgreSQL Database (Neon.tech)**

   - Sign up at [Neon.tech](https://neon.tech)
   - Create a new project
   - Save your database credentials
   - Documentation: [Neon.tech Docs](https://neon.tech/docs/get-started-with-neon/signing-up)

3. **pgAdmin 4**

   - Download from [pgAdmin website](https://www.pgadmin.org/download/)
   - Install and configure
   - Use to manage your PostgreSQL database
   - Documentation: [pgAdmin Docs](https://www.pgadmin.org/docs/)

=======
## 🗄️ Project Structure

```
├── models/
│   ├── index.js           # Database configuration and model associations
│   ├── article.js         # Article model definition
│   └── category.js        # Category model definition
├── public/
│   └── css/
│       └── style.css      # Custom styles
├── views/
│   ├── 404.ejs           # Error page
│   ├── about.ejs         # About page
│   ├── addArticle.ejs    # Article creation form
│   ├── article.ejs       # Single article view
│   ├── articles.ejs      # Articles list
│   ├── categories.ejs    # Categories list
│   ├── editArticle.ejs   # Article edit form
│   ├── home.ejs         # Homepage
│   └── partials/        # Reusable components
├── content-service.js    # Data access layer
├── server.js            # Application entry point
├── setup.sql           # Database setup script
├── .env               # Environment variables
├── package.json       # Project configuration
└── vercel.json       # Vercel deployment config
```

## ⚙️ Prerequisites

1. **Node.js and npm**

   - Download and install from [Node.js website](https://nodejs.org/)
   - Verify installation:
     ```bash
     node --version
     npm --version
     ```

2. **PostgreSQL Database (Neon.tech)**

   - Sign up at [Neon.tech](https://neon.tech)
   - Create a new project
   - Save your database credentials
   - Documentation: [Neon.tech Docs](https://neon.tech/docs/get-started-with-neon/signing-up)

3. **pgAdmin 4**

   - Download from [pgAdmin website](https://www.pgadmin.org/download/)
   - Install and configure
   - Use to manage your PostgreSQL database
   - Documentation: [pgAdmin Docs](https://www.pgadmin.org/docs/)

>>>>>>> d660d40 (Updated readme for the necessary installation and setup instruction)
4. **Cloudinary Account**
   - Register at [Cloudinary](https://cloudinary.com/users/register/free)
   - Get your credentials from the dashboard
   - Documentation: [Cloudinary Docs](https://cloudinary.com/documentation)

## 🚀 Setup Instructions

1. **Clone Repository**

   ```bash
   git clone https://github.com/nbist24k/Web322_Assignment.git
   cd Web322_Assignment
   ```

2. **Environment Configuration**
   Create a `.env` file in the project root with the following structure:

   ```env
   # Server Configuration
   PORT=4250

   # Database Configuration
   DB_NAME=your_database_name
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_HOST=your_neon_host
   DB_PORT=5432

   # Cloudinary Configuration
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

3. **Database Setup**

   - Connect to your Neon.tech database using pgAdmin
   - Run the `setup.sql` script to create tables and insert initial data

4. **Install Dependencies**

   ```bash
   npm install
   ```

5. **Start Development Server**

   ```bash
   npm run dev
   ```

6. **Start Production Server**
   ```bash
   npm start
   ```

Access the application at: `http://localhost:4250`

## 🌟 Features

### Article Management

- CRUD operations for articles
- Image upload with Cloudinary
- Category assignment
- Publication status control
- Source URL attribution

### Categories

- Predefined categories
- Category-based filtering
- Category management

### Image System

- Cloudinary integration
- Support for JPG/PNG/GIF
- 4.5MB size limit
- Automatic URL generation

## 🔌 API Endpoints

### Articles

```
GET    /articles                 # List all articles
GET    /articles?category=id     # Filter by category
GET    /articles?minDate=date    # Filter by date
GET    /article/:id             # View single article
POST   /articles/add            # Create article
PUT    /articles/:id            # Update article
DELETE /articles/:id            # Delete article
```

### Categories

```
GET    /categories              # List all categories
```

## 🌟 Features

### Article Management

- CRUD operations for articles
- Image upload with Cloudinary
- Category assignment
- Publication status control
- Source URL attribution

### Categories

- Predefined categories
- Category-based filtering
- Category management

### Image System

- Cloudinary integration
- Support for JPG/PNG/GIF
- 4.5MB size limit
- Automatic URL generation

## 🔌 API Endpoints

### Articles

```
GET    /articles                 # List all articles
GET    /articles?category=id     # Filter by category
GET    /articles?minDate=date    # Filter by date
GET    /article/:id             # View single article
POST   /articles/add            # Create article
PUT    /articles/:id            # Update article
DELETE /articles/:id            # Delete article
```

### Categories

```
GET    /categories              # List all categories
```

## 🔒 Security Features

- Environment variable protection
- File upload validation
- Size limit enforcement
- MIME type checking
- Error handling
- Input sanitization

## 📄 License

MIT License - See LICENSE file for details
