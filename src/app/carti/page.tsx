import Sidebar from './Sidebar';
import MobileSidebar from './MobileSidebar';
import BooksTable from './BooksTable';
import SearchArea from './SearchArea';
import BooksPagination from './BooksPagination';
const baseUrl = process.env.BASE_URL;

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

    const response = await fetch(url, { cache: 'no-store' });
    const books_and_pages: BooksAndPages = await response.json();
    const totalPages = books_and_pages?.pages || 0;
    const currentPage = books_and_pages?.page || 1;
    const books: Book[] = await books_and_pages?.items;

    // const [visibleAuthor, setVisibleAuthor] = useState(true);

    return (
        <div className="grid min-h-screen w-full">
            <Sidebar />
            <div className="ml-60 flex-1">
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
