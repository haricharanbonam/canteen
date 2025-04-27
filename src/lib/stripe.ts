import { loadStripe } from '@stripe/stripe-js';

// Use a test publishable key for development
export const stripePromise = loadStripe('pk_test_51OyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');