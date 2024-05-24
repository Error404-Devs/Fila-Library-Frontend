import Link from 'next/link';
import Sidebar from './SideBar';
const baseUrl = process.env.BASE_URL;

export default async function Dashboard(
    {
        searchParams
    }: {
        searchParams?: {
            nr_crt?: string;
        };
    }
) {

    return (
        <div className="flex min-h-screen">
            <Sidebar nr_crt={searchParams?.nr_crt}/>
            <div className="flex flex-col flex-1 min-w-0">
                <header className="flex h-6 items-center gap-4 border-b bg-muted/40 px-4 md:h-[6rem] lg:h-[6rem] lg:px-6">
                    <Link
                        href="/"
                        className="flex items-center gap-2 font-semibold"
                    >
                    </Link>
                </header>
                <p>STATS</p>
            </div>
        </div>

    );
};
