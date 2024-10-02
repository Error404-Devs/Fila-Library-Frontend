'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
import { useSession } from 'next-auth/react';

const AddBook = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [quote, setQuote] = useState('');
    const [year, setYear] = useState('');
    const [location, setLocation] = useState('');
    const [inventory, setInventory] = useState('');
    const { toast } = useToast();
    const { data: session } = useSession();
    const accessToken = session?.access_token;

    const isFormValid = () => {
        return (
            title.trim() !== '' &&
            author.trim() !== '' &&
            quote.trim() !== '' &&
            year.trim() !== '' &&
            location.trim() !== '' &&
            inventory.trim() !== ''
        );
    };

    const handleSubmit = async () => {
        if (!isFormValid()) {
            toast({
                title: 'Error',
                description: 'All fields are required!',
                status: 'error'
            });
            return;
        }

        const bookData = {
            title: title,
            author: author,
            quote: quote,
            year: year,
            location: location,
            inventory: inventory
        };

        console.log(bookData);

        try {
            const response = await fetch(`${baseUrl}/books`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(bookData)
            });

            if (response.ok) {
                toast({
                    title: 'Success',
                    description: `Book "${title}" has been added successfully!`,
                    status: 'success'
                });
                setTitle('');
                setAuthor('');
                setQuote('');
                setYear('');
                setLocation('');
                setInventory('');
            } else {
                console.error(`Error: ${response.statusText}`);
                toast({
                    title: 'Error',
                    description: 'Failed to add the book!',
                    status: 'error'
                });
            }
        } catch (error) {
            console.error('Error adding book:', error);
            toast({
                title: 'Error',
                description: 'An unexpected error occurred.',
                status: 'error'
            });
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="mr-9">
                    Adauga o carte
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Adauga o carte</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                            Titlu
                        </Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="author" className="text-right">
                            Autor
                        </Label>
                        <Input
                            id="author"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="quote" className="text-right">
                            Cota
                        </Label>
                        <Input
                            id="quote"
                            value={quote}
                            onChange={(e) => setQuote(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="year" className="text-right">
                            An Aparitie
                        </Label>
                        <Input
                            id="year"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="location" className="text-right">
                            Loc Aparitie
                        </Label>
                        <Input
                            id="location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="inventory" className="text-right">
                            Inventar
                        </Label>
                        <Input
                            id="inventory"
                            value={inventory}
                            onChange={(e) => setInventory(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        type="submit"
                        onClick={handleSubmit}
                        disabled={!isFormValid()}
                    >
                        Adauga Carte
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AddBook;
