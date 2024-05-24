import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { useStatisticsColumnContext } from '../context/StatisticsProvider';
import { columnKeys, columnNames, StatisticsColumnKeys } from '../interfaces';
const rows = [
    'R',
    ...Array.from({ length: 31 }, (_, i) => (i + 1).toString()),
    'T.'
];

interface StatisticsTableProps {
    selectedMonth: string;
    selectedYear: string;
}

const StatisticsTable = ({
    selectedMonth,
    selectedYear
}: StatisticsTableProps) => {
    const { state } = useStatisticsColumnContext();
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
                    {columnNames.map((column, index) => {
                        const columnKey = columnKeys[
                            column as keyof typeof columnKeys
                        ] as StatisticsColumnKeys;
                        return (
                            state[columnKey] && (
                                <TableHead
                                    key={index}
                                    className="w-1/24 border border-gray-300 p-2 text-center bg-gray-100 font-bold vertical-text h-[11rem]"
                                >
                                    {column}
                                </TableHead>
                            )
                        );
                    })}
                </TableRow>
            </TableHeader>
            <TableBody>
                {rows.map((row, rowIndex) => (
                    <TableRow key={rowIndex} className="even:bg-gray-50">
                        <TableCell className="border border-gray-300 p-2 text-center font-bold">
                            {row}
                        </TableCell>
                        {columnNames.map((column, colIndex) => {
                            const columnKey = columnKeys[
                                column as keyof typeof columnKeys
                            ] as StatisticsColumnKeys;
                            return (
                                colIndex != 0 &&
                                state[columnKey] && (
                                    <TableCell
                                        key={colIndex}
                                        className="border border-gray-300 p-2 text-center"
                                    >
                                        {/* to be populated */}
                                    </TableCell>
                                )
                            );
                        })}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default StatisticsTable;
