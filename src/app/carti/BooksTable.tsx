import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ArrowBigRight } from 'lucide-react';

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
                        <TableCell>{book.Titlu}</TableCell>
                        <TableCell>{book.Cota}</TableCell>
                        <TableCell>{book.Editura}</TableCell>
                        <TableCell>{book.AnAparitie || 'N/A'}</TableCell>
                        <TableCell>{book.LocAparitie}</TableCell>
                        <TableCell>
                            <Button variant="outline" size="icon">
                                <ArrowBigRight className="h-4 w-4" />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default BooksTable;
