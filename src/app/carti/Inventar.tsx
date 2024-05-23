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

interface InventarProps {
    bookId: string;
    bookName: string;
    availableCopies: number;
    totalCopies: number;
}

const Inventar = ({
    bookId,
    bookName,
    availableCopies,
    totalCopies
}: InventarProps) => {
    const [quantity, setQuantity] = useState([1]);
    return (
        <div className="flex gap-1">
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button
                        variant="ghost"
                        className="h-5 w-5 p-0"
                        disabled={availableCopies == 0}
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
                            <p>{`${availableCopies} exemplare disponibile => ${availableCopies - 1} exemplare disponibile`}</p>
                            <p>{`${totalCopies} exemplare total => ${totalCopies - 1} exemplare total`}</p>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Anulare</AlertDialogCancel>
                        <AlertDialogAction>Continuare</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            {availableCopies} / {totalCopies}
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
                                <p className="pb-2">{`Vreau sa adaug ${quantity} exemplare`}</p>
                                <p className="pb-1">{`${availableCopies} exemplare disponibile => ${availableCopies + quantity[0]} exemplare disponibile`}</p>
                                <p className="pb-5">{`${totalCopies} exemplare total => ${totalCopies + quantity[0]} exemplare total`}</p>
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
                        <AlertDialogAction>Continuare</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default Inventar;
