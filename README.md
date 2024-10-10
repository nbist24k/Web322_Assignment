# Web322 Assignment

**Student Name**: Nirajan Bist <br>
**Student Number**: 157716226 <br>
**Student Email**: nbist1@myseneca.ca <br>
**Date Created**: 2024/09/16 <br>

**GitHub URL**: [https://github.com/nbist24k/Web322_Assignment.git](https://github.com/nbist24k/Web322_Assignment.git) <br>
**Vercel URL**: [https://web322-assignment-ten.vercel.app](https://web322-assignment-ten.vercel.app) <br>

## Overview

This project is a simple web application built with **Node.js** and **Express.js**. It fetches and displays articles and categories from local JSON files, and provides several routes for accessing this data, alongside static pages like the home and about pages.

## Technology Stack

### **Frontend**:

- **HTML**: Used for structuring the views such as home, about, etc.
- **CSS**: Styling for the frontend, including a custom `main.css` file.
- **Bootstrap**: For basic responsive layout and design.

### **Backend**:

- **Node.js**: JavaScript runtime used to build the server.
- **Express.js**: Web framework for Node.js, used for routing and serving static files.
- **File System (fs)**: Used to read JSON files containing the article and category data.

### **Database**:

- No external database is used. The app reads data from local JSON files (`articles.json` and `categories.json`).

## Data Sources

The articles and categories used in this application are inspired by real-world data and modified for educational purposes. Each entry in the JSON files references a source from which the content was adapted or inspired:

- **Articles**:

  - [History of Electric Cars](https://www.energy.gov/articles/history-electric-car) - U.S. Department of Energy
  - [Top 10 Sports Cars of 2024](https://www.autocar.co.uk/car-news/best-cars/top-10-best-sports-cars) - Autocar
  - [Best SUVs for Families in 2024](https://www.autoweek.com/rankings/g45445032/best-family-suvs/) - Autoweek
  - [Timeless Luxury Sedans](https://www.msn.com/en-us/autos/autos-luxury/20-timeless-luxury-sedans-that-embodied-elegance/ss-BB1qkDWW) - MSN Autos

- **Categories**:  
  Each category is curated to reflect common themes found in automotive journalism and is described in a manner consistent with typical industry overviews.

## How to Run the Application

### **Prerequisites**:

- **Node.js**: Ensure Node.js is installed. You can download it from [nodejs.org](https://nodejs.org/).

### **Steps**:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/nbist24k/Web322_Assignment.git
   ```
2. **Navigate into the project directory**:
   ```bash
    cd Web322_assignment
   ```
3. **Run the server locally**:
   ```bash
    npm init -y
    npm i express
   ```
4. **Visit the app in the browser**:  
   Open the browser and go to http://localhost:4250.

5. **Deployed version on Vercel**:  
   Live URL: [https://web322-assignment-ten.vercel.app](https://web322-assignment-ten.vercel.app)
