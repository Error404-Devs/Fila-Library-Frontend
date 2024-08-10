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
import { Slider } from '@/components/ui/slider';
import { useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useSession } from 'next-auth/react';
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
            quantity: quantity[0],
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
                                <Slider
                                    className=" max-w-[30vh]"
                                    min={1}
                                    max={available}
                                    step={1}
                                    value={quantity}
                                    onValueChange={setQuantity}
                                />
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
                            <div className="flex flex-col items-center py-4">
                                <p className="pb-2">{`Vreti sa adaugati ${quantity} exemplare?`}</p>
                                <p className="pb-1">{`${available} exemplare disponibile => ${available + quantity[0]} exemplare disponibile`}</p>
                                <p className="pb-5">{`${total} exemplare total => ${total + quantity[0]} exemplare total`}</p>
                                <Slider
                                    className=" max-w-[30vh]"
                                    min={1}
                                    max={30}
                                    step={1}
                                    value={quantity}
                                    onValueChange={setQuantity}
                                />
                            </div>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Anulare</AlertDialogCancel>
                        <AlertDialogAction onClick={handleAddInventory}>
                            Continuare
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default Inventar;
