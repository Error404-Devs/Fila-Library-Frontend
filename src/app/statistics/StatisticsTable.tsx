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
    statistics: any;
}

const StatisticsTable = ({
    selectedMonth,
    selectedYear,
    statistics
}: StatisticsTableProps) => {
    const { state } = useStatisticsColumnContext();

    const getDailyData = (day: string, key: string) => {
        const allDailyData = statistics.daily;
        if (!allDailyData) return;
        const dailyData = allDailyData[day];

        switch (key) {
            case 'totalReaders':
                return dailyData?.total_readers;
            case 'under14':
                return dailyData?.under_14;
            case 'over14':
                return dailyData?.over_14;
            case 'men':
                return dailyData?.male_readers;
            case 'women':
                return dailyData?.female_readers;
            case 'dailyFrequency':
                return dailyData?.frequency;
            default:
                return;
        }
    };

    const getMonthlyData = (key: string) => {
        const monthlyData = statistics.monthly;
        if (!monthlyData) return;
        switch (key) {
            case 'totalReaders':
                return monthlyData?.total_readers;
            case 'under14':
                return monthlyData?.under_14;
            case 'over14':
                return monthlyData?.over_14;
            case 'men':
                return monthlyData?.male_readers;
            case 'women':
                return monthlyData?.female_readers;
            case 'dailyFrequency':
                return monthlyData?.frequency;
            default:
                return;
        }
    };

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
                                colIndex !== 0 &&
                                state[columnKey] && (
                                    <TableCell
                                        key={colIndex}
                                        className="border border-gray-300 p-2 text-center"
                                    >
                                        {row === 'R'
                                            ? 'X'
                                            : row === 'T.'
                                              ? getMonthlyData(columnKey)
                                              : getDailyData(row, columnKey)}
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
