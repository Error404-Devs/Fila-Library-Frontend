import BASE_URL from '@/api/BASE_URL';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'admin@email.com',
                    type: 'text',
                    placeholder: 'jsmith'
                },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials, req) {
                console.log(credentials?.email, credentials?.password);
                const res = await fetch(`${BASE_URL}/admins/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password
                    })
                });
                const user = await res.json();

                if (!res.ok) {
                    console.log('Error in authentication:', user);
                    return null;
                }

                console.log('User authenticated:', user);
                return user;
            }
        })
    ],
    // ? secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.access_token = user.access_token;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = session.user ?? {};
            session.access_token = token.access_token as string | undefined; // ? weird type error
            return session;
        }
    },
    pages: {
        signIn: '/auth/signin',
        error: '/auth/error'
    }
});
