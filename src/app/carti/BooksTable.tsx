'use client';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';

import { displayNames, useCheckboxContext } from '../context/CheckboxContext';
import Book from './Book';

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
                                <Book book={book} />
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </>
    );
};
export default BooksTable;
