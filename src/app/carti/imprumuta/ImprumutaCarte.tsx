import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ImprumutaCarteProps {
    bookName: string;
    bookAuthor: string;
    bookCategory: string;
}

const ImprumutaCarte = ({
    bookName,
    bookAuthor,
    bookCategory
}: ImprumutaCarteProps) => {
    return (
        <>
            <h4 className="mb-6 text-xl font-semibold tracking-tight">
                Date despre{' '}
                <span className="underline underline-offset-4">carte</span>
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
                <span className="underline underline-offset-4">imprumut</span>
            </h4>
        </>
    );
};

export default ImprumutaCarte;
