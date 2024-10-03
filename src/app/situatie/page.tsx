import { StudentStatus } from "./studentStatus";
import { Library} from 'lucide-react';
import SearchBar from "./SearchArea";
import Link from 'next/link';
import ParamsUrl from "./params";
import Sidebar from "./SideBar";

export default async function Dashboard(
    {
        searchParams
    }: {
        searchParams?: {
            name?: string;
            lastname?: string;
            login_id?: string;
        };
    }
) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const url = `${baseUrl}/borrows?login_id=${searchParams?.login_id}`;
    const response = await fetch(url, { cache: 'no-store' });
    const situatie = await response.json();
    
    for (let i = 0; i < situatie.items.length; i++) {
        situatie.items[i].due_date = situatie.items[i].due_date.split('T')[0]; // Update due_date
    }

    return (
        <div className="flex min-h-screen">
            <Sidebar name={searchParams?.name} lastname={searchParams?.lastname} login_id={searchParams?.login_id}/>
            <div className="flex flex-col flex-1 min-w-0">
                <header className="flex h-6 items-center gap-4 border-b bg-muted/40 px-4 md:h-[6rem] lg:h-[6rem] lg:px-6">
                    <Link
                        href="/"
                        className="flex items-center gap-2 font-semibold"
                    >
                        <div className="flex flex-col" style={{minWidth: "12rem"}}>
                            <span className="text-xl">Welcome back, </span>
                            <span className="text-xl">{situatie.first_name} {situatie.last_name}</span>
                        </div>
                    </Link>
                    <div className="w-full">
                        <SearchBar />
                    </div>
                </header>
                <div className="flex-1 overflow-auto p-4">
                    <StudentStatus situatie = {situatie} />
                </div>
            </div>
        </div>

    );
};
