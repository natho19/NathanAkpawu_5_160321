class Product {
    constructor(jsonProduct, inCart) {
        jsonProduct && Object.assign(this, jsonProduct);
        this.inCart = inCart;
    }
}