import React from "react";
import {useThemeContext} from "../../context";

const Mobile = ()=>{
    const {
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
    }= useThemeContext()
    
    return (
        <div className="ms-root" ref={rootRef}>
            <div className={`ms-control ${state.isOpen ? 'open' : ''}`} onClick={toggle} role="button"
                 aria-haspopup="listbox">
                <div className="ms-value">
                    {selectedLabels.length > 0 ? selectedLabels.join(', ') : placeholder}
                </div>
                <div className="ms-caret">▾</div>
            </div>

            {state.isOpen && (
                <div className="ms-dropdown" role="listbox">
                    <div className="ms-search">
                        <input
                            ref={inputRef}
                            value={state.query}
                            onChange={e => onQueryChange(e.target.value)}
                            onKeyDown={e => {
                                if (e.key === 'Enter') {
                                    onAddItem(state.query);
                                }
                            }}
                            placeholder="Type and press Enter to add"
                            aria-label="Add item"
                        />
                        {state.validationError && <div className="ms-error" role="alert">{state.validationError}</div>}
                    </div>

                    <div className="ms-list">
                        {filteredItems.map(item => (
                            <div key={item.id}
                                 className={`ms-item ${state.selectedIds.includes(item.id) ? 'selected' : ''}`}
                                 onClick={() => onSelectToggle(item.id)}>
                                <div className="ms-item-left">
                                    {item.emoji && <span className="ms-emoji">{item.emoji}</span>}
                                    <span className="ms-label">{item.label}</span>
                                </div>
                                <div className="ms-item-right">{state.selectedIds.includes(item.id) ? '✔' : ''}</div>
                            </div>
                        ))}

                        {filteredItems.length === 0 &&
                            <div className="ms-empty">No results — press Enter to add "{state.query}"</div>}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Mobile