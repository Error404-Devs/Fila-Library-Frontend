import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
const books = [
    { id: 1, title: "Book 1", author: "Author 1", category: "Category 1", year_of_publication: 2020, available_copies: 5 },
    { id: 2, title: "Book 2", author: "Author 2", category: "Category 2", year_of_publication: 2015, available_copies: 3 },
    { id: 3, title: "Book 3", author: "Author 3", category: "Category 1", year_of_publication: 2015, available_copies: 2 },
    // Add more book objects as needed
];

export default function AvalaibleBooks(){

    return(
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Titlu</TableHead>
                        <TableHead>Autor</TableHead>
                        <TableHead>Categorie</TableHead>
                        <TableHead>An Aparitie</TableHead>
                        <TableHead>Cantitate</TableHead>
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