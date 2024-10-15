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
    const [category, setCategory] = useState('');
    const [yearOfPublication, setYearOfPublication] = useState<number | ''>(''); // number or empty string
    const [placeOfPublication, setPlaceOfPublication] = useState('');
    const [price, setPrice] = useState<number | ''>(''); // number or empty string
    const [copies, setCopies] = useState<number | ''>(''); // number or empty string
    const { toast } = useToast();
    const { data: session } = useSession();
    const accessToken = session?.access_token;

    const isFormValid = () => {
        return title.trim() !== '' && copies !== '' && !isNaN(copies); // Ensure copies is a number
    };

    const handleSubmit = async () => {
        if (!isFormValid()) {
            toast({
                title: 'Error',
                description:
                    'Title and copies are required, and copies must be a number!'
            });
            return;
        }

        const bookData = {
            title: title,
            category: category || null,
            year_of_publication:
                yearOfPublication !== '' ? yearOfPublication : null,
            place_of_publication: placeOfPublication || null,
            price: price !== '' ? price : null,
            copies: copies,

            collection_id: null,
            publisher_id: null,
            author_id: null,
            UDC: null,
            ISBN: null
        };

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
                    description: `Book "${title}" has been added successfully!`
                });
                setTitle('');
                setCategory('');
                setYearOfPublication('');
                setPlaceOfPublication('');
                setPrice('');
                setCopies('');
            } else {
                console.error(`Error: ${response.statusText}`);
                toast({
                    title: 'Error',
                    description: 'Failed to add the book!'
                });
            }
        } catch (error) {
            console.error('Error adding book:', error);
            toast({
                title: 'Error',
                description: 'An unexpected error occurred.'
            });
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="mr-9">
                    Add a Book
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add a Book</DialogTitle>
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
                        <Label htmlFor="category" className="text-right">
                            Cota
                        </Label>
                        <Input
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label
                            htmlFor="yearOfPublication"
                            className="text-right"
                        >
                            An
                        </Label>
                        <Input
                            id="yearOfPublication"
                            type="number" // Set input type to number
                            value={yearOfPublication}
                            onChange={(e) =>
                                setYearOfPublication(
                                    e.target.value !== ''
                                        ? parseInt(e.target.value)
                                        : ''
                                )
                            }
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label
                            htmlFor="placeOfPublication"
                            className="text-right"
                        >
                            Loc
                        </Label>
                        <Input
                            id="placeOfPublication"
                            value={placeOfPublication}
                            onChange={(e) =>
                                setPlaceOfPublication(e.target.value)
                            }
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="price" className="text-right">
                            Pret
                        </Label>
                        <Input
                            id="price"
                            type="number" // Set input type to number
                            value={price}
                            onChange={(e) =>
                                setPrice(
                                    e.target.value !== ''
                                        ? parseFloat(e.target.value)
                                        : ''
                                )
                            }
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="copies" className="text-right">
                            Inventar
                        </Label>
                        <Input
                            id="copies"
                            type="number" // Set input type to number
                            value={copies}
                            onChange={(e) =>
                                setCopies(
                                    e.target.value !== ''
                                        ? parseInt(e.target.value)
                                        : ''
                                )
                            }
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
                        Add Book
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AddBook;
