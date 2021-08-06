-- script for loading test mock data for first 20 products

-- products table
COPY products(id, name, slogan, description, category, default_price)
FROM '/Users/user/NylonEric/hack_reactor/SDC/NylonEric-SDC/database/mockServerData/productsMock.csv'
DELIMITER ','
CSV HEADER;

-- features table
COPY features(id, product_id, feature, value)
FROM '/Users/user/NylonEric/hack_reactor/SDC/NylonEric-SDC/database/mockServerData/featuresMock.csv'
DELIMITER ','
CSV HEADER;

-- related_products_staging (needed before final transformation)
COPY related_products_staging(id, current_product_id, related_product_id)
FROM '/Users/user/NylonEric/hack_reactor/SDC/NylonEric-SDC/database/mockServerData/relatedMock.csv'
DELIMITER ','
CSV HEADER;

-- related_products transformation conditional insert
INSERT INTO related_products
(id, current_product_id, related_product_id)
SELECT * FROM related_products_staging
WHERE related_product_id>0;

-- styles table
COPY styles(id, product_id, name, sale_price, original_price, default_style)
FROM '/Users/user/NylonEric/hack_reactor/SDC/NylonEric-SDC/database/mockServerData/stylesMock.csv'
DELIMITER ','
CSV HEADER;

-- photos table (must be cleaned and validated with 'scripts/transform.js' first)
COPY photos(id, style_id, url, thumbnail_url)
from '/Users/user/NylonEric/hack_reactor/SDC/NylonEric-SDC/database/mockServerData/photosMock.csv'
DELIMITER ','
CSV HEADER;

-- skus table
COPY skus(id, style_id, size, quantity)
from '/Users/user/NylonEric/hack_reactor/SDC/NylonEric-SDC/database/mockServerData/skusMock.csv'
DELIMITER ','
CSV HEADER;