import 'next-auth';

declare module 'next-auth' {
    interface User {
        access_token: string;
        refresh_token: string;
        expires_in: number;
    }
    interface Session {
        access_token: string;
        refresh_token: string;
    }
    interface JWT {
        access_token: string;
        refresh_token: string;
        expires_in: number;
        email?: string;
    }
}
