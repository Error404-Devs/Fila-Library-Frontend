import {
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface ImprumutaModalProps {
    bookName: string;
}

const ImprumutaModal = ({ bookName }: ImprumutaModalProps) => {
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
                    <h4 className="mb-6 text-xl font-semibold tracking-tight">
                        Date despre{' '}
                        <span className="underline underline-offset-4">
                            carte
                        </span>
                    </h4>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Titlu
                        </Label>
                        <Input
                            id="username"
                            defaultValue={bookName}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Autor
                        </Label>
                        <Input
                            id="name"
                            defaultValue="David"
                            className="col-span-3"
                        />
                    </div>
                </div>
                <Separator orientation="vertical" />
                <div>
                    <h4 className="mb-6 text-xl font-semibold tracking-tight">
                        Date despre{' '}
                        <span className="underline underline-offset-4">
                            elev
                        </span>
                    </h4>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Nr Matricol
                        </Label>
                        <Input
                            id="username"
                            defaultValue="Rotariu"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Nume
                        </Label>
                        <Input
                            id="username"
                            defaultValue="Rotariu"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Prenume
                        </Label>
                        <Input
                            id="name"
                            defaultValue="David"
                            className="col-span-3"
                        />
                    </div>
                </div>
            </div>
            <DialogFooter>
                <Button type="submit">Save changes</Button>
            </DialogFooter>
        </DialogContent>
    );
};

export default ImprumutaModal;
