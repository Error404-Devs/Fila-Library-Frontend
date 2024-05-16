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


export function LoginForm() {

    const [nr_crt, setNrCrt] = useState('')

    const handleNrCrtChange = (e:any) => {
        setNrCrt(e.target.value);
        console.log(nr_crt)
    };

    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Login Elev</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
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
            </CardContent>
            <CardFooter>
                <Link className="w-full" href={`/situatie?nr_crt=${nr_crt}`} passHref >
                    <Button className="w-full">Sign in</Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
