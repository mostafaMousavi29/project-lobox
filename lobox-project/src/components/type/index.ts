export interface Item {
    id: string;
    label: string;
    emoji?: string;
}

export interface PresenterState {
    isOpen: boolean;
    items: Item[];
    selectedIds: string[];
    query: string;
    validationError?: string | null;
}

export interface MultiSelectViewContract {
    update(state: PresenterState): void;
}

export interface MultiSelectPresenterContract {
    toggleDropdown(): void;
    openDropdown(): void;
    closeDropdown(): void;
    selectToggle(id: string): void;
    addItem(label: string): void;
    setQuery(q: string): void;
    getState(): PresenterState;
}

export interface Props {
    initialItems?: Item[];
    placeholder?: string;
}