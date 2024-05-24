'use client';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';

import { displayNames, useCheckboxContext } from '../../context/BookProvider';
import Book from './Book';
import { BookType } from '../../interfaces';

const BooksTable = ({ books }: { books: BookType[] }) => {
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
                        books.map((book: BookType) => (
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
