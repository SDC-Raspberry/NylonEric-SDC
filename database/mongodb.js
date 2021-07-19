const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/overview');

let productSchema = mongoose.Schema({
  id: {
    type: Number,
    index: true,
    unique: true
  },
  campus: String,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: Number,
  created_at: String,
  updated_at: String,
  features: [
    {
      feature: String,
      value: String
    }
  ],
  related: [Number]
});

let Products = mongoose.model('Products', productSchema);

let stylesSchema = mongoose.Schema({
  product_id: Number,
  style_id: {
    type: Number,
    index: true,
    unique: true
  }
  name: String,
  original_price: Number,
  sale_price: String,
  default: Boolean,
  photos: [{
    thumbnail_url: String,
    url: String
  }],
  skus: Object
});

let Styles = mongoose.model('Styles', stylesSchema);








let save = (products) => {
  // TODO: Your code here
  console.log('here is your sat example to save to db: ', sats[0]);

  // TODO: return new Promise((resolve, reject) => {
  //   // map, make array of promises

  //   Promise.all(promises)
  //     .then(results => resolve(results))
  //     .catch(error => reject(error))
  const options = {upsert:true};
  return Promise.all(
    sats.map(sat => {
      sat['_id'] = sat.NORAD_CAT_ID;
      filter = {'_id': sat['_id']};
      return Sats.updateOne(filter, sat, options)
      .catch((err) => {
        throw err;
      });
    })
  );
};

let find = () => {
  var query = {};
  var options = {};

  return Products.find(query, options, function(err, res) {
    if (err) {
      console.log('error searching database: ', err);
      return err;
    } else {
      console.log('success in searching database');
      return res;
    }

  });
};

module.exports.save = save;
module.exports.find = find;