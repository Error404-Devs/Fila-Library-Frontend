'use client';

import { Button } from '@/components/ui/button';
import { CircleMinus, CirclePlus } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import * as Slider from '@radix-ui/react-slider';
import { useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useSession } from 'next-auth/react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

interface InventarProps {
    bookId: string;
    bookName: string;
    available: number;
    setAvailable: any;
    total: number;
    setTotal: any;
}

const Inventar = ({
    bookId,
    bookName,
    available,
    setAvailable,
    total,
    setTotal
}: InventarProps) => {
    const [quantity, setQuantity] = useState([1]);
    const { toast } = useToast();
    const { data: session, status } = useSession();
    const [inputValue, setInputValue] = useState('');
    const [nrDeInventar, setNrDeInventar] = useState([]);
    const accessToken = session?.access_token;

    const handleRemoveInventory = async () => {
        const inventoryData = {
            book_id: bookId,
            quantity: -quantity[0],
            borrow_id: null
        };
        console.log(inventoryData);
        try {
            const response = await fetch(`${baseUrl}/inventory`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(inventoryData)
            });
            if (response.ok) {
                toast({
                    title: 'Inventarul a fost modificat cu succes!',
                    description: `Au fost scoase ${quantity} exemplare de: ${bookName}`
                });
                setAvailable(available - quantity[0]);
                setTotal(total - quantity[0]);
            } else {
                console.error(`Error: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error editing inventory:', error);
        }
    };

    const handleAddInventory = async () => {
        const inventoryData = {
            book_id: bookId,
            quantity: nrDeInventar.length,
            borrow_id: null,
            inventory_numbers: nrDeInventar
        };
        console.log(inventoryData);
        try {
            const response = await fetch(`${baseUrl}/inventory`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(inventoryData)
            });
            if (response.ok) {
                toast({
                    title: 'Inventarul a fost modificat cu succes!',
                    description: `Au fost adaugate ${quantity} exemplare de: ${bookName}`
                });
                setAvailable(available + quantity[0]);
                setTotal(total + quantity[0]);
            } else {
                console.error(`Error: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error editing inventory:', error);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleAddNrDeInventar();
        }
    };

    const handleAddNrDeInventar = () => {
        if (inputValue.trim() !== '') {
            setNrDeInventar([...nrDeInventar, inputValue.trim()]);
            setInputValue('');
        }
    };

    const handleRemovePill = (index) => {
        const newNrDeInventar = nrDeInventar.filter((_, i) => i !== index);
        setNrDeInventar(newNrDeInventar);
    };

    return (
        <div className="flex gap-1">
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button
                        variant="ghost"
                        className="h-5 w-5 p-0"
                        disabled={available == 0}
                    >
                        <CircleMinus className="h-5 w-5" />
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            {`Vreti sa scoateti din inventarul cartii: ${bookName}?`}
                        </AlertDialogTitle>
                        <AlertDialogDescription className="flex flex-col items-center">
                            <div className="flex flex-col items-center py-4">
                                <p className="pb-2">{`Vreti sa scoateti ${quantity} exemplare?`}</p>
                                <p className="pb-1">{`${available} exemplare disponibile => ${available - quantity[0]} exemplare disponibile`}</p>
                                <p className="pb-5">{`${total} exemplare total => ${total - quantity[0]} exemplare total`}</p>
                                <Slider.Root
                                    className="SliderRoot"
                                    defaultValue={[50]}
                                    orientation="vertical"
                                >
                                    <Slider.Track className="SliderTrack">
                                        <Slider.Range className="SliderRange" />
                                    </Slider.Track>
                                    <Slider.Thumb className="SliderThumb" />
                                </Slider.Root>
                            </div>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Anulare</AlertDialogCancel>
                        <AlertDialogAction onClick={handleRemoveInventory}>
                            Continuare
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            {available} / {total}
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="ghost" className="h-5 w-5 p-0">
                        <CirclePlus className="h-5 w-5" />
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            {`Vreti sa adaugati la inventarul cartii: ${bookName}?`}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            <div className="p-4">
                                <div className="flex flex-wrap mt-4">
                                    {nrDeInventar.map((pill, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center bg-secondary rounded-full px-4 py-2 m-1"
                                        >
                                            <span>{pill}</span>
                                            <button
                                                onClick={() =>
                                                    handleRemovePill(index)
                                                }
                                                className="ml-2 text-primary"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex items-center space-x-2 pt-5">
                                    <Input
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => {
                                            setInputValue(e.target.value);
                                        }}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Introduceti numarul de inventar"
                                        className="border rounded p-2 flex-grow"
                                    />
                                    <button
                                        onClick={handleAddNrDeInventar}
                                        className="bg-primary text-white p-2 rounded"
                                    >
                                        Adauga
                                    </button>
                                </div>
                            </div>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Anulare</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleAddInventory}
                            disabled={nrDeInventar.length == 0}
                        >
                            {nrDeInventar.length == 1
                                ? 'Adauga o carte'
                                : `Adauaga ${nrDeInventar.length} carti`}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default Inventar;
