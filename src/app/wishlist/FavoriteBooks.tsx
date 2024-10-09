import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

export default function FavoriteBooks() {

    return (
        <div>
            <Table className="bg-white dark:bg-gray-800">
                <TableHeader className="bg-gray-200 dark:bg-gray-700">
                    <TableRow>
                        <TableHead className="text-black dark:text-white">Titlu</TableHead>
                        <TableHead className="text-black dark:text-white">Autor</TableHead>
                        <TableHead className="text-black dark:text-white">Favorites</TableHead>
                        <TableHead className="text-black dark:text-white">An Aparitie</TableHead>
                        <TableHead className="text-black dark:text-white">Disponibile</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow
                        className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                        <TableCell className="p-[10px] text-black dark:text-white">
                            <p>TITLU</p>
                        </TableCell>
                        <TableCell className="p-[10px] text-black dark:text-white">
                            <p>AUTOR</p>
                        </TableCell>
                        <TableCell className="p-[10px] text-black dark:text-white">
                            <Button
                                className='bg-transparent rounded-full hover:bg-transparent'
                            >
                                <Heart
                                    className='text-black'
                                />
                            </Button>
                        </TableCell>
                        <TableCell className="p-[10px] text-black dark:text-white">
                            <p>ANUL</p>
                        </TableCell>
                        <TableCell className="p-[10px] text-black dark:text-white">
                            <p>N/A</p>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}
