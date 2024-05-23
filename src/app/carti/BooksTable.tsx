'use client';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import Imprumuta from './Imprumuta';
import Restituie from './Restituie';
import Inventar from './Inventar';
import { displayNames, useCheckboxContext } from '../context/CheckboxContext';

interface Book {
    id: string;
    title: string;
    category: string;
    collection: string;
    publisher: string;
    author: string;
    UDC: string;
    year_of_publication: string;
    place_of_publication: string;
    ISBN: string;
    price: string;
    total_copies: number;
    available_copies: number;
    borrowed_copies: number;
}

const BooksTable = ({ books }: { books: Book[] }) => {
    const { state } = useCheckboxContext();

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        {state.title && (
                            <TableHead>{displayNames.title}</TableHead>
                        )}
                        {state.author && (
                            <TableHead>{displayNames.author}</TableHead>
                        )}
                        {state.category && (
                            <TableHead>{displayNames.category}</TableHead>
                        )}
                        {state.year && (
                            <TableHead>{displayNames.year}</TableHead>
                        )}
                        {state.place && (
                            <TableHead>{displayNames.place}</TableHead>
                        )}
                        {state.inventory && (
                            <TableHead>{displayNames.inventory}</TableHead>
                        )}
                        {state.borrow && (
                            <TableHead>{displayNames.borrow}</TableHead>
                        )}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Array.isArray(books) &&
                        books.map((book: Book) => (
                            <TableRow
                                key={book.id}
                                className="bg-white hover:bg-gray-100"
                            >
                                {state.title && (
                                    <TableCell className="p-[10px]">
                                        {book.title}
                                    </TableCell>
                                )}
                                {state.author && (
                                    <TableCell className="p-[10px]">
                                        {book.author}
                                    </TableCell>
                                )}
                                {state.category && (
                                    <TableCell className="p-[10px]">
                                        {book.category}
                                    </TableCell>
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
                                            availableCopies={
                                                book.available_copies
                                            }
                                            totalCopies={book.total_copies}
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
                                            availableCopies={
                                                book.available_copies
                                            }
                                        />
                                        <Restituie
                                            bookId={book.id}
                                            bookName={book.title}
                                            bookAuthor={book.author}
                                            bookCategory={book.category}
                                            borrowedCopies={
                                                book.borrowed_copies
                                            }
                                        />
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </>
    );
};
export default BooksTable;
