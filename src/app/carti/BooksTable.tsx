import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import Imprumuta from './Imprumuta';
import { ArrowBigLeft } from 'lucide-react';
import Restituie from './Restituie';

interface Book {
    id: string;
    title: string;
    category: string;
    collection_id: string;
    publisher_id: string;
    author_id: string;
    UDC: string;
    year_of_publication: string;
    place_of_publication: string;
    ISBN: string;
    price: string;
}

interface BooksTableProps {
    books: Book[];
}

const BooksTable = ({ books }: BooksTableProps) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Titlu</TableHead>
                    <TableHead>Cota</TableHead>
                    <TableHead>Editura</TableHead>
                    <TableHead>An Aparitie</TableHead>
                    <TableHead>Loc Aparitie</TableHead>
                    <TableHead>Imprumutare/Restituire</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {books.map((book: Book) => (
                    <TableRow
                        key={book.id}
                        className="bg-white hover:bg-gray-100"
                    >
                        <TableCell className="p-[10px]">{book.title}</TableCell>
                        <TableCell className="p-[10px]">
                            {book.category}
                        </TableCell>
                        <TableCell className="p-[10px]">{book.UDC}</TableCell>
                        <TableCell className="p-[10px]">
                            {book.year_of_publication || 'N/A'}
                        </TableCell>
                        <TableCell className="p-[10px]">
                            {book.place_of_publication || 'N/A'}
                        </TableCell>
                        <TableCell className="p-[10px]">
                            <Imprumuta bookName={book.title} />
                            <Restituie bookName={book.title} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default BooksTable;
