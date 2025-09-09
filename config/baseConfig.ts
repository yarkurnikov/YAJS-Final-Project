import { config as dotenvConfig } from 'dotenv';
import { join } from 'path';

dotenvConfig({ path: join(process.cwd(), '.env') });

export const BASE_URL: string = process.env.BASE_URL ?? 'https://practicesoftwaretesting.com';
export const BASE_API_URL: string = process.env.BASE_API_URL ?? 'https://api.practicesoftwaretesting.com';
export const AUTH_CUSTOMER_EMAIL: string = process.env.AUTH_CUSTOMER_EMAIL ?? 'customer@practicesoftwaretesting.com';
export const AUTH_CUSTOMER_PASSWORD: string = process.env.AUTH_CUSTOMER_PASSWORD!;
export const CREDIT_CARD_NUMBER: string = process.env.CREDIT_CARD_NUMBER!;
export const CREDIT_CARD_CVV: string = process.env.CREDIT_CARD_CVV!;
export const CREDIT_CARD_HOLDER_NAME: string = process.env.CREDIT_CARD_HOLDER_NAME ?? 'Test User';

