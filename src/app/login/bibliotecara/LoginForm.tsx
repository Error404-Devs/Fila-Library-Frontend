'use client';

import { useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function LoginForm() {
    const [email, setEmail] = useState('admin@email.com');
    const [password, setPassword] = useState('Password123!');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleEmailChange = (e: any) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: any) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const result = await signIn('credentials', {
            redirect: false, // Prevent NextAuth from redirecting automatically
            email: email,
            password: password,
            callbackUrl: `${window.location.origin}/carti?page=9` // Specify where to redirect on success
        });

        if (result?.error) {
            setError(result.error);
        } else if (result?.url) {
            router.push(result.url);
        }
    };

    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Login Bibliotecara</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                <form onSubmit={handleSubmit} className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="liceu@filadelfia.com"
                            required
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            required
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </div>
                    {error && (
                        <div className="text-red-500 text-sm text-center my-2">
                            {error}
                        </div>
                    )}
                    <CardFooter>
                        <Button type="submit" className="w-full">
                            Sign in
                        </Button>
                    </CardFooter>
                </form>
            </CardContent>
        </Card>
    );
}
