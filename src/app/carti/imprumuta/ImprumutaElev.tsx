/* eslint-disable react-hooks/exhaustive-deps */
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
import { Command, CommandItem, CommandList } from '@/components/ui/command';
import { useEffect, useState } from 'react';
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const ImprumutaModalElev = ({
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
    setPhone,
    changed,
    setChanged,
    selected,
    setSelected,
    editing,
    setEditing
}: any) => {
    const [elevi, setElevi] = useState([]);

    const [fetchedNume, setFetchedNume] = useState('');
    const [fetchedPrenume, setFetchedPrenume] = useState('');
    const [fetchedGender, setFetchedGender] = useState('');
    const [fetchedYear, setFetchedYear] = useState('');
    const [fetchedGroup, setFetchedGroup] = useState('');
    const [fetchedMediu, setFetchedMediu] = useState('');
    const [fetchedPhone, setFetchedPhone] = useState('');

    useEffect(() => {
        // the updates that happen when we search for a name
        if (nume || prenume) {
            fetchElevi();
        } else {
            setElevi([]);
        }

        if (fetchedNume != nume || fetchedPrenume != prenume) {
            setError(401);
            setSelected(false);
            setChanged(true);

            setFetchedGender('');
            setFetchedYear('');
            setFetchedGroup('');
            setFetchedMediu('');
            setFetchedPhone('');

            setGender('');
            setYear('');
            setGroup('');
            setMediu('');
            setPhone('');
        }
    }, [nume, prenume]);

    const fetchElevi = async () => {
        try {
            const response = await fetch(
                `${baseUrl}/persons?first_name=${prenume}&last_name=${nume}`
            );
            if (response.ok) {
                const result = await response.json();
                console.log(
                    `${baseUrl}/persons?first_name=${prenume}&last_name=${nume}`
                );
                console.log(result);

                const formattedElevi = Object.keys(result).map((id) => {
                    const student = result[id];
                    return {
                        label: `${student.last_name} ${student.first_name}`,
                        value: id,
                        first_name: student.first_name,
                        last_name: student.last_name,
                        location: student.location,
                        phone_number: student.phone_number,
                        address: student.address,
                        gender: student.gender,
                        group: student.group,
                        year: student.year
                    };
                });

                if (response) {
                    setElevi(formattedElevi);
                } else {
                    setElevi([]);
                }
            }
        } catch (err: any) {
            console.error('Fetching elevi error:', err);
        }
    };

    const handleSelect = (elev: any) => {
        setError(200);
        setSelected(true);
        setChanged(false);

        setFetchedNume(elev.last_name);
        setFetchedPrenume(elev.first_name);
        setFetchedGender(elev.gender);
        setFetchedYear(elev.year.toString());
        setFetchedGroup(elev.group);
        setFetchedMediu(elev.address);
        setFetchedPhone(elev.phone_number);

        setNume(elev.last_name);
        setPrenume(elev.first_name);
        setGender(elev.gender);
        setYear(elev.year.toString());
        setGroup(elev.group);
        setMediu(elev.address);
        setPhone(elev.phone_number);
    };

    return (
        <div className="w-full">
            <h4 className="mb-6 text-xl font-semibold tracking-tight">
                Date despre{' '}
                <span className="underline underline-offset-4">elev</span>
            </h4>
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
                    type="email"
                    value={nume}
                    onChange={(e) => setNume(e.target.value)}
                    className="col-span-3 w-full mb-2"
                    disabled={selected && editing}
                />
            </div>
            <div className="grid grid-cols-4 items-center gap-4 py-1">
                <Label className="text-right">Prenume</Label>
                <Input
                    className="col-span-3  w-full mb-2"
                    value={prenume}
                    onChange={(e) => setPrenume(e.target.value)}
                    disabled={selected && editing}
                />
            </div>
            <div className="grid grid-cols-4 items-center gap-4 py-1">
                {!selected && (
                    <Command className="col-start-2 col-span-3">
                        <CommandList>
                            {elevi.map((elev) => (
                                <CommandItem
                                    key={elev.value}
                                    onSelect={() => handleSelect(elev)}
                                >
                                    {elev.label}
                                </CommandItem>
                            ))}
                        </CommandList>
                    </Command>
                )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4 py-1">
                <Label className="text-right">Gen</Label>
                <Select
                    value={gender}
                    onValueChange={setGender}
                    disabled={selected && !editing}
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
                    disabled={selected && !editing}
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
                    disabled={selected && !editing}
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
                    disabled={selected && !editing}
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
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={selected && !editing}
                />
            </div>
        </div>
    );
};

export default ImprumutaModalElev;
