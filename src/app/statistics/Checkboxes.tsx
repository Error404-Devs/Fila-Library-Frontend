import { Checkbox } from '@/components/ui/checkbox';
import { columnNames, columnKeys, StatisticsColumnKeys } from '../interfaces';
import { useStatisticsColumnContext } from '../context/StatisticsProvider';

const Checkboxes = () => {
    const { state, toggleColumn } = useStatisticsColumnContext();

    return (
        <>
            {columnNames.map((column, index) => {
                const columnKey = columnKeys[
                    column as keyof typeof columnKeys
                ] as StatisticsColumnKeys;
                return (
                    index != 0 && (
                        <div
                            key={index}
                            className="items-top flex space-x-2 py-1"
                        >
                            <Checkbox
                                checked={state[columnKey]}
                                onCheckedChange={() => toggleColumn(columnKey)}
                            />
                            <div className="grid gap-1.5 leading-none">
                                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    {column}
                                </label>
                            </div>
                        </div>
                    )
                );
            })}
        </>
    );
};

export default Checkboxes;
