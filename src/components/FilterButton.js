export function FilterButton({ itemType, filterItems, filterType, onFilters }) {
    return (
        <div>
            <button
                onClick={() => filterItems(filterType, itemType)}
                className={onFilters.has(itemType) ? "FilterSelected" : "FilterDefault"}>
                {itemType}
            </button>
        </div>

    )
}