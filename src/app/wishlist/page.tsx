import Link from 'next/link';
import Sidebar from './SideBar';
import FavoriteBooks from './FavoriteBooks';
const baseUrl = process.env.BASE_URL;

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

    return (
        <div className="flex min-h-screen">
            <Sidebar name={searchParams?.name} lastname={searchParams?.lastname} login_id={searchParams?.login_id}/>
            <div className="flex flex-col flex-1 min-w-0">
                <header className="flex h-3 items-center gap-4 border-b bg-muted/40 px-4 md:h-[3.8rem] lg:h-[3.8rem] lg:px-6">
                    <h1 className='font-bold text-xl'>Favorite: 1 </h1>
                </header>
                <FavoriteBooks/>
            </div>
        </div>

    );
};
