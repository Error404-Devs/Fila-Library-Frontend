'use client'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast'; 
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


export default function FavoriteBooks({student_id}: any) {

    const [wishlist, setWishlist] = useState([])
    const {toast} = useToast()

    const getWishList = async () => {
        try {
            const response = await fetch(`${baseUrl}/books/wishlist?student_id=${student_id}`)
            if (response.ok) {
                const data = await response.json(); 
                toast({
                    title: 'Cartea a fost stearsa din favorite.',
                })

                setWishlist(data)
            } else {
                console.error(`Error: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error submitting books wishlist request:', error);
        }
    };

    const deleteFromWishlist = async (index:any, book_id: any) => {
        try {
            const data = {
                wish_id: book_id,
            };
            const response = await fetch(`${baseUrl}/books/wishlist`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        if(response.ok){
            getWishList();
        }
        } catch (error) {
            console.error('An error occurred:', error);
        }
        };

    useEffect(() => {
        getWishList();
    }, []); 

    return (
        <div>
            <Table className="bg-white dark:bg-gray-800">
                <TableHeader className="bg-gray-200 dark:bg-gray-700">
                    <TableRow>
                        <TableHead className="text-black dark:text-white">Titlu</TableHead>
                        <TableHead className="text-black dark:text-white">Autor</TableHead>
                        <TableHead className="text-black dark:text-white">Favorites</TableHead>
                        <TableHead className="text-black dark:text-white">Disponibile</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                {Array.isArray(wishlist) &&
                        wishlist.map((wish:any, index: number) => (
                    <TableRow
                        key={wish.id}
                        className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                        <TableCell className="p-[10px] text-black dark:text-white">
                            <p>{wish.book_name}</p>
                        </TableCell>
                        <TableCell className="p-[10px] text-black dark:text-white">
                            <p>{wish.book_author}</p>
                        </TableCell>
                        <TableCell className="p-[10px] text-black dark:text-white">
                            <Button
                                className='bg-transparent rounded-full hover:bg-transparent'
                                onClick={() =>deleteFromWishlist(index, wish.id)}
                            >
                                <Heart
                                    className='text-red-400 fill-red-400'
                                />
                            </Button>
                        </TableCell>
                        <TableCell className="p-[10px] text-black dark:text-white">
                            <p>N/A</p>
                        </TableCell>
                    </TableRow>
                        ))}
                </TableBody>
            </Table>
        </div>
    );
}
