class Product {
    constructor(jsonProduct) {
        jsonProduct && Object.assign(this, jsonProduct);
    }

    formatPrice() {
        return (this.price / 100).toFixed(2);
    }

    getColors() {
        let colors = this.colors;
        if (colors.length > 0) {
            for (const [i, color] of colors.entries()) {
                document.querySelector('.single-colors').innerHTML += `
                <option value="${i + 1}">${color}</option>`
            }
        }
    }
}