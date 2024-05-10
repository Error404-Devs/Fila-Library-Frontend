import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import books from './carti.json';

const BooksTable = () => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Titlu</TableHead>
                    <TableHead>Cota</TableHead>
                    <TableHead>Editura</TableHead>
                    <TableHead>An Aparitie</TableHead>
                    <TableHead>Loc Aparitie</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {books.map((book) => (
                    <TableRow
                        key={book.IDCarte}
                        className="bg-white hover:bg-gray-100"
                    >
                        <TableCell>{book.Titlu}</TableCell>
                        <TableCell>{book.Cota}</TableCell>
                        <TableCell>{book.Editura}</TableCell>
                        <TableCell>{book.AnAparitie || 'N/A'}</TableCell>
                        <TableCell>{book.LocAparitie}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default BooksTable;
