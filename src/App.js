// pasted from react lab
import "./App.css";
import { useState } from "react";
import itemData from "./assets/item-data.json";
import { Item } from "./components/Item.js"
import { AggregatorItem } from "./components/AggregatorItem.js"
import { FilterButton } from "./components/FilterButton.js"


// makes the urls in the item data work
itemData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});


//### categorize data ###
//initialize
let itemsByOffering = {
  "food": new Set(),
  "kitchenware": new Set(),
  "cleaning": new Set(),
  "technology": new Set(),
  "home decor": new Set(),
  "office supplies": new Set(),
  "clothes": new Set(),
  "shoes": new Set(),
  "health": new Set()
}
let itemsByAccepting = {
  "food": new Set(),
  "kitchenware": new Set(),
  "cleaning": new Set(),
  "technology": new Set(),
  "home decor": new Set(),
  "office supplies": new Set(),
  "clothes": new Set(),
  "shoes": new Set(),
  "health": new Set()
}
//categorize (not exclusive) the itemData via. accepting and offering
itemData.forEach((item) => {
  //put it into itemsByOffering 
  itemsByOffering[item.itemTag].add(item);
  //put it into accepting(s)
  itemsByAccepting[item.lookingFor.priority1.itemTag].add(item);
  itemsByAccepting[item.lookingFor.priority2.itemTag].add(item);
})



//### Set functions ###
Set.prototype.union = function (otherSet) {
  var unionSet = new Set();
  for (var elem of this) {
    unionSet.add(elem);
  }
  for (var elem of otherSet)
    unionSet.add(elem);
  return unionSet;
}
Set.prototype.intersect = function (otherSet) {
  var intersectionSet = new Set();
  for (var elem of otherSet) {
    if (this.has(elem))
      intersectionSet.add(elem);
  }
  return intersectionSet;
}




function App() {
  //### Agregator Related ###

  //state that represents the aggregator. Set makes sense in this context.
  const [itemAggregator, setItemAggregator] = useState(new Set())
  //state that represents the aggregated property (impact of trades)
  const [impact, setImpact] = useState(0)

  //AddToCart function
  const addToAggregator = (item) => { // remove 


    setItemAggregator((prevAgg) => {
      let newAgg = new Set(prevAgg)
      if (!newAgg.has(item)) {
        newAgg.add(item);
        setImpact(impact + item.monetaryEqual);
      }
      return newAgg
    })

  }

  const removeFromAggregator = ((item) => {
    setItemAggregator((prevAgg) => {
      let newAgg = new Set(prevAgg)
      newAgg.delete(item);
      setImpact(impact - item.monetaryEqual);
      return newAgg
    })

  })




  //### Filter Related ###

  //represents the state of the filters
  const filterCategories =
    ["cleaning", "clothes", "food", "health", "home decor", "kitchenware", "office supplies", "shoes", "technology"]
  const [offeringFilters, setOfferingFilters] = useState(new Set());
  const [acceptingFilters, setAcceptingFilters] = useState(new Set());

  //represents the state of the items displayed
  const [items, setItems] = useState(itemData)

  //filterItem function
  const filterItems = (filterType, itemType) => {
    if (filterType == "offering") { //assuming we're adding filter
      if (!offeringFilters.delete(itemType)) { //if itemType not currently included
        offeringFilters.add(itemType);
      } //otherwise, it's been deleted
      setOfferingFilters(offeringFilters);
    } else if (filterType == "accepting") {
      if (!acceptingFilters.delete(itemType)) {
        acceptingFilters.add(itemType);
      }
      setAcceptingFilters(acceptingFilters);
    }

    setItems(() => {
      //union of itemsByOffering(itemType) for all itemTypes in offeringFilters
      var filteredOfferingItems = new Set();
      offeringFilters.forEach((itemType) => {
        filteredOfferingItems = filteredOfferingItems.union(itemsByOffering[itemType]);
      })

      //union of itemsByAccepting(itemType) for all itemTypes in acceptingFilters
      var filteredAcceptingItems = new Set();
      acceptingFilters.forEach((itemType) => {
        filteredAcceptingItems = filteredAcceptingItems.union(itemsByAccepting[itemType]);
      })

      const newItems = [];
      if (offeringFilters.size != 0) {
        if (acceptingFilters.size != 0) {
          const itemsSet = filteredOfferingItems.intersect(filteredAcceptingItems);
          itemsSet.forEach(function (value) { newItems.push(value) });
        } else {
          filteredOfferingItems.forEach(function (value) { newItems.push(value) });
        }
      } else {
        if (acceptingFilters.size != 0) {
          filteredAcceptingItems.forEach(function (value) { newItems.push(value) });
        } else {
          itemData.forEach(function (value) { newItems.push(value) });
        }
      }
      return newItems

    })

  }

  //sortItems function
  const sortItems = (sortType) => {
    if (sortType == "oldToNew") {
      setItems((prevItems) => {
        const newItems = [...prevItems];
        newItems.sort(
          //comparison function
          function (a, b) {
            const date1 = new Date(a.datePosted)
            const date2 = new Date(b.datePosted)
            return date1 - date2;
          });
        return newItems
      })
    }

    if (sortType == "newToOld") {
      setItems((prevItems) => {
        const newItems = [...prevItems];
        newItems.sort(
          //comparison function
          function (a, b) {
            const date1 = new Date(a.datePosted)
            const date2 = new Date(b.datePosted)
            return date2 - date1; //this line was altered
          });
        return newItems
      })
    }
  }

  //### Page contents ###
  return (
    <div className="App">
      {/* Title of the Barter website */}
      <div className="TopBanner"> <h1>Barder</h1> </div>


      <div className="Body">
        <div className="FilterAndSort">
          <div className="FilterSection">
            <div>Find posts based on what Barder users are...</div>
            <div className="FilterColumns">
              <div className="OfferingFilters">
                <p> Offering: </p>
                {filterCategories.map((itemType) => (
                  <FilterButton itemType={itemType} filterItems={filterItems} filterType="offering" onFilters={offeringFilters} />
                ))}
              </div>

              <>AND</>

              <div className="AcceptingFilters">
                <p> Accepting: </p>
                {filterCategories.map((itemType) => (
                  <FilterButton itemType={itemType} filterItems={filterItems} filterType="accepting" onFilters={acceptingFilters} />
                ))}
              </div>
            </div>

          </div>


          <div className="Sort">
            <div> Sort Posts by...</div>
            <button onClick={() => sortItems("oldToNew")}> Oldest to Newest</button>
            <button onClick={() => sortItems("newToOld")}> Newest to Oldest</button>
          </div>
        </div>
        <div className="ItemArea">
          {
            items.map((item) => ( // map bakeryData to BakeryItem components
              <Item item={item} addToAggregator={addToAggregator} />
            ))
          }
        </div>
        <div className="CartArea">
          <h2>Trading List</h2>
          Monetary Equivalent: {impact.toFixed(2)}
          <h3>Items</h3>
          {Array.from(itemAggregator).map((item) => (
            <AggregatorItem item={item} removeFromAggregator={removeFromAggregator} />
          ))}
        </div>
      </div>



    </div >
  );
}

export default App;
