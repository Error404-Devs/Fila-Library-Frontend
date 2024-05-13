import { Library, Book, FileLineChart } from 'lucide-react';
import Profile from './Profile';
import Link from 'next/link';

const Sidebar = () => {
    return (
        <div className="hidden border-r bg-muted/40 md:block ">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Link
                        href="/"
                        className="flex items-center gap-2 font-semibold"
                    >
                        <Library className="h-6 w-6" />
                        <span className="">Filadelfia</span>
                    </Link>
                    <Profile />
                </div>
                <div className="flex-1">
                    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                        <Link
                            href="/carti?page=1"
                            className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary "
                        >
                            <Book className="h-4 w-4" />
                            Carti{' '}
                        </Link>
                        <Link
                            href="/statistics"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                        >
                            <FileLineChart className="h-4 w-4" />
                            Statistice
                        </Link>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
