'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState, ChangeEvent, FormEvent } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

const SearchArea = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearchTitle = (title: string) => {
        console.log(`Cautam titlul: ${title}`);
        const params = new URLSearchParams(searchParams);
        if (title) {
            params.set('title', title);
        } else {
            params.delete('title');
        }
        replace(`${pathname}?${params.toString()}`);
    };
    const handleSearchAuthor = (author_id: string) => {
        console.log(`Cautam autorul: ${author_id}`);
        const params = new URLSearchParams(searchParams);
        if (author_id) {
            params.set('author_id', author_id);
        } else {
            params.delete('author_id');
        }
        replace(`${pathname}?${params.toString()}`);
    };
    const handleSearchCategory = (category: string) => {
        console.log(`Cautam cota: ${category}`);
        const params = new URLSearchParams(searchParams);
        if (category) {
            params.set('category', category);
        } else {
            params.delete('category');
        }
        replace(`${pathname}?${params.toString()}`);
    };
    const handleSearchPublisher = (publisher: string) => {
        console.log(`Cautam editura: ${publisher}`);
        const params = new URLSearchParams(searchParams);
        if (publisher) {
            params.set('publisher', publisher);
        } else {
            params.delete('publisher');
        }
        replace(`${pathname}?${params.toString()}`);
    };
    const handleSearchYear = (year: string) => {
        console.log(`Cautam anul: ${year}`);
        const params = new URLSearchParams(searchParams);
        if (year) {
            params.set('year', year);
        } else {
            params.delete('year');
        }
        replace(`${pathname}?${params.toString()}`);
    };
    const handleSearchLocation = (location: string) => {
        console.log(`Cautam locul: ${location}`);
        const params = new URLSearchParams(searchParams);
        if (location) {
            params.set('location', location);
        } else {
            params.delete('location');
        }
        replace(`${pathname}?${params.toString()}`);
    };

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
                                value={searchParams.get('title')?.toString()}
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
                                value={searchParams
                                    .get('author_id')
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
                                value={searchParams.get('category')?.toString()}
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
                                value={searchParams
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
                                value={searchParams.get('year')?.toString()}
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
                                value={searchParams.get('location')?.toString()}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchArea;
