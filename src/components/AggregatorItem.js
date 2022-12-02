export function AggregatorItem({ item, removeFromAggregator }) {
    return (
        <li className="AggregatorItem">
            <p>
                {item.name} <span className="ItemTag"> ({item.itemTag}) </span>
            </p>
            <div className="TradingRequests">
                <p> {item.user} is willing to trade for: </p>
                <p > <span className="ItemName"> {item.lookingFor.priority1.name}</span> <span className="ItemTag"> ({item.lookingFor.priority1.itemTag})</span></p>
                <p > <span className="ItemName"> {item.lookingFor.priority2.name}</span> <span className="ItemTag"> ({item.lookingFor.priority2.itemTag})</span></p>
            </div>

            <div> Or, you can purchase for {item.monetaryEqual.toFixed(2)}</div>

            <button onClick={() => removeFromAggregator(item)}> Remove From Trading List</button>
        </li>
    )
}