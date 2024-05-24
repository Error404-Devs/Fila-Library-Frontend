import { Library, Notebook, Search } from 'lucide-react';
import Profile from '../carti/Profile';
import Link from 'next/link';

const Sidebar = () =>{
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
            </div>
        </div>
    );
};
export default Sidebar;

