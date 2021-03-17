export class DisplayList {

    arrItems = [];

    constructor() {}

    get arrItems() {
        return this.arrItems;
    }

    addItem(itm) {
        this.arrItems.push(itm);
    }

    deleteItem(itmId) {
        for (const [i, item] of this.arrItems.entries()) {
            if (item.id === itmId) {
                this.arrItems.splice(i, 1);
            }
        }
    }

}