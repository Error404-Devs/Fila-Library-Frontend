import Link from 'next/link';
import Sidebar from './SideBar';
import SearchBar from './SearchArea';
import AvalaibleBooks from './AvalaibeBooks';
import AvalaiblePagination from './AvalaiblePagination';
const baseUrl = process.env.BASE_URL;
import { BookType, PagesType } from '../interfaces';

export default async function Dashboard({
    searchParams
}: {
    searchParams?: {
        name?: string;
        lastname?: string;
        display?: string;
        page?: number;
        title?: string;
        login_id?: string;
    };
}) {
    const page = searchParams?.page || 1;
    const title = searchParams?.title || '';
    const display = searchParams?.display || '';
    
    const params: Record<string, string> = {};
    
    if (page) params.page = String(page);
    if (title) params.title = title;

    const queryString = new URLSearchParams(params).toString();
    const url = `${baseUrl}/books/student?${queryString}`;
    console.log(url)

    const response = await fetch(url, { cache: 'no-store' });
    const books_and_pages: PagesType = await response.json();
    const totalPages = books_and_pages?.pages || 0;
    const currentPage = books_and_pages?.page || 1;
    const books: BookType[] = await books_and_pages?.items;

    return (
        <div className="flex min-h-screen">
            <Sidebar name={searchParams?.name} lastname={searchParams?.lastname} login_id={searchParams?.login_id} />
            <div className="flex flex-col flex-1 min-w-0">
                <header className="flex h-6 items-center gap-4 border-b bg-muted/40 px-4 md:h-[6rem] lg:h-[6rem] lg:px-6">
                    <Link
                        href="/"
                        className="flex items-center gap-2 font-semibold"
                    ></Link>
                    <div className="w-full">
                        <SearchBar />
                    </div>
                </header>
                <div>

                    {display !== "false" && title? (
                        totalPages ? (
                            <div>
                                <AvalaibleBooks books={books} />
                                <AvalaiblePagination
                                    totalPages={totalPages}
                                    currentPage={currentPage}
                                />
                            </div>
                        ) : (
                            <div className="flex justify-center items-center h-[50vh]">
                                <p>
                                    Nu există cărți care să îndeplinească
                                    criteriile
                                </p>
                            </div>
                        )
                    ) : null}
                </div>
            </div>
        </div>
    );
}
