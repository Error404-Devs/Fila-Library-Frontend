import Sidebar from './components/Sidebar';
import MobileSidebar from './components/MobileSidebar';
import BooksTable from './bookTable/BooksTable';
import SearchArea from './components/SearchArea';
import BooksPagination from './bookTable/BooksPagination';
import AddBook from './components/AddBook';
const baseUrl = process.env.BASE_URL;
import { BookType, PagesType } from '../interfaces';
import { auth } from '../api/auth/[...nextauth]/auth';

export default async function Dashboard({
    searchParams
}: {
    searchParams?: {
        page?: number;
        title?: string;
        author?: string;
        category?: string;
        publisher?: string;
        year?: string;
        location?: string;
    };
}) {
    const page = searchParams?.page || 1;
    const title = searchParams?.title || '';
    const author = searchParams?.author || '';
    const category = searchParams?.category || '';
    const publisher = searchParams?.publisher || '';
    const year = searchParams?.year || '';
    const location = searchParams?.location || '';

    const params: Record<string, string> = {};

    if (page) params.page = String(page);
    if (title) params.title = title;
    if (author) params.author = author;
    if (category) params.category = category;
    if (publisher) params.publisher = publisher;
    if (year) params.year = year;
    if (location) params.location = location;

    const queryString = new URLSearchParams(params).toString();
    const url = `${baseUrl}/books?${queryString}`;

    const session = await auth();

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${session?.access_token}`,
            'Content-Type': 'application/json'
        },
        cache: 'no-store'
    });

    const books_and_pages: PagesType = await response.json();
    const totalPages = books_and_pages?.pages || 0;
    const currentPage = books_and_pages?.page || 1;
    const books: BookType[] = await books_and_pages?.items;

    return (
        <div className="grid min-h-screen w-full">
            <Sidebar />
            <div className="ml-60 flex-1">
                <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 md:h-[140px] lg:h-[140px] lg:px-6">
                    <MobileSidebar />
                    <SearchArea />
                </header>
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-lg font-semibold md:text-2xl">
                            Carti
                        </h1>
                        <AddBook />
                    </div>

                    <div>
                        {/* TODO: Add suspense */}
                        {totalPages ? (
                            <>
                                <BooksTable books={books} />
                                <BooksPagination
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
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
