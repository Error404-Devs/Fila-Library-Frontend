'use client';

import { TableCell } from '@/components/ui/table';
import { useCheckboxContext } from '../context/CheckboxContext';
import Imprumuta from './Imprumuta';
import Restituie from './Restituie';
import Inventar from './Inventar';
import { useState } from 'react';
import { BookType } from '../interfaces';

const Book = ({ book }: { book: BookType }) => {
    const { state } = useCheckboxContext();
    const [total, setTotal] = useState(book.total_copies);
    const [available, setAvailable] = useState(book.available_copies);
    const [borrowed, setBorrowed] = useState(book.borrowed_copies);

    return (
        <>
            {state.title && (
                <TableCell className="p-[10px]">{book.title}</TableCell>
            )}
            {state.author && (
                <TableCell className="p-[10px]">{book.author}</TableCell>
            )}
            {state.category && (
                <TableCell className="p-[10px]">{book.category}</TableCell>
            )}
            {state.year && (
                <TableCell className="p-[10px]">
                    {book.year_of_publication || 'N/A'}
                </TableCell>
            )}
            {state.place && (
                <TableCell className="p-[10px]">
                    {book.place_of_publication || 'N/A'}
                </TableCell>
            )}
            {state.inventory && (
                <TableCell className="p-[10px]">
                    <Inventar
                        bookId={book.id}
                        bookName={book.title}
                        available={available}
                        setAvailable={setAvailable}
                        total={total}
                        setTotal={setTotal}
                    />
                </TableCell>
            )}
            {state.borrow && (
                <TableCell className="p-[10px]">
                    <Imprumuta
                        bookId={book.id}
                        bookName={book.title}
                        bookAuthor={book.author}
                        bookCategory={book.category}
                        available={available}
                        setAvailable={setAvailable}
                        borrowed={borrowed}
                        setBorrowed={setBorrowed}
                    />
                    <Restituie
                        bookId={book.id}
                        bookName={book.title}
                        bookAuthor={book.author}
                        bookCategory={book.category}
                        available={available}
                        setAvailable={setAvailable}
                        borrowed={borrowed}
                        setBorrowed={setBorrowed}
                    />
                </TableCell>
            )}
        </>
    );
};

export default Book;
