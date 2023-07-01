import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 10000,
  duration: "10s",
};

export default function () {
  http.get('http://localhost:3005/api/rental');
  sleep(1);
}

