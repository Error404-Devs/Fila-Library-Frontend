import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { BookType } from '../interfaces';

export default function AvalaibleBooks({ books }: { books: BookType[] }) {
    // const handleSearchTitle = useDebouncedCallback((title: string) => {
    //     console.log(`Cautam titlul: ${title}`);
    //     const params = new URLSearchParams(searchParams);
    //     params.set('page', '1');
    //     if (title) {
    //         params.set('title', title);
    //     } else {
    //         params.delete('title');
    //     }
    //     replace(`${pathname}?${params.toString()}`);
    // }, 300);

    return (
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
                                {/* <TableCell className="p-[10px]">
                                    {book.UDC}
                                </TableCell> */}
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
