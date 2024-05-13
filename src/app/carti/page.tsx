import Sidebar from './Sidebar';
import MobileSidebar from './MobileSidebar';
import BooksTable from './BooksTable';
import SearchArea from './SearchArea';
import BASE_URL from '@/api/BASE_URL';
import BooksPagination from './BooksPagination';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';

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
        title?: string;
        page?: string;
    };
}) {
    const title = searchParams?.title || '';
    const currentPage = Number(searchParams?.page) || 1;
    const response = await fetch(`${BASE_URL}/books`, { cache: 'no-store' });
    const books_and_pages: BooksAndPages = await response.json();
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
                        <BooksTable books={books} />
                        <BooksPagination
                            totalPages={books_and_pages.pages}
                            currentPage={currentPage}
                            title={title}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
}
