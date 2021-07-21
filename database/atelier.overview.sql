-- CREATE DATABASE IF NOT EXISTS products;

CREATE TABLE IF NOT EXISTS products (
  id INTEGER UNIQUE,
  name VARCHAR(250),
  slogan VARCHAR(250),
  description VARCHAR(1000),
  category VARCHAR(250),
  default_price VARCHAR(250),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS features (
  id SERIAL UNIQUE,
  product_id INTEGER,
  feature VARCHAR(250),
  value VARCHAR(50),
  PRIMARY KEY (id),
  FOREIGN KEY (product_id) REFERENCES products (id)
);

CREATE TABLE IF NOT EXISTS related_products (
  id SERIAL UNIQUE,
  product_id INTEGER,
  PRIMARY KEY (id),
  FOREIGN KEY (product_id) REFERENCES products (id)
);

CREATE TABLE IF NOT EXISTS styles (
  style_id INTEGER UNIQUE,
  product_id INTEGER UNIQUE,
  name VARCHAR(250),
  original_price VARCHAR(50),
  sale_price VARCHAR(50),
  default BOOLEAN,
  PRIMARY KEY (style_id),
  FOREIGN KEY (product_id) REFERENCES products (id)
);

CREATE TABLE IF NOT EXISTS photos (
  id SERIAL UNIQUE,
  product_id INTEGER UNIQUE,
  thumbnail_url VARCHAR(250),
  url VARCHAR(250),
  style_id INTEGER UNIQUE,
  PRIMARY KEY (id),
  FOREIGN KEY (style_id) REFERENCES styles(style_id),
  FOREIGN KEY (product_id) REFERENCES products (id)
);

CREATE TABLE IF NOT EXISTS skus (
  id SERIAL UNIQUE,
  product_id INTEGER UNIQUE,
  quantity INTEGER,
  size VARCHAR(8),
  style_id INTEGER UNIQUE,
  PRIMARY KEY (id),
  FOREIGN KEY (style_id) REFERENCES styles(style_id),
  FOREIGN KEY (product_id) REFERENCES products (id)
);
