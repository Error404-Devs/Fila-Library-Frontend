import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';

const columns = [
    'Zilele lunii',
    'Totalul cititorilor inscrisi',
    'Dintre acestia elevi',
    'Pana la 14 ani',
    'Peste 14 ani',
    'Barbati',
    'Femei',
    'Frecventa zilnica',
    'Total documente difuzate',
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
    'Carti consultate in biblioteca',
    'Carti intrate in cursul anului',
    'Valoarea carti intrate',
    'Donatii U.B.',
    'Valoare'
];

const rows = [
    'Raport',
    ...Array.from({ length: 31 }, (_, i) => (i + 1).toString()),
    'Total'
];

interface StatisticsTableProps {
    selectedMonth: string;
    selectedYear: string;
}

const StatisticsTable = ({
    selectedMonth,
    selectedYear
}: StatisticsTableProps) => {
    return (
        <Table>
            <TableCaption>
                Statisticile pentru
                <span className="font-semibold">
                    {` ${selectedMonth.toLowerCase()} ${selectedYear}`}
                </span>
            </TableCaption>
            <TableHeader>
                <TableRow>
                    {columns.map((column, index) => (
                        <th
                            key={index}
                            className="w-1/24 border border-gray-300 p-2 text-center bg-gray-100 font-bold vertical-text"
                        >
                            {column}
                        </th>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {rows.map((row, rowIndex) => (
                    <TableRow key={rowIndex} className="even:bg-gray-50">
                        <TableCell className="border border-gray-300 p-2 text-center font-bold">
                            {row}
                        </TableCell>
                        {columns.slice(1).map((_, colIndex) => (
                            <TableCell
                                key={colIndex}
                                className="border border-gray-300 p-2 text-center"
                            >
                                {/* to be populated */}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default StatisticsTable;
