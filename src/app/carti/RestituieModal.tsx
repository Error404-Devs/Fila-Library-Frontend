'use client';

import {
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogClose
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Calendar as CalendarIcon } from 'lucide-react';

interface RestituieModalProps {
    bookId: string;
    bookName: string;
    bookAuthor: string;
    bookCategory: string;
}
const RestituieModal = ({
    bookId,
    bookName,
    bookAuthor,
    bookCategory
}: RestituieModalProps) => {
    return (
        <DialogContent className="max-w-[90vh]">
            <DialogHeader>
                <DialogTitle>Restituie Cartea: {bookName}</DialogTitle>
                <DialogDescription>
                    Completetati datele elevelui care Restituie cartea
                </DialogDescription>
            </DialogHeader>
            <div className="flex gap-4 py-4">
                <div>
                    <h4 className="mb-6 text-xl font-semibold tracking-tight">
                        Date despre{' '}
                        <span className="underline underline-offset-4">
                            carte
                        </span>
                    </h4>
                    <div className="grid grid-cols-4 items-center gap-4 py-2">
                        <Label className="text-right">Titlu</Label>
                        <Input
                            defaultValue={bookName}
                            className="col-span-3"
                            disabled
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4 py-2">
                        <Label className="text-right">Autor</Label>
                        <Input
                            defaultValue={bookAuthor}
                            className="col-span-3"
                            disabled
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4 py-2">
                        <Label className="text-right">Cota</Label>
                        <Input
                            defaultValue={bookCategory}
                            className="col-span-3"
                            disabled
                        />
                    </div>
                    <h4 className="my-8 text-xl font-semibold tracking-tight">
                        Date despre{' '}
                        <span className="underline underline-offset-4">
                            imprumut
                        </span>
                    </h4>
                    <Button
                        variant={'outline'}
                        className="w-[280px] justify-start text-left font-normal"
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        12/34/56789
                    </Button>
                </div>
                <Separator orientation="vertical" />
                <div>
                    <h4 className="mb-6 text-xl font-semibold tracking-tight">
                        Date despre{' '}
                        <span className="underline underline-offset-4">
                            elev
                        </span>
                    </h4>
                    <div className="grid grid-cols-4 items-center gap-4 py-2">
                        <Label className="text-right">Nr matricol{'\n'}</Label>
                        <Input
                            // value={nrMatricol}
                            className="col-span-3"
                            // onChange={(e) => setNrMatricol(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4 py-1">
                        <Label className="text-right">Nume</Label>
                        <Input
                            className="col-span-3"
                            // value={nume}
                            disabled={true}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4 py-1">
                        <Label className="text-right">Prenume</Label>
                        <Input
                            className="col-span-3"
                            // value={nume}
                            disabled={true}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4 py-1">
                        <Label className="text-right">Gen</Label>
                        <Input
                            className="col-span-3"
                            // value={nume}
                            disabled={true}
                        />
                    </div>
                    <div className="grid grid-cols-8 items-center gap-4 py-1">
                        <Label className="text-right col-span-2">Clasa</Label>
                        <Input
                            className="col-span-3"
                            // value={nume}
                            disabled={true}
                        />
                        <Input
                            className="col-span-3"
                            // value={nume}
                            disabled={true}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4 py-1">
                        <Label className="text-right">Mediu</Label>
                        <Input
                            className="col-span-3"
                            // value={nume}
                            disabled={true}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4 py-1">
                        <Label className="text-right">Nr telefon</Label>
                        <Input
                            className="col-span-3"
                            // value={nume}
                            disabled={true}
                        />
                    </div>
                </div>
            </div>
            <DialogFooter>
                <Button type="submit">Restituie</Button>
            </DialogFooter>
        </DialogContent>
    );
};

export default RestituieModal;
