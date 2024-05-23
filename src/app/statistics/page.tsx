import Sidebar from './Sidebar';
import { Button } from '@/components/ui/button';

export default async function Statistics() {
    return (
        <div className="grid min-h-screen w-full">
            <Sidebar />
            <div className="ml-60 flex-1">
                <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 md:h-[140px] lg:h-[140px] lg:px-6">
                    {/* <MobileSidebar />
                    <SearchArea /> */}
                </header>
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-lg font-semibold md:text-2xl">
                            Statistice
                        </h1>
                    </div>

                    <div></div>
                </main>
            </div>
        </div>
    );
}
