import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';

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

export default function AvalaibleBooks({ books }: { books: Book[] }){

    return(
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Titlu</TableHead>
                        <TableHead>Autor</TableHead>
                        <TableHead>Categorie</TableHead>
                        <TableHead>An Aparitie</TableHead>
                        <TableHead>Disponibile</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Array.isArray(books) &&
                        books.map((book: any) => (
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
                                <TableCell className="p-[10px]">
                                    {book.year_of_publication || 'N/A'}
                                </TableCell>
                                <TableCell className="p-[10px]">
                                    {book.available_copies || 'N/A'}
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </div>
    );
}