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
import { useSession } from 'next-auth/react';

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
    const [id, setId] = useState('');
    const [personId, setPersonId] = useState('')
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
    const { data: session, status } = useSession();
    const accessToken = session?.access_token;

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
            id: id,
            book_id: bookId,
            due_date: dueDate?.toISOString()
        };
        try {
            const response = await fetch(`${baseUrl}/borrows`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
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
            phone_number: phone,
            personId:personId
        };
        try {
            const response = await fetch(`${baseUrl}/persons`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(elevData)
            });
            if (response.ok) {
                setChanged(false);
                setSelected(true);
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

    const handleSave = async () => {
        if (!isElevValid()) {
            return;
        }
        setEditing(false);
        const elevData = {
            id: id,
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
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(elevData)
            });
            if (response.ok) {
                setChanged(false);
                setSelected(true);
                toast({
                    title: 'Elevul a fost actualizat cu succes!',
                    description: `${nume} ${prenume} a fost actualizat/a`
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
                    error={error}
                    setError={setError}
                    id={id}
                    setId={setId}
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
                        Actualizeaza Elev
                    </Button>
                )}
                {selected && !editing && (
                    <Button
                        className="mr-[9rem]"
                        onClick={handleEdit}
                        disabled={!isElevValid()}
                    >
                        Editeaza Elev
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
                        disabled={!isFormValid() || !selected || editing}
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
