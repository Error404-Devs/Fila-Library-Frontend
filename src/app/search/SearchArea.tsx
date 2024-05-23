'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { useEffect, useState } from 'react';

const SearchBar = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const [searchValue, setSearchValue] = useState(searchParams.get('title') || '');

    const handleSearchTitle = useDebouncedCallback((title: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');
        if (title) {
            params.set('title', title);
            params.set('display', 'true')
        } else {
            params.delete('title');
            params.set('display', 'false')
        }
        replace(`${pathname}?${params.toString()}`);
    }, 100);

    useEffect(() => {
        handleSearchTitle(searchValue);
    }, [searchValue]);

    return (
        <div className="flex-1 relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
                type="search"
                className="w-full appearance-none bg-background pl-8 shadow-none"
                placeholder="Cauta titlu"
                onChange={(e) => setSearchValue(e.target.value)}
                value={searchValue}
            />
        </div>
    );
}

export default SearchBar;
