'use client';

import Sidebar from './Sidebar';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup
} from '@/components/ui/select';
import { CalendarDays, CalendarFold } from 'lucide-react';
import { useEffect, useState } from 'react';
import Number from './Number';
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const months = [
    { value: '1', label: 'Ianuarie' },
    { value: '2', label: 'Februarie' },
    { value: '3', label: 'Martie' },
    { value: '4', label: 'Aprilie' },
    { value: '5', label: 'Mai' },
    { value: '6', label: 'Iunie' },
    { value: '7', label: 'Iulie' },
    { value: '8', label: 'August' },
    { value: '9', label: 'Septembrie' },
    { value: '10', label: 'Octombrie' },
    { value: '11', label: 'Noiembrie' },
    { value: '12', label: 'Decembrie' }
];

const years = [
    { value: '2024', label: '2024' },
    { value: '2025', label: '2025' },
    { value: '2026', label: '2026' },
    { value: '2027', label: '2027' },
    { value: '2028', label: '2028' },
    { value: '2029', label: '2029' },
    { value: '2030', label: '2030' }
];

interface StatisticsType {
    female_readers?: number;
    frequency?: number;
    male_readers?: number;
    over_14?: number;
    total_readers?: number;
    under_14?: number;
}

const Statistics = () => {
    const currentDate = new Date();
    const currentMonth = (currentDate.getMonth() + 1).toString(); // getMonth() returns 0-11
    const currentYear = currentDate.getFullYear().toString();
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [statistics, setStatistics] = useState<StatisticsType>({});

    useEffect(() => {
        // if (selectedMonth && selectedYear) {
        fetchStatistics(selectedMonth, selectedYear);
        // }
    }, [selectedMonth, selectedYear]);

    const fetchStatistics = async (month: string, year: string) => {
        try {
            const response = await fetch(
                `${baseUrl}/statistics?month=${month}`
            );
            const data = await response.json();
            setStatistics(data);
        } catch (error) {
            console.error('Error fetching statistics:', error);
        }
    };

    const getMonthLabel = (value: string) => {
        const month = months.find((m) => m.value === value);
        return month ? month.label : '';
    };

    return (
        <div className="grid min-h-screen w-full">
            <Sidebar />
            <div className="ml-60 flex-1">
                <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 md:h-[140px] lg:h-[80px] lg:px-6">
                    <div className="flex justify-around w-full">
                        <Select
                            value={selectedMonth}
                            onValueChange={setSelectedMonth}
                        >
                            <SelectTrigger className="w-1/3">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {months.map((month) => (
                                        <SelectItem
                                            key={month.value}
                                            value={month.value}
                                        >
                                            {month.label}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Select
                            value={selectedYear}
                            onValueChange={setSelectedYear}
                        >
                            <SelectTrigger className="w-1/3">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {years.map((year) => (
                                        <SelectItem
                                            key={year.value}
                                            value={year.value}
                                        >
                                            {year.label}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </header>
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-lg font-semibold md:text-2xl">
                            {Object.keys(statistics).length === 0
                                ? 'Statistice'
                                : `Statistice: ${getMonthLabel(selectedMonth)} ${selectedYear}`}
                        </h1>
                    </div>
                    {Object.keys(statistics).length !== 0 && (
                        <div className="grid grid-rows-3 h-full">
                            {/* <h4 className="text-md ">
                                {`Numarul total de cititori in aceasta luna: `}
                                <span className="font-semibold">{`${statistics.total_readers}`}</span>
                            </h4>
                            <h4 className="text-md ">
                                {`Numarul total de cititori baieti în aceasta luna: `}
                                <span className="font-semibold">{`${statistics.male_readers}`}</span>
                            </h4>
                            <h4 className="text-md ">
                                {`Numarul total de cititori fete în aceasta luna: `}
                                <span className="font-semibold">{`${statistics.female_readers}`}</span>
                            </h4>

                            <h4 className="text-md ">
                                {`Numarul total de cititori sub 14 ani în aceasta luna: `}
                                <span className="font-semibold">{`${statistics.under_14}`}</span>
                            </h4>
                            <h4 className="text-md ">
                                {`Numarul total de cititori peste 14 ani în aceasta luna: `}
                                <span className="font-semibold">{`${statistics.over_14}`}</span>
                            </h4> */}
                            <div className="flex justify-center items-center w-full py-5">
                                <h1 className="text-4xl font-extrabold w-full text-right">
                                    Cititori
                                </h1>
                                <Number value={statistics.total_readers} />
                                <h1 className="text-4xl font-extrabold w-full">
                                    Total
                                </h1>
                            </div>
                            <div className="flex justify-center items-center w-full py-5">
                                <h1 className="text-4xl font-extrabold w-full text-right">
                                    Fete
                                </h1>
                                <Number value={statistics.female_readers} />
                                <Number value={statistics.male_readers} />
                                <h1 className="text-4xl font-extrabold w-full">
                                    Baieti
                                </h1>
                            </div>
                            <div className="flex justify-center items-center w-full py-5">
                                <h1 className="text-4xl font-extrabold w-full text-right">
                                    Sub 14 ani
                                </h1>
                                <Number value={statistics.under_14} />
                                <Number value={statistics.over_14} />
                                <h1 className="text-4xl font-extrabold w-full">
                                    14+ ani
                                </h1>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};
export default Statistics;
