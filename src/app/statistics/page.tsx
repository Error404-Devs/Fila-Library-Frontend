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
import { useEffect, useRef, useState } from 'react';
import StatisticsTable from './StatisticsTable';
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
import { StatisticsType, defaultStatisticsValues } from '../interfaces';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';

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

const Statistics = () => {
    const currentDate = new Date();
    const currentMonth = (currentDate.getMonth() + 1).toString(); // getMonth() returns 0-11
    const currentYear = currentDate.getFullYear().toString();
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [statistics, setStatistics] = useState<StatisticsType>(
        defaultStatisticsValues
    );

    const { data: session, status } = useSession();

    useEffect(() => {
        if (session?.access_token)
            fetchStatistics(selectedMonth, selectedYear, session?.access_token);
    }, [selectedMonth, selectedYear, status, session]);

    const fetchStatistics = async (
        month: string,
        year: string,
        accessToken: string
    ) => {
        try {
            const response = await fetch(
                `${baseUrl}/statistics?month=${month}&year=${year}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    }
                }
            );
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setStatistics(data);
            } else {
                setStatistics(defaultStatisticsValues);
            }
        } catch (error) {
            console.error('Error fetching statistics:', error);
            setStatistics(defaultStatisticsValues);
        }
    };

    const getMonthLabel = (value: string) => {
        const month = months.find((m) => m.value === value);
        return month ? month.label : '';
    };

    const tableRef = useRef(null);

    const handlePrint = () => {
        if (tableRef.current == null) return;

        // Use a CSS class to split the content
        const printWindow = window.open('', '_blank'); // Open a new window or tab
        const firstTableSection = document.querySelector('#firstTableSection');
        const firstTableHTML = firstTableSection
            ? firstTableSection.innerHTML
            : '';

        const secondTableSection = document.querySelector(
            '#secondTableSection'
        );
        const secondTableHTML = secondTableSection
            ? secondTableSection.innerHTML
            : '';

        printWindow?.document.write(`
<html>
    <head>
        <title>${getMonthLabel(selectedMonth)} ${selectedYear}</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                padding: 20px;
            }
            table {
                width: 100%;
                border-collapse: collapse;
            }
            table, th, td {
                border: 1px solid black;
            }
            th, td {
                padding: 8px;
                text-align: center;
            }
            .vertical-text {
                writing-mode: vertical-lr;
                transform: rotate(180deg);
                white-space: nowrap;
                width: 20px;
            }
            @media print {
                .page-break {
                    page-break-before: always;
                }
            }
        </style>
    </head>
    <body>
        <div>
            <!-- First table section -->
            <h2>${getMonthLabel(selectedMonth)} ${selectedYear} - Page 1</h2>
            <table>
                ${firstTableHTML}
            </table>
        </div>

        <div class="page-break">
            <!-- Second table section -->
            <h2>${getMonthLabel(selectedMonth)} ${selectedYear} - Page 2</h2>
            <table>
                ${secondTableHTML}
            </table>
        </div>
    </body>
</html>
`);
        printWindow?.document.close(); // Close the document to finish writing
        printWindow?.focus(); // Focus on the new window
        printWindow?.print(); // Trigger the print dialog
        if (printWindow != null) {
            printWindow.onafterprint = () => printWindow?.close(); // Close the window after printing
        }
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
                            {`Statistice: ${getMonthLabel(selectedMonth)} ${selectedYear}`}
                        </h1>
                        <Button
                            onClick={handlePrint}
                            variant="outline"
                            className="mr-4"
                        >
                            Print Table
                        </Button>
                    </div>
                    <div className="w-full h-full overflow-auto" ref={tableRef}>
                        <StatisticsTable
                            selectedMonth={getMonthLabel(selectedMonth)}
                            selectedYear={selectedYear}
                            statistics={statistics}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
};
export default Statistics;
