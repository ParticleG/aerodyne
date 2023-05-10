import axios, { AxiosInstance } from 'axios';

export class AxiosWrapper {
  api?: AxiosInstance;

  create(baseURL: string) {
    this.api = axios.create({
      baseURL: baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
