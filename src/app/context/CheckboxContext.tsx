'use client';

import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect
} from 'react';

export const displayNames: Record<string, string> = {
    title: 'Titlu',
    author: 'Autor',
    category: 'Cota',
    year: 'An Aparitie',
    place: 'Loc Aparitie',
    inventory: 'Inventar',
    borrow: 'Imprumutare / Restituire'
};

export type CheckboxKeys =
    | 'title'
    | 'author'
    | 'category'
    | 'year'
    | 'place'
    | 'inventory'
    | 'borrow';

interface CheckboxState {
    title: boolean;
    author: boolean;
    category: boolean;
    year: boolean;
    place: boolean;
    inventory: boolean;
    borrow: boolean;
}

interface CheckboxContextType {
    state: CheckboxState;
    toggleCheckbox: (name: CheckboxKeys) => void;
}

const defaultState: CheckboxState = {
    title: true,
    author: true,
    category: true,
    year: true,
    place: true,
    inventory: true,
    borrow: true
};

const CheckboxContext = createContext<CheckboxContextType | undefined>(
    undefined
);

export const CheckboxProvider = ({ children }: { children: ReactNode }) => {
    const [state, setState] = useState<CheckboxState>(() => {
        const savedState = localStorage.getItem('checkboxState');
        return savedState ? JSON.parse(savedState) : defaultState;
    });

    useEffect(() => {
        localStorage.setItem('checkboxState', JSON.stringify(state));
    }, [state]);

    const toggleCheckbox = (name: CheckboxKeys) => {
        setState((prevState) => ({
            ...prevState,
            [name]: !prevState[name]
        }));
    };

    return (
        <CheckboxContext.Provider value={{ state, toggleCheckbox }}>
            {children}
        </CheckboxContext.Provider>
    );
};

export const useCheckboxContext = () => {
    const context = useContext(CheckboxContext);
    if (!context) {
        throw new Error(
            'useCheckboxContext must be used within a CheckboxProvider'
        );
    }
    return context;
};
