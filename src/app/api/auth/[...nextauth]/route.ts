import BASE_URL from '@/api/BASE_URL';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

async function refreshAccessToken(token: any) {
    console.log('called function');
    try {
        const url = `${BASE_URL}/auth/refresh_token?refresh_token=${token.refresh_token}`;
        const response = await fetch(url);
        const refreshedToken = await response.json();
        if (!response.ok) {
            throw refreshedToken;
        }
        return {
            ...token,
            accessToken: refreshedToken.access_token,
            accessTokenExpires: Date.now() + 1000 * 10, // * refreshedToken.expires_in,
            refreshToken: refreshedToken.refresh_token ?? token.refresh_token // Fall back to old refresh token
        };
    } catch (error) {
        console.error('Error refreshing access token:', error);

        return {
            ...token,
            error: 'RefreshAccessTokenError'
        };
    }
}

const handler = NextAuth({
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
                const res = await fetch(`${BASE_URL}/auth/login`, {
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
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.access_token = user.access_token;
                token.refresh_token = user.refresh_token;
                token.expires_in = Date.now() + user.expires_in * 1000;
                token.email = user.email;
            }
            if (Date.now() < (token.expires_in as number)) {
                console.log('kept access token');
                return token;
            }
            console.log('refreshed token', token);
            return await refreshAccessToken(token);
        },
        async session({ session, token }) {
            session.user = session.user ?? {};
            session.user.email = token.email;
            session.access_token = token.access_token as string;
            session.refresh_token = token.refresh_token as string;
            return session;
        }
    },
    pages: {
        signIn: '/login/bibliotecara',
        error: '/error'
    },
    secret: process.env.NEXTAUTH_SECRET
});

export { handler as GET, handler as POST };
