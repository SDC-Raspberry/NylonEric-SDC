import http from 'k6/http';
import { sleep, check, fail } from 'k6';

const HOST = __ENV.HOST || '127.0.0.1';
const PORT = __ENV.PORT || 4321;
const baseURL = `http://${HOST}:${PORT}/`;

export let options = {
  stages: [
    { duration: '30s', target: 100 }, // below normal load
    { duration: '5m', target: 100 },
    { duration: '30s', target: 243 }, // light load
    { duration: '5m', target: 243 },
    { duration: '30s', target: 500 },
    { duration: '5m', target: 500 },
    { duration: '30s', target: 1000 },
    { duration: '5m', target: 1000 },
    { duration: '30s', target: 2250 }, // around the breaking point
    { duration: '5m', target: 2250 },
    { duration: '30s', target: 5000 }, // past the breaking point
    { duration: '5m', target: 5000 },
    { duration: '1m', target: 0 }, // scale down. Recovery stage.
  ],
  thresholds: {
    http_req_duration: ['p(99)<2000'], // 99% of requests must complete below 1.5s
  },
};

let res;

export default function () {
  let responses = http.batch([
    // ['GET',
    //   `https://test-api.k6.io//public/crocodiles/1/`,
    //   null,
    //   { tags: { name: 'PublicCrocs' } }
    // ],
    ['GET',
      `${baseURL}`,
       null,
       {},
    ],
    ['GET',
      `${baseURL}products`,
      null,
      {},
    ],
    ['GET',
      `${baseURL}products/${__ITER + 900001}`,
      null,
      {},
    ],
    ['GET',
      `${baseURL}products/${__ITER + 900001}/styles`,
      null,
      {},
    ],
    ['GET',
      `${baseURL}products/${__ITER + 900001}/related`,
      null,
      {},
    ]
  ]);

//   if (
//     !check(res, {'status code MUST be 200': (res) => res.status == 200,
// })
//   ) {
//     fail('status code was *not* 200');
//   }
  // console.log('Response time was ' + String(res.timings.duration) + ' ms');
  sleep(.5);
};