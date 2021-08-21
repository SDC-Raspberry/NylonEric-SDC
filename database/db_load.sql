-- one-time use script for loading process

-- products table *needs id if copying all columns from .csv
COPY products(id, name, slogan, description, category, default_price)
FROM '../SDC/sdc_pplication_data/product.csv'
DELIMITER ','
CSV HEADER;

-- features table
COPY features(id, product_id, feature, value)
FROM '../SDC/sdc_pplication_data/features.csv'
DELIMITER ','
CSV HEADER;

-- related_products_staging (needed before final transformation)
COPY related_products_staging(id, current_product_id, related_product_id)
FROM '../SDC/sdc_application_data/related.csv'
DELIMITER ','
CSV HEADER;

-- related_products transformation conditional insert
INSERT INTO related_products
(id, current_product_id, related_product_id)
SELECT * FROM related_products_staging
WHERE related_product_id>0;

-- styles table
COPY styles(id, product_id, name, sale_price, original_price, default_style)
FROM '../SDC/sdc_application_data/styles.csv'
DELIMITER ','
CSV HEADER;

-- photos table (must be cleaned and validated with 'scripts/transform.js' first)
COPY photos(id, style_id, url, thumbnail_url)
from '../SDC/sdc_application_data/photos_transformed.csv'
DELIMITER ','
CSV HEADER;

-- skus table
COPY skus(id, style_id, size, quantity)
from '../SDC/sdc_application_data/skus.csv'
DELIMITER ','
CSV HEADER;