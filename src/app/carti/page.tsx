import Sidebar from './Sidebar';
import MobileSidebar from './MobileSidebar';
import BooksTable from './BooksTable';
import SearchArea from './SearchArea';
import BooksPagination from './BooksPagination';
import BASE_URL from '@/api/BASE_URL';

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
}

interface BooksAndPages {
    items: Book[];
    total: number;
    page: number;
    size: number;
    pages: number;
}

export default async function Dashboard({
    searchParams
}: {
    searchParams?: {
        page?: number;
        title?: string;
        author_id?: string; // TODO: Implement select by id
        category?: string;
        publisher?: string;
        year?: string;
        location?: string;
    };
}) {
    const currentPage = searchParams?.page || 1;
    const title = searchParams?.title || '';
    const author_id = searchParams?.author_id || '';
    const category = searchParams?.category || '';
    const publisher = searchParams?.publisher || '';
    const year = searchParams?.year || '';
    const location = searchParams?.location || '';

    const params: Record<string, string> = {};

    if (currentPage) params.page = String(currentPage);
    if (title) params.title = title;
    if (author_id) params.author_id = author_id;
    if (category) params.category = category;
    if (publisher) params.publisher = publisher;
    if (year) params.year = year;
    if (location) params.location = location;

    const queryString = new URLSearchParams(params).toString();
    const url = `${BASE_URL}/books?${queryString}`;

    console.log(url);
    const response = await fetch(url, { cache: 'no-store' });

    const books_and_pages: BooksAndPages = await response.json();
    const totalPages = books_and_pages?.pages || 0;
    const books: Book[] = await books_and_pages.items;

    return (
        <div className="grid min-h-screen w-full md:grid-cols-[180px_1fr] lg:grid-cols-[220px_1fr]">
            <Sidebar />
            <div className="flex flex-col">
                <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 md:h-[140px] lg:h-[140px] lg:px-6">
                    <MobileSidebar />
                    <SearchArea />
                </header>
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                    <div className="flex items-center">
                        <h1 className="text-lg font-semibold md:text-2xl">
                            Carti
                        </h1>
                    </div>

                    <div>
                        {/* TODO: Add suspense */}
                        {totalPages ? (
                            <>
                                <BooksTable books={books} />
                                <BooksPagination
                                    totalPages={books_and_pages.pages}
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
