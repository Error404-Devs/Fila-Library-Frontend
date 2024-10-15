'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

const SearchArea = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearchTitle = useDebouncedCallback((title: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');
        if (title) {
            params.set('title', title);
        } else {
            params.delete('title');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);
    const handleSearchAuthor = useDebouncedCallback((author: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');
        if (author) {
            params.set('author', author);
        } else {
            params.delete('author');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);
    const handleSearchCategory = useDebouncedCallback((category: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');
        if (category) {
            params.set('category', category);
        } else {
            params.delete('category');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);
    const handleSearchPublisher = useDebouncedCallback((publisher: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');
        if (publisher) {
            params.set('publisher', publisher);
        } else {
            params.delete('publisher');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);
    const handleSearchYear = useDebouncedCallback((year: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');
        if (year) {
            params.set('year', year);
        } else {
            params.delete('year');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);
    const handleSearchLocation = useDebouncedCallback((location: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');
        if (location) {
            params.set('location', location);
        } else {
            params.delete('location');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <>
            <div className="w-full flex-1">
                <div className="flex-1">
                    <div className="flex gap-2 py-2">
                        <div className="flex-1 relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                className="w-full appearance-none bg-background pl-8 shadow-none"
                                placeholder="Cauta titlu"
                                onChange={(e) => {
                                    handleSearchTitle(e.target.value);
                                }}
                                defaultValue={searchParams
                                    .get('title')
                                    ?.toString()}
                            />
                        </div>
                        <div className="flex-1 relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Cauta autori..."
                                className="w-full appearance-none bg-background pl-8 shadow-none"
                                onChange={(e) => {
                                    handleSearchAuthor(e.target.value);
                                }}
                                defaultValue={searchParams
                                    .get('author')
                                    ?.toString()}
                            />
                        </div>
                    </div>
                    <div className="flex gap-2 py-2">
                        <div className="flex-1 relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Cauta cota..."
                                className="w-full appearance-none bg-background pl-8 shadow-none"
                                onChange={(e) => {
                                    handleSearchCategory(e.target.value);
                                }}
                                defaultValue={searchParams
                                    .get('category')
                                    ?.toString()}
                            />
                        </div>
                        <div className="flex-1 relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Cauta editura..."
                                className="w-full appearance-none bg-background pl-8 shadow-none"
                                onChange={(e) => {
                                    handleSearchPublisher(e.target.value);
                                }}
                                defaultValue={searchParams
                                    .get('publisher')
                                    ?.toString()}
                            />
                        </div>
                        <div className="flex-1 relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Cauta an..."
                                className="w-full appearance-none bg-background pl-8 shadow-none"
                                onChange={(e) => {
                                    handleSearchYear(e.target.value);
                                }}
                                defaultValue={searchParams
                                    .get('year')
                                    ?.toString()}
                            />
                        </div>
                        <div className="flex-1 relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Cauta loc..."
                                className="w-full appearance-none bg-background pl-8 shadow-none"
                                onChange={(e) => {
                                    handleSearchLocation(e.target.value);
                                }}
                                defaultValue={searchParams
                                    .get('location')
                                    ?.toString()}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchArea;
