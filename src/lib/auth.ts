import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import { supabase } from './db';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email dan password wajib diisi');
        }

        // Find user by email
        const { data, error } = await supabase
          .from('users')
          .select('id, email, name, password_hash, role, is_verified')
          .eq('email', credentials.email)
          .single();

        if (error || !data) {
          throw new Error('Email atau password salah');
        }

        // Verify password
        const isValid = await compare(credentials.password as string, data.password_hash);

        if (!isValid) {
          throw new Error('Email atau password salah');
        }

        // Update last login
        await supabase
          .from('users')
          .update({ last_login_at: new Date().toISOString() })
          .eq('id', data.id);

        return {
          id: data.id,
          email: data.email,
          name: data.name,
          role: data.role,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/signin',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
});
