// component for an item that someone has put up for barter

export function Item({ item, addToAggregator }) {
    return (
        <li key={item.name} className="Item">
            <h2>
                {item.name} <span className="ItemTag"> ({item.itemTag}) </span>
            </h2>
            <p>posted by: {item.user}</p>
            <p>date posted: {item.datePosted}</p>

            <img src={item.image} className="ImageSquare" />

            <div className="Description">
                <p> <b> Description</b> </p>
                {item.description}
            </div>

            <div className="TradingRequests">
                <p> <b>Willing to trade for: </b> </p>
                <p > <span className="ItemName"> {item.lookingFor.priority1.name}</span> <span className="ItemTag"> ({item.lookingFor.priority1.itemTag})</span></p>
                <p > <span className="ItemName"> {item.lookingFor.priority2.name}</span> <span className="ItemTag"> ({item.lookingFor.priority2.itemTag})</span></p>
            </div>

            <div> Or, you can purchase for {item.monetaryEqual.toFixed(2)}</div>

            <button onClick={() => addToAggregator(item)}> Add to Trading List</button>
        </li>
    )
}
