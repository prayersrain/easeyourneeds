import NextAuth from 'next-auth';
import { auth } from '../../../src/lib/auth';

// Export for use in API routes
export const { GET, POST } = NextAuth(auth);

// Middleware protection will be in middleware.ts
