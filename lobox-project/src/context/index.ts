import React, {createContext, useContext} from "react";
import {Item, PresenterState} from "../components/type";

export type ThemeContextType = {
    state: PresenterState;
    toggle: () => void;
    onSelectToggle: (id: string) => void;
    onAddItem: (label: string) => void;
    onQueryChange: (q: string) => void;
    filteredItems: Item[];
    selectedLabels: string[];
    rootRef: React.RefObject<HTMLDivElement> | null;
    inputRef: React.RefObject<HTMLInputElement> | null;
    placeholder : string | null
};

const defaultValue: ThemeContextType = {
    state: {
        isOpen: false,
        items: [],
        selectedIds: [],
        query: "",
        validationError: null,
    },
    toggle: () => {},
    onSelectToggle: () => {},
    onAddItem: () => {},
    onQueryChange: () => {},
    filteredItems: [],
    selectedLabels: [],
    rootRef: null,
    inputRef: null,
    placeholder: null,
};

export const ThemeContext = createContext(defaultValue);

export const useThemeContext = () => useContext(ThemeContext);