'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup
} from '@/components/ui/select';
import { useEffect, useState } from 'react';
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const ImprumutaModalElev = ({
    nrMatricol,
    setNrMatricol,
    error,
    setError,
    nume,
    setNume,
    prenume,
    setPrenume,
    gender,
    setGender,
    year,
    setYear,
    group,
    setGroup,
    mediu,
    setMediu,
    phone,
    setPhone
}: any) => {
    useEffect(() => {
        if (nrMatricol === '') {
            setError(0);
        } else {
            fetchNrMatricol();
        }
    }, [nrMatricol]);

    const fetchNrMatricol = async () => {
        try {
            const response = await fetch(
                `${baseUrl}/borrows?person_id=${nrMatricol}`
            );
            if (response.ok) {
                const result = await response.json();
                console.log(result);

                setError(200);

                setNume(result.last_name);
                setPrenume(result.first_name);
                setGender(result.gender);
                setYear(result.year.toString());
                setGroup(result.group);
                setMediu(result.address);
                setPhone(result.phone_number);
            } else if (response.status === 401) {
                setError(401);

                setNume('');
                setPrenume('');
                setGender('');
                setYear('');
                setGroup('');
                setMediu('');
                setPhone('');
            } else {
                console.error(`Error: ${response.statusText}`);
            }
        } catch (err: any) {
            console.error('Fetching elev error:', err);
        }
    };

    return (
        <div>
            <h4 className="mb-6 text-xl font-semibold tracking-tight">
                Date despre{' '}
                <span className="underline underline-offset-4">elev</span>
            </h4>
            <div className="grid grid-cols-4 items-center gap-4 py-2">
                <Label className="text-right">Nr matricol{'\n'}</Label>
                <Input
                    value={nrMatricol}
                    className="col-span-3"
                    onChange={(e) => setNrMatricol(e.target.value)}
                />
            </div>
            <div className="grid grid-cols-4 items-center gap-4 pb-1">
                {error == 401 && (
                    <p className="text-xs col-start-2 col-span-3 text-red-600">
                        *Nu exista elevul
                    </p>
                )}
                {error == 200 && (
                    <p className="text-xs col-start-2 col-span-3 text-green-600">
                        Elevul este deja registrat
                    </p>
                )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4 py-1">
                <Label className="text-right">Nume</Label>
                <Input
                    className="col-span-3"
                    value={nume}
                    disabled={error === 200}
                    onChange={(e) => setNume(e.target.value)}
                />
            </div>
            <div className="grid grid-cols-4 items-center gap-4 py-1">
                <Label className="text-right">Prenume</Label>
                <Input
                    className="col-span-3"
                    value={prenume}
                    disabled={error === 200}
                    onChange={(e) => setPrenume(e.target.value)}
                />
            </div>
            <div className="grid grid-cols-4 items-center gap-4 py-1">
                <Label className="text-right">Gen</Label>
                <Select
                    value={gender}
                    onValueChange={setGender}
                    disabled={error === 200}
                >
                    <SelectTrigger className="col-span-3">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="male">Masculin</SelectItem>
                            <SelectItem value="female">Feminin</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid grid-cols-8 items-center gap-4 py-1">
                <Label className="text-right col-span-2">Clasa</Label>
                <Select
                    value={year}
                    onValueChange={setYear}
                    disabled={error === 200}
                >
                    <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="An" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {[
                                'P',
                                '1',
                                '2',
                                '3',
                                '4',
                                '5',
                                '6',
                                '7',
                                '8',
                                '9',
                                '10',
                                '11',
                                '12'
                            ].map((value) => (
                                <SelectItem key={value} value={value}>
                                    {value}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Select
                    value={group}
                    onValueChange={setGroup}
                    disabled={error === 200}
                >
                    <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Grupa" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {['A', 'B', 'C', 'D'].map((value) => (
                                <SelectItem key={value} value={value}>
                                    {value}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4 py-1">
                <Label className="text-right">Mediu</Label>
                <Select
                    value={mediu}
                    onValueChange={setMediu}
                    disabled={error === 200}
                >
                    <SelectTrigger className="col-span-3">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="urban">Urban</SelectItem>
                            <SelectItem value="rural">Rural</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4 py-1">
                <Label className="text-right">Nr telefon</Label>
                <Input
                    className="col-span-3"
                    value={phone}
                    disabled={error === 200}
                    onChange={(e) => setPhone(e.target.value)}
                />
            </div>
        </div>
    );
};

export default ImprumutaModalElev;
