import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const SearchArea = () => {
    return (
        <div className="w-full flex-1">
            <form>
                <div className="flex gap-2 py-2">
                    <div className="flex-1 relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search books..."
                            className="w-full appearance-none bg-background pl-8 shadow-none"
                        />
                    </div>
                    <div className="flex-1 relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search autori..."
                            className="w-full appearance-none bg-background pl-8 shadow-none"
                        />
                    </div>
                </div>
                <div className="flex gap-2 py-2">
                    <div className="flex-1 relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search cota..."
                            className="w-full appearance-none bg-background pl-8 shadow-none"
                        />
                    </div>
                    <div className="flex-1 relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search editura..."
                            className="w-full appearance-none bg-background pl-8 shadow-none"
                        />
                    </div>
                    <div className="flex-1 relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search an..."
                            className="w-full appearance-none bg-background pl-8 shadow-none"
                        />
                    </div>
                    <div className="flex-1 relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search loc..."
                            className="w-full appearance-none bg-background pl-8 shadow-none"
                        />
                    </div>
                </div>
            </form>

        </div>
    );
};

export default SearchArea;
