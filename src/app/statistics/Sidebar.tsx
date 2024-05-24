'use client';

import { Library, Book, FileLineChart } from 'lucide-react';
import Profile from '../carti/Profile';
import Link from 'next/link';
import Checkboxes from './Checkboxes';

const Sidebar = () => {
    return (
        <div className="fixed top-0 left-0 h-full w-60 border-r bg-muted/40 flex flex-col">
            <div className="flex flex-col gap-2 flex-1">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Link
                        href="/"
                        className="flex items-center gap-2 font-semibold"
                    >
                        <Library className="h-6 w-6" />
                        <span>Filadelfia</span>
                    </Link>
                    <Profile />
                </div>
                <div className="flex-1 overflow-y-auto h-full flex flex-col justify-between">
                    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                        <Link
                            href="/carti?page=1"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                        >
                            <Book className="h-4 w-4" />
                            Carti
                        </Link>
                        <Link
                            href="/statistics"
                            className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
                        >
                            <FileLineChart className="h-4 w-4" />
                            Statistice
                        </Link>
                    </nav>
                    <div className="px-8 pb-8">
                        <Checkboxes />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
