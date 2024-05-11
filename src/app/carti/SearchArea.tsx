'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState, ChangeEvent, FormEvent } from 'react';

const SearchArea = () => {
    const [searchTitlu, setSearchTitlu] = useState('');
    const [searchAutori, setSearchAutori] = useState('');
    const [searchCota, setSearchCota] = useState('');
    const [searchEditura, setSearchEditura] = useState('');
    const [searchAn, setSearchAn] = useState('');
    const [searchLoc, setSearchLoc] = useState('');

    type ChangeEventType = ChangeEvent<HTMLInputElement>;
    type FormEventType = FormEvent<HTMLFormElement>;
    const handleSearchTitluChange = (event: ChangeEventType) => {
        setSearchTitlu(event.target.value);
    };
    const handleSearchAutoriChange = (event: ChangeEventType) => {
        setSearchAutori(event.target.value);
    };
    const handleSearchCotaChange = (event: ChangeEventType) => {
        setSearchCota(event.target.value);
    };
    const handleSearchEdituraChange = (event: ChangeEventType) => {
        setSearchEditura(event.target.value);
    };
    const handleSearchAnChange = (event: ChangeEventType) => {
        setSearchAn(event.target.value);
    };
    const handleSearchLocChange = (event: ChangeEventType) => {
        setSearchLoc(event.target.value);
    };

    const handleSubmit = (event: FormEventType): void => {
        event.preventDefault();
        console.log({
            searchTitlu,
            searchAutori,
            searchCota,
            searchEditura,
            searchAn,
            searchLoc
        });
    };

    return (
        <>
            <div className="w-full flex-1">
                <form onSubmit={handleSubmit} className="flex">
                    <div className="flex-1">
                        <div className="flex gap-2 py-2">
                            <div className="flex-1 relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search titlu..."
                                    className="w-full appearance-none bg-background pl-8 shadow-none"
                                    value={searchTitlu}
                                    onChange={handleSearchTitluChange}
                                />
                            </div>
                            <div className="flex-1 relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search autori..."
                                    className="w-full appearance-none bg-background pl-8 shadow-none"
                                    value={searchAutori}
                                    onChange={handleSearchAutoriChange}
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
                                    value={searchCota}
                                    onChange={handleSearchCotaChange}
                                />
                            </div>
                            <div className="flex-1 relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search editura..."
                                    className="w-full appearance-none bg-background pl-8 shadow-none"
                                    value={searchEditura}
                                    onChange={handleSearchEdituraChange}
                                />
                            </div>
                            <div className="flex-1 relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search an..."
                                    className="w-full appearance-none bg-background pl-8 shadow-none"
                                    value={searchAn}
                                    onChange={handleSearchAnChange}
                                />
                            </div>
                            <div className="flex-1 relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search loc..."
                                    className="w-full appearance-none bg-background pl-8 shadow-none"
                                    value={searchLoc}
                                    onChange={handleSearchLocChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center p-3">
                        <Button
                            type="submit"
                            variant="outline"
                            className="h-[48px] w-[48px] p-4"
                        >
                            <Search className="h-8 w-8" />
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default SearchArea;
