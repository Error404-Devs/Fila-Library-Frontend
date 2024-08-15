'use client'
import * as React from "react"
import { Moon, Sun } from "lucide-react"
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
import { useTheme } from 'next-themes';
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

export function LoginForm() {

    const [name, setName] = useState('')
    const [prenume, setPrenume] = useState('')

    const router = useRouter();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { setTheme } = useTheme()

    const handleNameChange = (e:any) => {
        setName(e.target.value);
        console.log(name)
    };
    const handlePrenumeChange = (e:any) => {
        setPrenume(e.target.value);
        console.log(prenume)
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault(); 
        setLoading(true);
    try {
        const response = await fetch(`${baseUrl}/borrows?first_name=${name}&last_name=${prenume}`);
        if (!response.ok) {
            throw new Error('Utilizator not found');
        }
        const raspuns = await response.json();
        console.log(raspuns)
        router.push(`/situatie?name=${name}&lastname=${prenume}`);
    } catch (error) {
        setError("Utilizator invalid");
        setLoading(false);
    };
}
    
    return (
        <>
                <div style={{ position: 'absolute', top: 0, right: 0, margin: '10px' }}>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            <span className="sr-only">Toggle theme</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setTheme("light")}>
                            Light
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("dark")}>
                            Dark
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("system")}>
                            System
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Login Elev</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <form onSubmit={handleSubmit} className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="nrmatricol">Nume</Label>
                            <Input
                                id="nrmatricol"
                                type="text"
                                placeholder="Nume"
                                required
                                value={name}
                                onChange={handleNameChange}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="nrmatricol">Prenume</Label>
                            <Input
                                id="nrmatricol"
                                type="text"
                                placeholder="Prenume"
                                required
                                value={prenume}
                                onChange={handlePrenumeChange}
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
        </>
    );
}
