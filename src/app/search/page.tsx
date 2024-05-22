import Link from 'next/link';
import Sidebar from '../situatie/SideBar';
import SearchBar from './SearchArea';
import AvalaibleBooks from './AvalaibeBooks';
import AvalaiblePagination from './AvalaiblePagination';
const baseUrl = process.env.BASE_URL;

export default async function Dashboard(
    {
        searchParams
    }: {
        searchParams?: {
            nr_crt?: string;
            display?:string;
            page?: number;
            title?: string;
        };
    }
) {

    interface Book {
        id: string;
        title: string;
        category: string;
        collection: string;
        publisher: string;
        author: string;
        UDC: string;
        year_of_publication: string;
        place_of_publication: string;
        ISBN: string;
        price: string;
        total_copies: number;
        available_copies: number;
        borrowed_copies: number;
    }
    
    interface BooksAndPages {
        items: Book[];
        total: number;
        page: number;
        size: number;
        pages: number;
    }

    const params: Record<string, string> = {};
    const page = searchParams?.page || 1;
    const title = searchParams?.title || '';
    const display = searchParams?.display || '';

    if (page) params.page = String(page);
    if (title) params.title = title;

    const queryString = new URLSearchParams(params).toString();
    const url = `${baseUrl}/books?${queryString}`;

    const response = await fetch(url, { cache: 'no-store' });
    const books_and_pages: BooksAndPages = await response.json();
    const totalPages = books_and_pages?.pages || 0;
    const currentPage = books_and_pages?.page || 1;
    const books: Book[] = await books_and_pages?.items;
    
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
                <div>
                    {display !== "false"? (
                        totalPages ? (
                        <>
                            <AvalaibleBooks books={books} />
                            <AvalaiblePagination
                            totalPages={totalPages}
                            currentPage={currentPage}
                            />
                        </>
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
};
