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

export default async function BooksTable({ books }: { books: Book[] }) {
    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Titlu</TableHead>
                        <TableHead>Autor</TableHead>
                        <TableHead>Cota</TableHead>
                        {/* <TableHead>Editura</TableHead> */}
                        <TableHead>An Aparitie</TableHead>
                        <TableHead>Loc Aparitie</TableHead>
                        <TableHead>Imprumutare / Restituire</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Array.isArray(books) &&
                        books.map((book: Book) => (
                            <TableRow
                                key={book.id}
                                className="bg-white hover:bg-gray-100"
                            >
                                <TableCell className="p-[10px]">
                                    {book.title}
                                </TableCell>
                                <TableCell className="p-[10px]">
                                    {book.author}
                                </TableCell>
                                <TableCell className="p-[10px]">
                                    {book.category}
                                </TableCell>
                                {/* <TableCell className="p-[10px]">
                                    {book.UDC}
                                </TableCell> */}
                                <TableCell className="p-[10px]">
                                    {book.year_of_publication || 'N/A'}
                                </TableCell>
                                <TableCell className="p-[10px]">
                                    {book.place_of_publication || 'N/A'}
                                </TableCell>
                                <TableCell className="p-[10px]">
                                    <Imprumuta
                                        bookName={book.title}
                                        bookAuthor={book.author}
                                        availableCopies={book.available_copies}
                                        bookCategory={book.category}
                                    />
                                    <Restituie
                                        bookName={book.title}
                                        borrowedCopies={book.borrowed_copies}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </>
    );
}
