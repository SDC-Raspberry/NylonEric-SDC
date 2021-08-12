import http from 'k6/http';
import { sleep, check, fail } from 'k6';

const PORT = __ENV.PORT || 4321;

export let options = {
  stages: [
    { duration: '30s', target: 243 },
    { duration: '4m', target: 243 },
    { duration: '30s', target: 0 },
  ],
  // setupTimeout: '30s',
  // teardownTimeout: '30s',
  // vus: 1,
  // target: 10,
  // duration: '5m',
  // iterations: 10,
  thresholds: {
    http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
  },
};

let res;

export default function () {
  // http.get('https://test.k6.io');
  // sleep(1);

  // server test:
  // http.get(`http://127.0.0.1:4321/`);

  // products request:
  // let res = http.get(`http://127.0.0.1:4321/products`);

  // product request:
  // let currentProduct = __ITER + 1000;
  // let res = http.get(`http://127.0.0.1:4321/products/${__ITER + 900001}`);

  // styles request:
  res = http.get(`http://127.0.0.1:4321/products/${__ITER + 900001}/styles`);

  // related request:
  // let res = http.get(`http://127.0.0.1:4321/products/${__ITER + 900001}/related`);

  if (
    !check(res, {'status code MUST be 200': (res) => res.status == 200,
})
  ) {
    fail('status code was *not* 200');
  }
  // console.log('Response time was ' + String(res.timings.duration) + ' ms');
  sleep(1);
};