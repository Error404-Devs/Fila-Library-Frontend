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
    available: number;
    setAvailable: any;
    borrowed: number;
    setBorrowed: any;
}

const ImprumutaModal = ({
    bookId,
    bookName,
    bookAuthor,
    bookCategory,
    available,
    setAvailable,
    borrowed,
    setBorrowed
}: ImprumutaModalProps) => {
    // states for the form
    const [dueDate, setDueDate] = useState<Date>();
    const [error, setError] = useState(0);
    const [nume, setNume] = useState('');
    const [prenume, setPrenume] = useState('');
    const [gender, setGender] = useState('');
    const [year, setYear] = useState('');
    const [group, setGroup] = useState('');
    const [mediu, setMediu] = useState('');
    const [phone, setPhone] = useState('');
    // the 3 states that determine which buttons to display
    const [changed, setChanged] = useState(false);
    const [selected, setSelected] = useState(false);
    const [editing, setEditing] = useState(false);
    const { toast } = useToast();

    const isFormValid = () => {
        return (
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
                setAvailable(available - 1);
                setBorrowed(borrowed + 1);
            } else {
                console.error(`Error: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error submitting borrow request:', error);
        }
    };

    const handleAdd = async () => {
        if (!isElevValid()) {
            return;
        }
        const elevData = {
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
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(elevData)
            });
            if (response.ok) {
                setChanged(false);
                toast({
                    title: 'Elevul a fost adaugat cu succes!',
                    description: `${nume} ${prenume} a fost adaugat`
                });
            } else {
                console.error(`Error: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error adding student:', error);
        }
    };

    const handleEdit = () => {
        setEditing(true);
    };

    const handleSave = () => {
        setEditing(false);
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
                    selected={selected}
                    setSelected={setSelected}
                    editing={editing}
                    setEditing={setEditing}
                />
            </div>
            <DialogFooter>
                {selected && editing && (
                    <Button
                        className="mr-[9rem]"
                        onClick={handleSave}
                        disabled={!isElevValid()}
                    >
                        Salveaza Elev
                    </Button>
                )}
                {selected && !editing && (
                    <Button
                        className="mr-[9rem]"
                        onClick={handleEdit}
                        disabled={!isElevValid()}
                    >
                        Edita Elev
                    </Button>
                )}
                {changed && (
                    <Button
                        className="mr-[9rem]"
                        onClick={handleAdd}
                        disabled={!isElevValid()}
                    >
                        Adauga Elev
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
