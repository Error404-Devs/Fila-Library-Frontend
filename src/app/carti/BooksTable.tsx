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
                        <TableCell className="p-[10px]">{book.Titlu}</TableCell>
                        <TableCell className="p-[10px]">{book.Cota}</TableCell>
                        <TableCell className="p-[10px]">
                            {book.Editura}
                        </TableCell>
                        <TableCell className="p-[10px]">
                            {book.AnAparitie || 'N/A'}
                        </TableCell>
                        <TableCell className="p-[10px]">
                            {book.LocAparitie}
                        </TableCell>
                        <TableCell className="p-[10px]">
                            <Imprumuta bookName={book.Titlu} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default BooksTable;
