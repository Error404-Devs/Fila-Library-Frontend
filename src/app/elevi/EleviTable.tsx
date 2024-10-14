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
import { Badge, Book } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EleviModal from './EleviModal';

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
}

interface EleviTableInterface {
    students: Student[];
}

export default function EleviTable({ students }: EleviTableInterface) {
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
                    <TableHead>Carti</TableHead>
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
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <DialogTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        className="h-[40px] w-[40px] p-1 mx-2"
                                                    >
                                                        <div className="relative h-7 w-7">
                                                            <Book className="static h-6 w-6 mt-1 mr-1" />
                                                            <Badge className=" dark:bg-white bg-black absolute top-0 right-0 flex h-4 w-4 p-1 shrink-0 items-center justify-center rounded-full">
                                                                3
                                                            </Badge>
                                                        </div>
                                                    </Button>
                                                </DialogTrigger>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Carti Imprumutate</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                    <EleviModal />
                                </Dialog>
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={6} className="text-center">
                            No students found
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
