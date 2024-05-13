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
import BASE_URL from '@/api/BASE_URL';

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
}

interface BooksAndPages {
    items: Book[];
    total: number;
    page: number;
    size: number;
    pages: number;
}

interface BooksTableProps {
    currentPage: number;
    title: string;
    publisher: string;
    author_id: string;
    location: string;
    year: string;
}

export default async function BooksTable({
    currentPage,
    title,
    publisher,
    author_id,
    location,
    year
}: BooksTableProps) {

    const params: Record<string, string> = {};
    
    if (currentPage) params.page = String(currentPage);
    if (publisher) params.publisher = publisher;
    if (author_id) params.author_id = author_id;
    if (location) params.location = location;
    if (year) params.year = year;

    const queryString = new URLSearchParams(params).toString();
    const url = `${BASE_URL}/books?${queryString}`;
    console.log(url);
    const response = await fetch(url, { cache: 'no-store' });

    const books_and_pages: BooksAndPages = await response.json();
    const books: Book[] = await books_and_pages.items;

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Titlu</TableHead>
                        <TableHead>Cota</TableHead>
                        <TableHead>Editura</TableHead>
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
                                    {book.category}
                                </TableCell>
                                <TableCell className="p-[10px]">
                                    {book.UDC}
                                </TableCell>
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
        </>
    );
}
