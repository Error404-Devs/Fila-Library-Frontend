'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import { columnKeys, StatisticsColumnKeys } from '../interfaces';

interface StatisticsColumnContextProps {
    state: Record<StatisticsColumnKeys, boolean>;
    toggleColumn: (key: StatisticsColumnKeys) => void;
}

const initialState = Object.keys(columnKeys).reduce(
    (acc, key) => {
        // accumulator
        const columnKey = columnKeys[
            key as keyof typeof columnKeys
        ] as StatisticsColumnKeys;
        acc[columnKey] = true;
        return acc;
    },
    {} as Record<StatisticsColumnKeys, boolean>
);

const StatisticsColumnContext = createContext<
    StatisticsColumnContextProps | undefined
>(undefined);

export const StatisticsColumnProvider: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    const [state, setState] = useState<Record<StatisticsColumnKeys, boolean>>(
        () => {
            const savedState =
                typeof window !== 'undefined' &&
                localStorage.getItem('columnVisibility');
            return savedState ? JSON.parse(savedState) : initialState;
        }
    );

    useEffect(() => {
        typeof window !== 'undefined' &&
            localStorage.setItem('columnVisibility', JSON.stringify(state));
    }, [state]);

    const toggleColumn = (key: StatisticsColumnKeys) => {
        setState((prevState) => ({
            ...prevState,
            [key]: !prevState[key]
        }));
    };

    return (
        <StatisticsColumnContext.Provider value={{ state, toggleColumn }}>
            {children}
        </StatisticsColumnContext.Provider>
    );
};

export const useStatisticsColumnContext = () => {
    const context = useContext(StatisticsColumnContext);
    if (context === undefined) {
        throw new Error(
            'useStatisticsColumnContext must be used within a StatisticsColumnProvider'
        );
    }
    return context;
};
