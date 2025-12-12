import {MultiSelectPresenterContract, MultiSelectViewContract, PresenterState, Item} from "../type";
import {addItemSchema} from "../validator/schema";

function createMultiSelectPresenter(
    view: MultiSelectViewContract,
    initialItems: Item[] = []
): MultiSelectPresenterContract {

    let state: PresenterState = {
        isOpen: false,
        items: initialItems,
        selectedIds: [],
        query: "",
        validationError: null,
    };

    const syncView = () => {
        view.update({ ...state });
    };

    const toggleDropdown = () => {
        state.isOpen = !state.isOpen;
        syncView();
    };

    const openDropdown = () => {
        state.isOpen = true;
        syncView();
    };

    const closeDropdown = () => {
        state.isOpen = false;
        state.query = "";
        state.validationError = null;
        syncView();
    };

    const selectToggle = (id: string) => {
        const idx = state.selectedIds.indexOf(id);
        if (idx === -1) state.selectedIds.push(id);
        else state.selectedIds.splice(idx, 1);

        syncView();
    };

    const addItem = (label: string) => {
        const trimmed = label.trim();

        const { error } = addItemSchema.validate({ label: trimmed });
        if (error) {
            state.validationError = error.message;
            syncView();
            return;
        }

        const exists = state.items.find(
            (i) => i.label.toLowerCase() === trimmed.toLowerCase()
        );

        if (exists) {
            selectToggle(exists.id);
            state.validationError = null;
            return;
        }

        const newItem: Item = {
            id: "id_" + Math.random().toString(36).slice(2, 9),
            label: trimmed,
        };

        state.items.unshift(newItem);
        state.selectedIds.push(newItem.id);

        state.query = "";
        state.validationError = null;
        syncView();
    };

    const setQuery = (q: string) => {
        state.query = q;
        state.validationError = null;
        syncView();
    };

    const getState = () => ({ ...state });

    syncView();

    return {
        toggleDropdown,
        openDropdown,
        closeDropdown,
        selectToggle,
        addItem,
        setQuery,
        getState,
    };
}


export default createMultiSelectPresenter;