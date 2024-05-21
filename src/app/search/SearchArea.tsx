import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function SearchBar() {
    return(
        <>
            <div className="flex-1 relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    className="w-full appearance-none bg-background pl-8 shadow-none"
                    placeholder="Search"
                    required
                />
            </div>
        </>
    );
}