import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '@/components/ui/tooltip';
import { Book } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import EleviModal from './EleviModal';
import { useState } from 'react';
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

interface Student {
    id: string;
    login_id: string;
    first_name: string;
    last_name: string;
    gender: string;
    year: string;
    group: string;
    address: string;
    phone_number: string;
    location: string;
    created_at: string;
    books_borrowed: [];
}

interface EleviTableInterface {
    students: Student[];
}

export default function EleviTable({ students }: EleviTableInterface) {
    const [books, setBooks] = useState([]);

    const handleGetBooks = async (student: Student) => {
        try {
            const response = await fetch(
                `${baseUrl}/borrows?login_id=${student.first_name}${student.login_id}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    }
                }
            );
            if (response.ok) {
                const result = await response.json();
                setBooks(result.items);
            } else {
                console.error(`Error: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error getting books:', error);
        }
    };

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Prenume</TableHead>
                    <TableHead>Nume</TableHead>
                    <TableHead>Gen</TableHead>
                    <TableHead>Clasa</TableHead>
                    <TableHead>Mediu</TableHead>
                    <TableHead>Telefon</TableHead>
                    <TableHead>Carti Imprumutate</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {students.length > 0 ? (
                    students.map((student) => (
                        <TableRow key={student.id}>
                            <TableCell>{student.first_name}</TableCell>
                            <TableCell>{student.last_name}</TableCell>
                            <TableCell>
                                {student.gender === 'male' ? 'M' : 'F'}
                            </TableCell>
                            <TableCell>
                                {student.year}
                                {student.group}
                            </TableCell>
                            <TableCell>{student.address}</TableCell>
                            <TableCell>{student.phone_number}</TableCell>
                            <TableCell>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="h-[40px] w-[40px] p-1 mx-2"
                                            onClick={() => {
                                                handleGetBooks(student);
                                            }}
                                            disabled={
                                                student.books_borrowed.length ==
                                                0
                                            }
                                        >
                                            <div className="relative h-7 w-7">
                                                <Book className="static h-6 w-6 mt-1 mr-1" />
                                                <Badge className=" dark:bg-white bg-black absolute top-0 right-0 flex h-4 w-4 p-1 shrink-0 items-center justify-center rounded-full">
                                                    {
                                                        student.books_borrowed
                                                            .length
                                                    }
                                                </Badge>
                                            </div>
                                        </Button>
                                    </DialogTrigger>
                                    <EleviModal books={books} />
                                </Dialog>
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={6} className="text-center">
                            Nu s-au gasit studenti
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
