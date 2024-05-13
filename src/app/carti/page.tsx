import Sidebar from './Sidebar';
import MobileSidebar from './MobileSidebar';
import BooksTable from './BooksTable';
import SearchArea from './SearchArea';
import BooksPagination from './BooksPagination';

export default async function Dashboard({
    searchParams
}: {
    searchParams?: {
        page?: number;
        title?: string;
        publisher?: string;
        author_id?: string; // TODO: Implement select by id
        location?: string;
        year?: string;
    };
}) {
    const currentPage = searchParams?.page || 1;
    const title = searchParams?.title || '';
    const publisher = searchParams?.publisher || '';
    const author_id = searchParams?.author_id || '';
    const location = searchParams?.location || '';
    const year = searchParams?.year || '';

    

    return (
        <div className="grid min-h-screen w-full md:grid-cols-[180px_1fr] lg:grid-cols-[220px_1fr]">
            <Sidebar />
            <div className="flex flex-col">
                <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 md:h-[140px] lg:h-[140px] lg:px-6">
                    <MobileSidebar />
                    <SearchArea title={'Cauta titlu...'} />
                </header>
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                    <div className="flex items-center">
                        <h1 className="text-lg font-semibold md:text-2xl">
                            Carti
                        </h1>
                    </div>

                    <div>
                        {/* TODO: Add suspense */}
                        <BooksTable
                            currentPage={currentPage}
                            title={title}
                            publisher={publisher}
                            author_id={author_id}
                            location={location}
                            year={year}
                        />

                        <BooksPagination
                            totalPages={17}
                            currentPage={currentPage}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
}
