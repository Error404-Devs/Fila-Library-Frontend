import { NextAuthOptions, SessionStrategy } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const baseUrl = process.env.BASE_URL;

async function refreshAccessToken(token: any) {
    try {
        const url = `${baseUrl}/auth/refresh_token?refresh_token=${token.refresh_token}`;
        const response = await fetch(url);
        const refreshedToken = await response.json();
        if (!response.ok) {
            throw refreshedToken;
        }
        return {
            ...token,
            accessToken: refreshedToken.access_token,
            accessTokenExpires: Date.now() + 1000 * refreshedToken.expires_in,
            refreshToken: refreshedToken.refresh_token ?? token.refresh_token
        };
    } catch (error) {
        console.error('Error refreshing access token:', error);

        return {
            ...token,
            error: 'RefreshAccessTokenError'
        };
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'text',
                    placeholder: 'Email...'
                },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials, req) {
                const res = await fetch(`${baseUrl}/auth/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password
                    })
                });
                const user = await res.json();

                if (!res.ok) {
                    return null;
                }
                return user;
            }
        })
    ],
    session: {
        strategy: 'jwt' as SessionStrategy
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
                // or token.expires_in
                return token;
            }
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
};
