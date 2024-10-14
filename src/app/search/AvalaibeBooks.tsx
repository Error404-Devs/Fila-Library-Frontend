'use client'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { BookType } from '../interfaces';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function AvailableBooks({ books, student_id } : { books: BookType[], student_id : any }) {

    const [favorites, setFavorites] = useState<boolean[]>(books.map(() => false));
    const [wishlist, setWishlist] = useState<any[]>([]);
    const { toast } = useToast();

    const toggleFavorite = (index: number) => {
        const updatedFavorites = [...favorites];
        updatedFavorites[index] = !updatedFavorites[index];
        setFavorites(updatedFavorites);
    };

    const getWishList = async () => {
        try {
            const response = await fetch(`${baseUrl}/books/wishlist?student_id=${student_id}`)
            if (response.ok) {
                const data = await response.json(); 
                setWishlist(data);
            } else {
                console.error(`Error: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error fetching wishlist:', error);
        }
    };

    // Check if a book is in the wishlist
    const isBookInWishlist = (bookId: any) => {
        return wishlist.some(item => item.book_id === bookId);
    };

    useEffect(() => {
        // Fetch wishlist on mount
        getWishList();
    }, []); 

    useEffect(() => {
        // Once the wishlist is fetched, update the favorites state
        const updatedFavorites = books.map(book => isBookInWishlist(book.id));
        setFavorites(updatedFavorites);
    }, [wishlist, books]);

    const addToWishlist = async (index: any, book_id: any) => {
        const data = {
            book_id: book_id,
            student_id: student_id
        };
        try {
            const response = await fetch(`${baseUrl}/books/wishlist`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                toast({
                    title: 'Cartea a fost adaugata la favorite',
                })
                toggleFavorite(index);
            } else {
                console.error(`Error adding to wishlist: ${response.statusText}`);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    // const deleteFromWishlist = async (index: any, book_id: any) => {
    //     const data = {
    //         book_id: book_id,
    //         student_id: student_id
    //     };
    //     try {
    //         const response = await fetch(`${baseUrl}/books/wishlist`, {
    //             method: 'DELETE',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(data)
    //         });
    //         if (response.ok) {
    //             toggleFavorite(index);
    //         } else {
    //             console.error(`Error removing from wishlist: ${response.statusText}`);
    //         }
    //     } catch (error) {
    //         console.error('An error occurred:', error);
    //     }
    // };

    return (
        <div>
            <Table className="bg-white dark:bg-gray-800">
                <TableHeader className="bg-gray-200 dark:bg-gray-700">
                    <TableRow>
                        <TableHead className="text-black dark:text-white">Titlu</TableHead>
                        <TableHead className="text-black dark:text-white">Autor</TableHead>
                        <TableHead className="text-black dark:text-white">Favorites</TableHead>
                        <TableHead className="text-black dark:text-white">An Aparitie</TableHead>
                        <TableHead className="text-black dark:text-white">Disponibile</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Array.isArray(books) &&
                        books.map((book: BookType, index: number) => (
                            <TableRow
                                key={book.id}
                                className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-600"
                            >
                                <TableCell className="p-[10px] text-black dark:text-white">
                                    {book.title}
                                </TableCell>
                                <TableCell className="p-[10px] text-black dark:text-white">
                                    {book.author}
                                </TableCell>
                                <TableCell className="p-[10px] text-black dark:text-white">
                                    <Button
                                        className='bg-transparent rounded-full hover:bg-transparent'
                                        onClick={() => favorites[index] ? toast({
                                            title: 'Cartea este deja adaugata la favorite',
                                        }) : addToWishlist(index, book.id)}
                                    >
                                        <Heart
                                            className={favorites[index] ? 'text-red-400 fill-red-400' : 'text-black'}
                                        />
                                    </Button>
                                </TableCell>
                                <TableCell className="p-[10px] text-black dark:text-white">
                                    {book.year_of_publication || 'N/A'}
                                </TableCell>
                                <TableCell className="p-[10px] text-black dark:text-white">
                                    {book.available_copies || 'N/A'}
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </div>
    );
}
