import http from 'k6/http';
import { sleep } from 'k6';

const PORT = __ENV.PORT || 4321;

export let options = {
  // setupTimeout: '30s',
  // teardownTimeout: '30s',
  vus: 1,
  duration: '1m',
  // iterations: 10,
};

export default function () {
  // console.log(`here is my counter: ${__ITER}`);
  // http.get('https://test.k6.io');
  // sleep(1);
  // server test:
  // http.get(`http://127.0.0.1:4321/`);
  // let currentProduct = __ITER + 1000;
  // http.get(`http://127.0.0.1:4321/products/${__ITER + 900001}`);
  // http.get(`http://127.0.0.1:4321/products/${__ITER + 900001}/styles`);
  http.get(`http://127.0.0.1:4321/products/${__ITER + 900001}/related`);
  // console.log('Response time was ' + String(res.timings.duration) + ' ms');
  sleep(1);
  // products request:
  // product request:
  // styles request:
  // related request:
};