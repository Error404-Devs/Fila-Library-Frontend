'use client';

import {
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogClose
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useEffect, useState } from 'react';
import RestituieCarte from './RestituieCarte';
import RestituieCalendar from './RestituieCalendar';
import { useToast } from '@/components/ui/use-toast';
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

interface RestituieModalProps {
    bookId: string;
    bookName: string;
    bookAuthor: string;
    bookCategory: string;
}
const RestituieModal = ({
    bookId,
    bookName,
    bookAuthor,
    bookCategory
}: RestituieModalProps) => {
    const [elevi, setElevi] = useState([]);
    const [chosenElev, setChosenElev] = useState('');
    const [nume, setNume] = useState('');
    const [prenume, setPrenume] = useState('');
    const [gender, setGender] = useState('');
    const [year, setYear] = useState('');
    const [group, setGroup] = useState('');
    const [mediu, setMediu] = useState('');
    const [phone, setPhone] = useState('');
    const [borrowedDate, setBorrowedDate] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [borrowId, setBorrowId] = useState('');
    const { toast } = useToast();

    useEffect(() => {
        fetchElevi();
    }, []);

    const fetchElevi = async () => {
        try {
            const response = await fetch(
                `${baseUrl}/borrows/book?book_id=${bookId}`
            );
            if (response.ok) {
                const result = await response.json();
                console.log(result);
                setElevi(result);
            }
        } catch (err: any) {
            console.error('Fetching elev error:', err);
        }
    };

    const handleSelectChange = (id: string) => {
        setChosenElev(id);
        const selectedElev: any = elevi.find((elev: any) => elev.id === id);
        if (selectedElev) {
            setNume(selectedElev.last_name);
            setPrenume(selectedElev.first_name);
            setGender(selectedElev.gender);
            setYear(selectedElev.year);
            setGroup(selectedElev.group);
            setMediu(selectedElev.address);
            setPhone(selectedElev.phone_number);
            setBorrowedDate(selectedElev.borrow_date);
            setDueDate(selectedElev.due_date);
            setBorrowId(selectedElev.borrow_id);
        }
    };

    const handleRestituire = async () => {
        const returnData = {
            borrow_id: borrowId
        };
        try {
            const response = await fetch(`${baseUrl}/return`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(returnData)
            });
            if (response.ok) {
                toast({
                    title: 'Cartea a fost restituita cu succes!',
                    description: `${nume} ${prenume} a restituit cartea ${bookName}`
                });
            } else {
                console.error(`Error: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error submitting borrow request:', error);
        }
    };

    return (
        <>
            <DialogHeader>
                <DialogTitle>Restituie Cartea: {bookName}</DialogTitle>
                <DialogDescription>
                    Completetati datele elevelui care Restituie cartea
                </DialogDescription>
            </DialogHeader>
            <div className="flex gap-4 py-4">
                <div>
                    <RestituieCarte
                        bookName={bookName}
                        bookAuthor={bookAuthor}
                        bookCategory={bookCategory}
                    />
                    <RestituieCalendar
                        dueDate={dueDate}
                        borrowedDate={borrowedDate}
                    />
                </div>
                <Separator orientation="vertical" />
                <div>
                    <h4 className="mb-6 text-xl font-semibold tracking-tight">
                        Date despre{' '}
                        <span className="underline underline-offset-4">
                            elev
                        </span>
                    </h4>
                    <div className="grid grid-cols-4 items-center gap-4 py-2">
                        <Label className="text-right">Nr matricol{'\n'}</Label>
                        <Select onValueChange={handleSelectChange}>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Alege un elev" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {elevi.map((elev: any) => (
                                        <SelectItem
                                            key={elev.id}
                                            value={elev.id}
                                        >
                                            {elev.id}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4 py-1">
                        <Label className="text-right">Nume</Label>
                        <Input
                            className="col-span-3"
                            value={nume}
                            disabled={true}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4 py-1">
                        <Label className="text-right">Prenume</Label>
                        <Input
                            className="col-span-3"
                            value={prenume}
                            disabled={true}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4 py-1">
                        <Label className="text-right">Gen</Label>
                        <Input
                            className="col-span-3"
                            value={gender}
                            disabled={true}
                        />
                    </div>
                    <div className="grid grid-cols-8 items-center gap-4 py-1">
                        <Label className="text-right col-span-2">Clasa</Label>
                        <Input
                            className="col-span-3"
                            value={year}
                            disabled={true}
                        />
                        <Input
                            className="col-span-3"
                            value={group}
                            disabled={true}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4 py-1">
                        <Label className="text-right">Mediu</Label>
                        <Input
                            className="col-span-3"
                            value={mediu}
                            disabled={true}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4 py-1">
                        <Label className="text-right">Nr telefon</Label>
                        <Input
                            className="col-span-3"
                            value={phone}
                            disabled={true}
                        />
                    </div>
                </div>
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button type="submit" onClick={handleRestituire}>
                        Restituie
                    </Button>
                </DialogClose>
            </DialogFooter>
        </>
    );
};

export default RestituieModal;
