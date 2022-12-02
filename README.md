# Development

### Link to Deployed Website
https://radicalwaterbear101.github.io/development-final/ 

### Goal and Value of the Application
This application, named “Barder”, is a digital analogy to bartering. Users can see what trade-offers other users have posted and add those trades to their trading list. They can filter other users’ posts based on what type of item other users are offering, and also based on what type of item other users are accepting/looking to trade for. 
The intended social value is to reduce material waste, increase community interaction, and support users that are short on cash or digital money. 

### Usability Principles Considered
The UI of this web application is influenced by the UI of craigslist. This is because users that would use Barder will likely already have used Craigslist. 
I placed the filters and sorting on the left side of the page. The items are in the middle. And the Trading list is on the right side of the page. This follows the typical reading flow from left to right and matches the user’s expectations (with similar web-apps like craigslist). 
I made sure it was learnable to use the filters by changing the color of the filter button to indicate that the filter had been chosen. I also made sure to make the items learnable by styling each one the same way so that users would know where to expect certain information about each item post. 

### Organization of Components
FilterButton is a component for a filter button.  The state immediately related to FilterButton is offeringFilters and acceptingFilters (depending on the particular filter button). These two states then come to define the items state, which determines which items are visible to the user. 
- itemType is a prop for the string that represents the item type (ex. “food” )
- filterItems is a prop for the function that is called if a user clicks on this filter button
- filterType is a prop for the string that represents whether this button filters according to the itemType offered or the itemTypes accepted by a post
- onFilters is a prop for the set that represents which itemTypes are are already included in the filter

Item is a component for an item post. The items state is related because every item in the items state is mapped to an Item component. The itemAggregator state is loosely related in that, when a user clicks on ‘add to Trading List’ within an Item Component, the itemAggregator state changes (if the Item is not already in the trading list). The impact state is related to an Item in a similar way.
- item is a prop for the item JSON object
- addToAggregator is a prop for the function that is called when somebody clicks ‘add to Trading List’

AggregatorItem is a component for an item that has made its way into the trading list.  The state itemAggregator is directly related because every item in itemAggregator is mapped to an AggregatorItem Component. And, when users click ‘Remove from Trading List’ on any AggregatorItem, the itemAggregator is updated to no longer have that AggregatorItem. 
- item is a prop for the item JSON object
- removeFromAggregator is a prop for the function that is called when somebody clicks ‘remove from trading list’

### How Data is Passed Down Through Components
Functions are written in the App.js file, and they are passed as props to the Components, as described above. The data from the json file is passed down as an entire item to the Components, because there are so many aspects of the item that will be used (item.name, item.itemTag, etc.)

### How the User Triggers State Changes
The user triggers state changes when they click buttons, as described above. There are filter and sort buttons, add To Trading List buttons, and remove from Trading List buttons. Each of which triggers different state changes, as detailed in the ### Organization of components section. 
