import axios from 'axios';

import { apiUrl } from '@/api/constants/apiUrl';

export const http = axios.create({
  baseURL: apiUrl,
});
