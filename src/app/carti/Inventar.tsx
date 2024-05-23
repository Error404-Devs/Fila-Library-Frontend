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
                                <p>{`${availableCopies} exemplare disponibile => ${availableCopies + 1} exemplare disponibile`}</p>
                                <p>{`${totalCopies} exemplare total => ${totalCopies + 1} exemplare total`}</p>
                            </div>
                            <div>
                                <p>Vreau sa adaug mai multe exemplare: </p>
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
