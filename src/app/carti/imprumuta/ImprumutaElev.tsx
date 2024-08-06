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
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut
} from '@/components/ui/command';
import { cn } from '@/lib/utils';
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/ui/popover';

import { useEffect, useRef, useState } from 'react';
import {
    Calculator,
    Calendar,
    Check,
    CreditCard,
    Settings,
    Smile,
    User
} from 'lucide-react';
import { CommandInput } from 'cmdk';
import { Button } from '@/components/ui/button';
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
    setChanged
}: any) => {
    // useEffect(() => {
    //     if (nume === '' && prenume === '') {
    //         setError(0);
    //     } else if (!changed) {
    //         fetchElev();
    //     }
    // }, [nume, prenume, changed]);

    const [elevi, setElevi] = useState([]);

    const [fetchedNume, setFetchedNume] = useState('');
    const [fetchedPrenume, setFetchedPrenume] = useState('');
    const [fetchedGender, setFetchedGender] = useState('');
    const [fetchedYear, setFetchedYear] = useState('');
    const [fetchedGroup, setFetchedGroup] = useState('');
    const [fetchedMediu, setFetchedMediu] = useState('');
    const [fetchedPhone, setFetchedPhone] = useState('');

    setChanged(false);
    if (fetchedNume != nume) setChanged(true);
    if (fetchedPrenume != prenume) setChanged(true);
    if (fetchedGender != gender) setChanged(true);
    if (fetchedYear != year) setChanged(true);
    if (fetchedGroup != group) setChanged(true);
    if (fetchedMediu != mediu) setChanged(true);
    if (fetchedPhone != phone) setChanged(true);

    const fetchElev = async () => {
        try {
            const response = await fetch(
                `${baseUrl}/persons?first_name=${prenume}&last_name=${nume}`
            );
            if (response.ok) {
                const result = await response.json();
                console.log(result);

                setError(200);

                setFetchedNume(result.last_name);
                setFetchedPrenume(result.first_name);
                setFetchedGender(result.gender);
                setFetchedYear(result.year.toString());
                setFetchedGroup(result.group);
                setFetchedMediu(result.address);
                setFetchedPhone(result.phone_number);

                setNume(result.last_name);
                setPrenume(result.first_name);
                setGender(result.gender);
                setYear(result.year.toString());
                setGroup(result.group);
                setMediu(result.address);
                setPhone(result.phone_number);
            } else if (response.status === 401) {
                setError(401);

                setFetchedNume('');
                setFetchedPrenume('');
                setFetchedGender('');
                setFetchedYear('');
                setFetchedGroup('');
                setFetchedMediu('');
                setFetchedPhone('');

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
                        last_name: student.last_name
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

    useEffect(() => {
        if (nume || prenume) fetchElevi();
        else setElevi([]);
    }, [nume, prenume]);

    const handleNumeChange = (e: any) => {
        setNume(e.target.value);
    };

    const handleSelect = (elev: any) => {
        console.log('ello');
        setNume(elev.last_name);
        setPrenume(elev.first_name);
        setFound(true);
    };

    const [found, setFound] = useState(false);

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
                <Command className=" col-span-3">
                    <Input
                        type="email"
                        value={nume}
                        onChange={handleNumeChange}
                        className="w-full mb-2"
                    />
                    {!found && (
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
                    )}
                </Command>
            </div>
            <div className="grid grid-cols-4 items-center gap-4 py-1">
                <Label className="text-right">Prenume</Label>
                <Input
                    className="col-span-3"
                    value={prenume}
                    onChange={(e) => setPrenume(e.target.value)}
                />
            </div>
            <div className="grid grid-cols-4 items-center gap-4 py-1">
                <Label className="text-right">Gen</Label>
                <Select value={gender} onValueChange={setGender}>
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
                <Select value={year} onValueChange={setYear}>
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
                <Select value={group} onValueChange={setGroup}>
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
                <Select value={mediu} onValueChange={setMediu}>
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
                />
            </div>
        </div>
    );
};

export default ImprumutaModalElev;
