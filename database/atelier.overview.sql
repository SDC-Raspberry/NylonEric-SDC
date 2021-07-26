CREATE TABLE IF NOT EXISTS products (
  id INTEGER UNIQUE NOT NULL,
  name VARCHAR(250) DEFAULT '',
  slogan VARCHAR(250) DEFAULT '',
  description VARCHAR(1000) DEFAULT '',
  category VARCHAR(250) DEFAULT '',
  default_price VARCHAR(250) DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS features (
  id SERIAL UNIQUE NOT NULL,
  product_id INTEGER,
  feature VARCHAR(250) DEFAULT NULL,
  value VARCHAR(50) DEFAULT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (product_id) REFERENCES products (id)
);

CREATE TABLE IF NOT EXISTS related_products (
  id SERIAL UNIQUE NOT NULL,
  current_product_id INTEGER,
  related_product_id INTEGER DEFAULT NULL,
  CHECK (related_product_id > 0),
  PRIMARY KEY (id),
  FOREIGN KEY (current_product_id) REFERENCES products (id),
  FOREIGN KEY (related_product_id) REFERENCES products (id)
);

CREATE TABLE IF NOT EXISTS related_products_staging (
  id SERIAL UNIQUE NOT NULL,
  current_product_id INTEGER,
  related_product_id INTEGER DEFAULT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS styles (
  id INTEGER UNIQUE,
  product_id INTEGER,
  name VARCHAR(250),
  sale_price VARCHAR(50) DEFAULT NULL,
  original_price VARCHAR(50) DEFAULT NULL,
  default_style BOOLEAN,
  PRIMARY KEY (id),
  FOREIGN KEY (product_id) REFERENCES products (id)
);

CREATE TABLE IF NOT EXISTS photos_staging (
  id SERIAL UNIQUE,
  thumbnail_url VARCHAR DEFAULT '',
  url VARCHAR DEFAULT '',
  style_id INTEGER,
  PRIMARY KEY (id),
  FOREIGN KEY (style_id) REFERENCES styles (id)
);

CREATE TABLE IF NOT EXISTS photos (
  id SERIAL UNIQUE,
  thumbnail_url VARCHAR(2048) DEFAULT '',
  url VARCHAR(2048) DEFAULT '',
  style_id INTEGER,
  PRIMARY KEY (id),
  FOREIGN KEY (style_id) REFERENCES styles (id)
);

CREATE TABLE IF NOT EXISTS skus (
  id SERIAL UNIQUE,
  style_id INTEGER,
  size VARCHAR(8),
  quantity INTEGER,
  PRIMARY KEY (id),
  FOREIGN KEY (style_id) REFERENCES styles(id)
);