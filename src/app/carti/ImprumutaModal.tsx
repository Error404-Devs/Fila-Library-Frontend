import {
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import ImprumutaModalElev from './ImprumutaElev';
import { useState } from 'react';
import ImprumutaCalendar from './ImprumutaCalendar';
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
                console.log('Borrow created successfully');
            } else {
                console.error(`Error: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error submitting borrow request:', error);
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
                />
            </div>
            <DialogFooter>
                <Button
                    type="submit"
                    disabled={!isFormValid()}
                    onClick={handleImprumuta}
                >
                    Imprumuta
                </Button>
            </DialogFooter>
        </DialogContent>
    );
};

export default ImprumutaModal;
