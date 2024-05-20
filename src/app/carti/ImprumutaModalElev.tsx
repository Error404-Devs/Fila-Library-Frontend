'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const ImprumutaModalElev = () => {
    const [nrMatricol, setNrMatricol] = useState('');
    const [error, setError] = useState(0);

    const fetchNrMatricol = async (input: string) => {
        try {
            const response = await fetch(
                `${baseUrl}/borrows?person_id=${input}`
            );
            if (response.ok) {
                const result = await response.json();
                console.log(result);
                setError(200);
            } else if (response.status === 401) {
                setError(401);
            } else {
                console.error(`Error: ${response.statusText}`);
            }
        } catch (err: any) {
            console.error('Fetching elev error:', err);
        }
    };

    function handleUpdateMatricol(input: string) {
        if (input == '') {
            setError(0);
        } else {
            setNrMatricol(input);
            fetchNrMatricol(input);
        }
    }

    return (
        <div>
            <h4 className="mb-6 text-xl font-semibold tracking-tight">
                Date despre{' '}
                <span className="underline underline-offset-4">elev</span>
            </h4>
            <div className="grid grid-cols-4 items-center gap-4 py-2">
                <Label htmlFor="nr_matricol" className="text-right">
                    Nr Matricol{'\n'}
                </Label>
                <Input
                    id="nr_matricol"
                    defaultValue={nrMatricol}
                    className="col-span-3"
                    onChange={(e) => {
                        handleUpdateMatricol(e.target.value);
                    }}
                />
            </div>
            <div className="grid grid-cols-4 items-center gap-4 pb-2">
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
            <div className="grid grid-cols-4 items-center gap-4 py-2">
                <Label htmlFor="nume" className="text-right">
                    Nume
                </Label>
                <Input id="nume" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4 py-2">
                <Label htmlFor="prenume" className="text-right">
                    Prenume
                </Label>
                <Input id="prenume" className="col-span-3" />
            </div>
        </div>
    );
};

export default ImprumutaModalElev;
