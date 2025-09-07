import { AUTH_CUSTOMER_EMAIL, AUTH_CUSTOMER_PASSWORD } from '../config/baseConfig';

export const AUTH_CREDENTIALS = {
  customer: {
    email: AUTH_CUSTOMER_EMAIL,
    password: AUTH_CUSTOMER_PASSWORD
  }
} as const;
