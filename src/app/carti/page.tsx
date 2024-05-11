import Sidebar from './Sidebar';
import MobileSidebar from './MobileSidebar';
import BooksTable from './BooksTable';
import SearchArea from './SearchArea';
import BASE_URL from '@/api/BASE_URL';

const Dashboard = async () => {
    const response = await fetch(`${BASE_URL}/books`);
    const books = await response.json();

    console.log(books);

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
                    </div>
                </main>
            </div>
        </div>
    );
};
export default Dashboard;
