import http from 'k6/http';
import { sleep, check, fail } from 'k6';

const HOST = __ENV.HOST || '127.0.0.1';
const PORT = __ENV.PORT || 4321;
const baseURL = `http://${HOST}:${PORT}/`;

export let options = {
  stages: [
    { duration: '2m', target: 100 }, // below normal load
    { duration: '5m', target: 100 },
    { duration: '2m', target: 200 }, // normal load
    { duration: '5m', target: 200 },
    { duration: '2m', target: 243 }, // around the breaking point
    { duration: '5m', target: 243 },
    { duration: '2m', target: 400 }, // beyond the breaking point
    { duration: '5m', target: 400 },
    { duration: '10m', target: 0 }, // scale down. Recovery stage.
  ],
  thresholds: {
    http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
  },
};

let res;

export default function () {
  let responses = http.batch([
    ['GET',
      `https://test-api.k6.io//public/crocodiles/1/`,
      null,
      { tags: { name: 'PublicCrocs' } }
    ],
    ['GET',
      `${baseURL}`,
       null,
       {},
    ],
    ['GET',
      `${baseURL}products`,
      null,
      {},
    ]
  ]);
  // server test:
  // http.get(`http://127.0.0.1:4321/`);

  // products request:
  // res = http.get(`http://127.0.0.1:4321/products`);

  // product request:
  // // let currentProduct = __ITER + 1000;
  // let res = http.get(`http://127.0.0.1:4321/products/${__ITER + 900001}`);

  // styles request:
  // res = http.get(`http://127.0.0.1:4321/products/${__ITER + 900001}/styles`);

  // related request:
  // res = http.get(`http://127.0.0.1:4321/products/${__ITER + 900001}/related`);

//   if (
//     !check(res, {'status code MUST be 200': (res) => res.status == 200,
// })
//   ) {
//     fail('status code was *not* 200');
//   }
  // console.log('Response time was ' + String(res.timings.duration) + ' ms');
  sleep(1);
};