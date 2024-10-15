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
import { DarkModeSwitch } from '../elevi/darkModeSwitch';

const Profile = ({login_id, name, lastname}: any) => {

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
                <Link href={`/settings?login_id=${login_id}&name=${name}&lastname=${lastname}`}>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                </Link>
                <DarkModeSwitch/>
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
