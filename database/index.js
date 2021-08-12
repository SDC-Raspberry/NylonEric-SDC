const db = require('./db.js');

const getProducts = (page, count) => {
  let queryString = 'SELECT * FROM products ORDER BY id OFFSET $1 LIMIT $2';
  let offset = (page - 1) * count;
  let params = [offset, count];

  return db.pool
    .connect()
    .then(client => {
      return client
      .query(queryString, params)
      .then(results => {
        client.release();
        return results.rows;
      })
      .catch(error => {
        client.release();
        console.error(error);
      });
    })
    .catch(error => {
      console.error(error);
    });
};

const getProduct = (product_id) => {
  let productsQueryString = 'SELECT * FROM products WHERE id=$1';
  let featuresQueryString = 'SELECT feature, value FROM features WHERE product_id=$1';
  return db.pool
  .connect()
  .then(client => {
    return Promise.all([
      client.query(productsQueryString, [product_id]),
      client.query(featuresQueryString, [product_id])
    ])
    .then(results => {
      client.release();
      let info = results[0].rows[0];
      let productInfo = {
        id: Number(info.id),
        name: info.name,
        slogan: info.slogan,
        description: info.description,
        category: info.category,
        default_price: info.default_price,
        features: []
      };
      let features = results[1].rows;
      productInfo.features = features;
      return productInfo;
    })
    .catch(error => {
      client.release();
      console.error(error);
      return error;
    });
  })
  .catch(error => {
    console.error(error);
    return error;
  });
};

const getStyles = (product_id) => {
  let stylesQueryString = 'SELECT id, name, sale_price, original_price, default_style FROM styles WHERE product_id=$1';
  // let photosQueryString = 'SELECT p.style_id, p.thumbnail_url, p.url FROM photos p INNER JOIN styles s ON p.style_id = s.id WHERE s.product_id = $1'; *working
  let photosQueryString = 'SELECT p.style_id, p.thumbnail_url, p.url FROM photos p JOIN (SELECT * FROM styles where product_id = $1) s ON s.id = p.style_id' // *using sub-query
  let skusQueryString = 'SELECT k.style_id, k.id, quantity, size FROM skus k, styles s WHERE k.style_id = s.id AND s.product_id = $1';
  return db.pool
  .connect()
  .then(client => {
    // console.time('styles1');
    // console.time('styles2');
    // console.time('styles3');
    return Promise.all([
      client.query(stylesQueryString, [product_id]) //.then(result => {
      //   console.timeEnd('styles1');
      //   return result;
      // })
      ,
      client.query(photosQueryString, [product_id]) //.then(result => {
        //console.timeEnd('styles2');
       //return result;
      //})
      ,
      client.query(skusQueryString, [product_id]) // .then(result => {
        //console.timeEnd('styles3');
        //return result;
      //})
    ])
    .then(results => {
      client.release();
      let tempObject = {};
      let styles = results[0].rows;
      let photos = results[1].rows;
      let skus = results[2].rows;

      photos.forEach(photo => {
        let photoStyleId = photo.style_id;
        let photoObject = {
          'thumbnail_url': photo.thumbnail_url,
          'url': photo.url
        };
        if (tempObject[photoStyleId] !== undefined) {
          tempObject[photoStyleId].photos.push(photoObject);
        } else {
          tempObject[photoStyleId] = {
            photos: [photoObject],
            skus: {}
          };
        }
      });

      skus.forEach(sku => {
        let skuStyleId = sku.style_id;
        let skuObject = {
          quantity: sku.quantity,
          size: sku.size
        }
        if (tempObject[skuStyleId] !== undefined) {
          tempObject[skuStyleId].skus[sku.id] = skuObject;
        } else {
          tempObject[skuStyleId] = {
            photos: [],
            skus: { [sku.id]: skuObject }
          };
        }
      });

      styles.forEach(style => {
        style['default?'] = style.default_style;
        style.photos = tempObject[style.id].photos;
        style.skus = tempObject[style.id].skus;
        delete style.default_style;
      });
      return { 'product_id': product_id, 'results': styles };
    })
    .catch(error => {
      console.error(error);
      return error;
    });
  })
  .catch(error => {
    console.error(error);
    return error;
  });
};

const getRelated = (product_id) => {
  let relatedQueryString = 'SELECT related_product_id FROM related_products WHERE current_product_id=$1';
  return db.pool
  .connect()
  .then(client => {
    return client.query(relatedQueryString, [ product_id ])
    .then(results => {
      client.release();
      let relatedProducts = results.rows.map(result => result.related_product_id);
      return relatedProducts;
    })
    .catch(error => {
      client.release();
      console.error(error);
      return error;
    });
  })
  .catch(error => {
    console.error(error);
    return error;
  });
};

module.exports = {
  getProducts,
  getProduct,
  getStyles,
  getRelated
};