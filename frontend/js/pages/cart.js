function displayCart() {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems) {
        let productLines = document.getElementById('product-lines');
        Object.values(cartItems).map(item => {
            productLines.innerHTML += `
            <tr>
                <th scope="row">${item.name}</th>
                <td>${item.inCart}</td>
                <td>${formatPrice(item.price)} &euro;</td>
                <td>${formatPrice(item.price * item.inCart)} &euro;</td>
            </tr>
            `
        });
        let cartCost = localStorage.getItem('totalCost');
        let totalCost = document.getElementById('total-cost');
        totalCost.innerHTML += `<th scope="col" id="total-cost">${formatPrice(cartCost)} &euro;</th>`;  
    } else {
        let main = document.getElementById('main');
        main.innerHTML = `
        <section class="bg-light">
            <div class="container">
                <div class="row mb-4">
                    <h1 class="text-center">Aucun produit sélectionné...</h1>
                </div>
                <div class="text-center">
                    <a href="index.html" class="btn btn-purple btn-lg rounded-pill mx-2"><i class="bi bi-plus-circle"></i> Ajouter des produits</a>
                </div>
            </div>
        </section>
        `
    }
}

displayCart();