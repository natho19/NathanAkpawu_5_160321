class Product {
    constructor(jsonProduct) {
        jsonProduct && Object.assign(this, jsonProduct);
    }

    formatPrice() {
        return (this.price / 100).toFixed(2);
    }
}