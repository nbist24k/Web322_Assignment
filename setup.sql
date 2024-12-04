-- Drop tables if they exist
DROP TABLE IF EXISTS articles;
DROP TABLE IF EXISTS categories;

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
    categoryId INTEGER REFERENCES categories(id),
    published BOOLEAN DEFAULT false,
    publishedDate DATE DEFAULT CURRENT_DATE,
    featureImage VARCHAR(255),
    source VARCHAR(255)
);

-- Reset sequences
ALTER SEQUENCE categories_id_seq RESTART WITH 1;
ALTER SEQUENCE articles_id_seq RESTART WITH 1;

-- Insert Categories Data
INSERT INTO categories (id, name, description) VALUES
(1, 'Electric Vehicles', 'Exploring the evolution, technology, and impact of electric vehicles through in-depth articles and analysis.'),
(2, 'Sports Cars', 'Coverage of the latest in sports car innovation, performance reviews, and market trends.'),
(3, 'Family SUVs', 'Insights and reviews on the best SUVs for families, focusing on safety, comfort, and utility features.'),
(4, 'Luxury Sedans', 'A look at timeless luxury sedans that combine elegance and advanced technology, featuring historical icons and modern classics.');

-- Insert Articles Data
INSERT INTO articles (id, title, content, categoryId, published, publishedDate, featureImage, source) VALUES
(1, 'The History of the Electric Car', 'Introduced more than 100 years ago, electric cars are seeing a rise in popularity today for many of the same reasons they were first popular.', 1, true, '2014-09-15', 'http://upload.wikimedia.org/wikipedia/commons/e/e7/Thomas_Parker_Electric_car.jpg', 'https://www.energy.gov/articles/history-electric-car'),
(2, 'Top 10 Sports Cars of 2024', 'There''s a very obvious part of the new car market for dyed-in-the-wool petrolheads to go in search of meaningful driver entertainment: the sports car segment.', 2, true, '2024-08-02', 'https://www.autocar.co.uk/sites/autocar.co.uk/files/styles/gallery_slide/public/images/car-reviews/first-drives/legacy/10-porche-911-top-10.jpg?itok=xeeTF1aW', 'https://www.autocar.co.uk/car-news/best-cars/top-10-best-sports-cars'),
(3, 'Best SUVs for Families in 2024 & 2025', 'Looking for the best family SUVs of 2024? We break down the top choices based on safety, comfort, and features.', 3, true, '2023-10-16', 'https://hips.hearstapps.com/hmg-prod/images/07-2023-honda-cr-v-sport-touring-64d67102e50c6.jpg?crop=1.00xw:0.895xh;0,0.0171xh&resize=1200:*', 'https://www.autoweek.com/rankings/g45445032/best-family-suvs/'),
(4, '20 Timeless Luxury Sedans That Embodied Elegance', 'Luxury sedans are the epitome of elegance and comfort, combining sophisticated design with advanced technology. Throughout automotive history, certain models have stood out for their exceptional style and refinement. Here are some memorable luxury sedans that defined elegance.', 4, true, '2024-10-02', 'https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1rv9Cx.img?w=768&h=432&m=6', 'https://www.msn.com/en-us/autos/autos-luxury/20-timeless-luxury-sedans-that-embodied-elegance/ss-BB1qkDWW');

-- Set the sequence values after insert
SELECT setval('categories_id_seq', (SELECT MAX(id) FROM categories));
SELECT setval('articles_id_seq', (SELECT MAX(id) FROM articles));