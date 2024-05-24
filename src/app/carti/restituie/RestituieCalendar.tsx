import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon } from 'lucide-react';
import { CalendarCheck2, CalendarClock, CalendarX2 } from 'lucide-react';

interface RestituieCalendarProps {
    dueDate: string;
    borrowedDate: string;
}

const RestituieCalendar = ({
    dueDate,
    borrowedDate
}: RestituieCalendarProps) => {
    const formatDate = (timestamp: string) => {
        const date = new Date(timestamp.replace(' ', 'T'));
        const day = date.getDate();
        const month = date.toLocaleString('en-US', { month: 'long' });
        const year = date.getFullYear();
        const getOrdinalSuffix = (day: number) => {
            if (day > 3 && day < 21) return 'th';
            switch (day % 10) {
                case 1:
                    return 'st';
                case 2:
                    return 'nd';
                case 3:
                    return 'rd';
                default:
                    return 'th';
            }
        };
        return `${month} ${day}${getOrdinalSuffix(day)}, ${year}`;
    };

    const getDaysRemaining = (dueDate: string) => {
        const due = new Date(dueDate);
        const today = new Date();
        const diffTime = due.getTime() - today.getTime();
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    const renderDueDate = () => {
        const daysUntilDue = getDaysRemaining(dueDate);
        if (!dueDate) {
            return (
                <Button
                    variant={'outline'}
                    className="w-[280px] justify-start text-left font-normal mb-2"
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    Termen limita
                </Button>
            );
        }
        if (daysUntilDue > 30) {
            return (
                <Button
                    variant={'outline'}
                    className="w-[280px] justify-start text-left font-normal my-2 text-green-600"
                >
                    <CalendarCheck2 className="mr-2 h-4 w-4 text-green-600" />
                    {formatDate(dueDate)}
                </Button>
            );
        } else if (daysUntilDue >= 0) {
            return (
                <Button
                    variant={'outline'}
                    className="w-[280px] justify-start text-left font-normal my-2 text-blue-600"
                >
                    <CalendarClock className="mr-2 h-4 w-4 text-blue-600" />
                    {formatDate(dueDate)}
                </Button>
            );
        } else {
            return (
                <Button
                    variant={'outline'}
                    className="w-[280px] justify-start text-left font-normal my-2 text-red-600"
                >
                    {' '}
                    <CalendarX2 className="mr-2 h-4 w-4 text-red-600" />
                    {formatDate(dueDate)}
                </Button>
            );
        }
    };

    return (
        <>
            <Button
                variant={'outline'}
                className="w-[280px] justify-start text-left font-normal mb-2"
            >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {borrowedDate ? formatDate(borrowedDate) : 'Data imprumutata'}
            </Button>
            {renderDueDate()}
        </>
    );
};

export default RestituieCalendar;
