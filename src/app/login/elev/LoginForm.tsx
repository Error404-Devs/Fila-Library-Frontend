'use client'
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export function LoginForm() {

    const [nr_crt, setNrCrt] = useState('')
    const router = useRouter();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleNrCrtChange = (e:any) => {
        setNrCrt(e.target.value);
        console.log(nr_crt)
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault(); 
        setLoading(true);
    try {
        const response = await fetch(`${baseUrl}/borrows?person_id=${nr_crt}`);
        if (!response.ok) {
            throw new Error('Nr. Matricol not found');
        }
        router.push(`/situatie?nr_crt=${nr_crt}`);
    } catch (error) {
        setError("Nr. Matricol invalid");
        setLoading(false);
    };
}

    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Login Elev</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                <form onSubmit={handleSubmit} className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="nrmatricol">Nr. Matricol</Label>
                        <Input
                            id="nrmatricol"
                            type="text"
                            placeholder="39 VIII L"
                            required
                            value={nr_crt}
                            onChange={handleNrCrtChange}
                        />
                    </div>
                    <CardFooter>
                        <div className='flex flex-col w-full'>
                            {error && (
                                <div className="text-red-500 text-sm text-center my-2">
                                    {error}
                                </div>
                            )}
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Please wait
                                    </>
                                ) : (
                                    'Sign in'
                                )}
                            </Button>
                        </div>
                    </CardFooter>
                </form>
            </CardContent>
        </Card>
    );
}
