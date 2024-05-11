import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import Imprumuta from './Imprumuta';

interface Book {
    IDCarte: number;
    Titlu: string;
    Cota: string;
    Editura: string;
    AnAparitie?: string;
    LocAparitie: string;
}

const BooksTable = ({ books }: any) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Titlu</TableHead>
                    <TableHead>Cota</TableHead>
                    <TableHead>Editura</TableHead>
                    <TableHead>An Aparitie</TableHead>
                    <TableHead>Loc Aparitie</TableHead>
                    <TableHead>Imprumuta</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {books.map((book: any) => (
                    <TableRow
                        key={book.IDCarte}
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
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default BooksTable;
