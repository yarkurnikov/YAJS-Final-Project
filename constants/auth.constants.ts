export const AUTH_CREDENTIALS = {
  customer: {
    email: process.env.AUTH_CUSTOMER_EMAIL || 'customer@practicesoftwaretesting.com',
    password: process.env.AUTH_CUSTOMER_PASSWORD!
  }
} as const;
