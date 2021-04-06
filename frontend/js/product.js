// Classe Product
class Product {
    constructor(jsonProduct, inCart) {
        jsonProduct && Object.assign(this, jsonProduct);
        // Propriété inCart utilisée pour la quantité du produit dans le panier
        this.inCart = inCart;
    }
}