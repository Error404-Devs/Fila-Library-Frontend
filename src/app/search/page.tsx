import Link from 'next/link';
import Sidebar from '../situatie/SideBar';
import SearchBar from './SearchArea';
import AvalaibleBooks from './AvalaibeBooks';

export default async function Dashboard(
    {
        searchParams
    }: {
        searchParams?: {
            nr_crt?: string;
        };
    }
) {
    // const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    // const url = `${baseUrl}/borrows?person_id=${searchParams?.nr_crt}`;
    // const response = await fetch(url, { cache: 'no-store' });
    // const situatie = await response.json();
    
    return (
        <div className="flex min-h-screen">
            <Sidebar nr_crt={searchParams?.nr_crt} />
            <div className="flex flex-col flex-1 min-w-0">
                <header className="flex h-6 items-center gap-4 border-b bg-muted/40 px-4 md:h-[6rem] lg:h-[6rem] lg:px-6">
                    <Link
                        href="/"
                        className="flex items-center gap-2 font-semibold"
                    >
                    </Link>
                    <div className="w-full">
                        <SearchBar />
                    </div>
                </header>
                <div className="flex-1 overflow-auto p-4">
                    <AvalaibleBooks/>
                </div>
            </div>
        </div>

    );
};
