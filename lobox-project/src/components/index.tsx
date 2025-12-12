import React, { useEffect, useRef, useState } from 'react';
import './styles/index.scss';
import {MultiSelectViewContract, PresenterState, Item, Props, MultiSelectPresenterContract} from "./type";
import Media from "./media";
import createMultiSelectPresenter from "./helper";
import {ThemeContext} from "../context";

const defaultItems: Item[] = [
    { id: 'education', label: 'Education', emoji: '🎓' },
    { id: 'science', label: 'Yeeeah, science!', emoji: '🔬' },
    { id: 'art', label: 'Art', emoji: '🎨' },
    { id: 'sport', label: 'Sport', emoji: '⚽' },
    { id: 'games', label: 'Games', emoji: '🎮' },
    { id: 'health', label: 'Health', emoji: '🧑‍⚕️' },
];

 const MultiSelect = ({ initialItems = defaultItems, placeholder = 'Select' }: Props) => {
    const [state, setState] = useState<PresenterState>({ isOpen: false, items: initialItems, selectedIds: [], query: '' });
    const rootRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const presenterRef = useRef<MultiSelectPresenterContract | null>(null);

    // view contract implementation
    const viewContract: MultiSelectViewContract = {
        update(s: PresenterState) {
            setState(s);
        },
    };

    useEffect(() => {
        presenterRef.current = createMultiSelectPresenter(viewContract, initialItems);
        return () => {
            presenterRef.current = null;
        };
    }, []);

    useEffect(() => {
        function onDocClick(e: MouseEvent) {
            const root = rootRef.current;
            if (!root) return;
            if (!root.contains(e.target as Node)) {
                presenterRef.current?.closeDropdown();
            }
        }
        document.addEventListener('mousedown', onDocClick);
        return () => document.removeEventListener('mousedown', onDocClick);
    }, []);

    const toggle = () => presenterRef.current?.toggleDropdown();
    const onSelectToggle = (id: string) => presenterRef.current?.selectToggle(id);
    const onAddItem = (label: string) => presenterRef.current?.addItem(label);
    const onQueryChange = (q: string) => presenterRef.current?.setQuery(q);

    const filteredItems = state.items.filter(i => i.label.toLowerCase().includes(state.query.toLowerCase()));

    const selectedLabels = state.selectedIds
        .map(id => state.items.find(it => it.id === id))
        .filter(Boolean)
        .map(i => `${i!.emoji ? i!.emoji + ' ' : ''}${i!.label}`);

    return (
        <ThemeContext.Provider
            value={{
                state,
                toggle,
                onSelectToggle,
                onAddItem,
                onQueryChange,
                filteredItems,
                selectedLabels,
                rootRef,
                inputRef,
                placeholder
            }}
        >
            <Media />
        </ThemeContext.Provider>
    );
}

export default MultiSelect;