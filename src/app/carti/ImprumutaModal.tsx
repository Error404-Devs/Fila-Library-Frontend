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
import ImprumutaModalElev from './ImprumutaModalElev';

interface ImprumutaModalProps {
    bookName: string;
    bookAuthor: string;
    bookCategory: string;
}

const ImprumutaModal = ({
    bookName,
    bookAuthor,
    bookCategory
}: ImprumutaModalProps) => {
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
                    
                    <h4 className="my-6 text-xl font-semibold tracking-tight">
                        Date despre{' '}
                        <span className="underline underline-offset-4">
                            imprumut
                        </span>
                    </h4>
                </div>
                <Separator orientation="vertical" />
                <ImprumutaModalElev />
            </div>
            <DialogFooter>
                <Button type="submit">Save changes</Button>
            </DialogFooter>
        </DialogContent>
    );
};

export default ImprumutaModal;
