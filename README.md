# Hierarchical Table

This project is small React+Typescript application that allows viewing/deleting hierarchical JSON data.
Data should conform to following contract, i.e every item contains data and nested children.
Data can have variable number of attributes and item can have variable number of nested children items.  

```typescript
export interface Item {
	data: Object;
	kids?: Kids
}
export class KidsRecords {
	records!: Item[];
}
export class Kids {
	[rootKey: string]: KidsRecords;
}
``` 

## Technology used
Project is using 2 main libraries:
* *[react-table](https://github.com/tannerlinsley/react-table)* 
    - Table Headless component giving full control over how the table renders and provides only functionality of "Table".
    - This project offers much bigger functionality like filtering, sorting or pagination that can be quickly used.
* *[react-bootstrap](https://react-bootstrap.github.io/components/table/)* 
    - Project that offers big variety of styled UI components with responsive design support etc.
    - Particularly, this project is using BT Table for quick styling of a table.

## Sample Data
Sample data can be found in src folder sample-data.json. Currently, data is loaded immediately, but uploader is going to be implemented.

## TODO
Following items are in-progress:
1. Uploader to upload json data
2. More tests for UI actions
