import { Checkbox } from '@/components/ui/checkbox';

const columns = [
    'Totalul',
    'Elevi',
    'Pana la 14 ani',
    'Peste 14 ani',
    'Barbati',
    'Femei',
    'Frecventa zilnica',
    'Total documente',
    'Filozofie',
    'Stiinte sociala',
    'Stiinte pure',
    'Tehnica',
    'Medicina',
    'Agrotehnica',
    'Literatura',
    'Literatura pentru copii',
    'Alte materii',
    'Limba romana',
    'Alte limbi',
    'Carti consultate',
    'Carti intrate',
    'Valoarea carti intrate',
    'Donatii U.B.',
    'Valoare'
];

const Checkboxes = () => {
    return (
        <>
            {columns.map((column, index) => (
                <div key={index} className="items-top flex space-x-2 py-1">
                    <Checkbox checked={true} />
                    <div className="grid gap-1.5 leading-none">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            {column}
                        </label>
                    </div>
                </div>
            ))}
        </>
    );
};

export default Checkboxes;
