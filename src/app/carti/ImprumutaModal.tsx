'use client';

import { useState } from 'react';
import {
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogClose
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import ImprumutaCalendar from './ImprumutaCalendar';
import { useToast } from '@/components/ui/use-toast';
import ImprumutaModalElev from './ImprumutaElev';
import ImprumutaCarte from './ImprumutaCarte';
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

interface ImprumutaModalProps {
    bookId: string;
    bookName: string;
    bookAuthor: string;
    bookCategory: string;
}

const ImprumutaModal = ({
    bookId,
    bookName,
    bookAuthor,
    bookCategory
}: ImprumutaModalProps) => {
    const [dueDate, setDueDate] = useState<Date>();
    const [nrMatricol, setNrMatricol] = useState('');
    const [error, setError] = useState(0);
    const [nume, setNume] = useState('');
    const [prenume, setPrenume] = useState('');
    const [gender, setGender] = useState('');
    const [year, setYear] = useState('');
    const [group, setGroup] = useState('');
    const [mediu, setMediu] = useState('');
    const [phone, setPhone] = useState('');
    const [changed, setChanged] = useState(false);
    const { toast } = useToast();

    const isFormValid = () => {
        return (
            nrMatricol.trim() !== '' &&
            nume.trim() !== '' &&
            prenume.trim() !== '' &&
            gender.trim() !== '' &&
            year.trim() !== '' &&
            group.trim() !== '' &&
            mediu.trim() !== '' &&
            phone.trim() !== '' &&
            dueDate !== undefined
        );
    };

    const isElevValid = () => {
        return (
            nrMatricol.trim() !== '' &&
            nume.trim() !== '' &&
            prenume.trim() !== '' &&
            gender.trim() !== '' &&
            year.trim() !== '' &&
            group.trim() !== '' &&
            mediu.trim() !== '' &&
            phone.trim() !== ''
        );
    };

    const handleImprumuta = async () => {
        if (!isFormValid()) {
            return;
        }
        const borrowData = {
            person_id: nrMatricol,
            first_name: prenume,
            last_name: nume,
            gender: gender,
            year: year,
            group: group,
            address: mediu,
            phone_number: phone,
            book_id: bookId,
            due_date: dueDate?.toISOString()
        };
        try {
            const response = await fetch(`${baseUrl}/borrows`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(borrowData)
            });
            if (response.ok) {
                toast({
                    title: 'Cartea a fost imprumutata cu succes!',
                    description: `${nume} ${prenume} a imprumutat cartea ${bookName}`
                });
            } else {
                console.error(`Error: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error submitting borrow request:', error);
        }
    };

    const handleSave = async () => {
        if (!isElevValid()) {
            return;
        }
        const elevData = {
            id: nrMatricol,
            first_name: prenume,
            last_name: nume,
            gender: gender,
            year: year,
            group: group,
            address: mediu,
            phone_number: phone
        };
        try {
            const response = await fetch(`${baseUrl}/persons`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(elevData)
            });
            if (response.ok) {
                setChanged(false);
                toast({
                    title: 'Elevul a fost salvat cu succes!',
                    description: `${nume} ${prenume} a fost actualizat`
                });
            } else {
                console.error(`Error: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error updating student:', error);
        }
    };

    return (
        <DialogContent className="max-w-[90vh]">
            <DialogHeader>
                <DialogTitle>Imprumuta Cartea: {bookName}</DialogTitle>
                <DialogDescription>
                    Completetati datele elevelui care imprumuta cartea
                </DialogDescription>
            </DialogHeader>
            <div className="flex gap-4 py-4">
                <div>
                    <ImprumutaCarte
                        bookName={bookName}
                        bookAuthor={bookAuthor}
                        bookCategory={bookCategory}
                    />
                    <ImprumutaCalendar date={dueDate} setDate={setDueDate} />
                </div>
                <Separator orientation="vertical" />
                <ImprumutaModalElev
                    nrMatricol={nrMatricol}
                    setNrMatricol={setNrMatricol}
                    error={error}
                    setError={setError}
                    nume={nume}
                    setNume={setNume}
                    prenume={prenume}
                    setPrenume={setPrenume}
                    gender={gender}
                    setGender={setGender}
                    year={year}
                    setYear={setYear}
                    group={group}
                    setGroup={setGroup}
                    mediu={mediu}
                    setMediu={setMediu}
                    phone={phone}
                    setPhone={setPhone}
                    changed={changed}
                    setChanged={setChanged}
                />
            </div>
            <DialogFooter>
                {changed && (
                    <Button className="mr-[9rem]" onClick={handleSave}>
                        Salveaza
                    </Button>
                )}
                <DialogClose asChild>
                    <Button
                        type="submit"
                        disabled={!isFormValid()}
                        onClick={handleImprumuta}
                    >
                        Imprumuta
                    </Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    );
};

export default ImprumutaModal;
