import { StudentStatus } from "./studentStatus";
import { Library } from 'lucide-react';
import SearchBar from "./SearchArea";
import Link from 'next/link';
import ParamsUrl from "./params";

function Dashboard() {

    return (
        <>
            <div className="flex flex-col">
                <header className="flex h-6 items-center gap-4 border-b bg-muted/40 px-4 md:h-[6rem] lg:h-[6rem] lg:px-6">
                    <Link
                        href="/"
                        className="flex items-center gap-2 font-semibold"
                    >
                        <Library className="h-6 w-6" />
                        <span className="text-xl">Filadelfia</span>
                    </Link>
                    <div className="px-16 w-full">
                        <SearchBar />
                    </div>
                </header>
            </div>
            <ParamsUrl/>
        </>
    );
};
export default Dashboard;
