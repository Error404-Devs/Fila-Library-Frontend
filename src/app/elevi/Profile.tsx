'use client';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { CircleUser } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import DarkModeSwitch from './darkModeSwitch';

const Profile = () => {
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/login/bibliotecara');
        }
    });

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full ml-auto h-8 w-8"
                >
                    <CircleUser className="h-5 w-5" />
                    <span className="sr-only">Toggle user menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>
                    <DarkModeSwitch/>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href="/">
                    <DropdownMenuItem
                        onClick={() => signOut({ callbackUrl: '/' })}
                    >
                        Logout
                    </DropdownMenuItem>
                </Link>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default Profile;
